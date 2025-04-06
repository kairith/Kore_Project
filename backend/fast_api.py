

import os
import json
import time
import shutil
import requests
import unicodedata
import jwt
import torch
import numpy as np

from datetime import datetime, timedelta
from dotenv import load_dotenv
from bson import ObjectId
from sklearn.metrics.pairwise import cosine_similarity

from fastapi import (
    FastAPI, 
    HTTPException, 
    Form, 
    File, 
    UploadFile, 
    File,
    Depends, 
    APIRouter,
    
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.responses import JSONResponse

from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

from transformers import (
    AutoModelForQuestionAnswering, 
    AutoTokenizer, 
    BertTokenizer, 
    BertForQuestionAnswering, 
    pipeline
)
from fastapi import Query
import pytz


app = FastAPI()


# Endpoint to retrieve user profile
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = "mongodb+srv://pregnancy:rith11223344@databasedb.ktutz.mongodb.net/pregnancyDB?retryWrites=true&w=majority&appName=DatabaseDB"
client = AsyncIOMotorClient(MONGO_URL)
db = client["video_database"]
video_collection = db["videos"]
blog_collection = db["blogs"]
like_collection = db["likes"]
comments_collection = db["comments"] 
post_collection = db["posts"]
user_collection = db["users"] 
chat_conversations_collection = db["chat_conversations"]
chat_messages_collection = db["chat_messages"]



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="f9d7ce783bf8a7b60c1ec59573628a31557cf0eae409792a8a5bb7195a0d728a2d1c0f6e8c47039c08cded51c2a3f2a97531957f53e189779d72a0952b93bbf2")

import torch
import pickle
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import XLMRobertaTokenizerFast, XLMRobertaModel
from sklearn.metrics.pairwise import cosine_similarity

# ✅ Load tokenizer & model
model_name = "/Users/lsbizz/Documents/AllMyCode/Capstone_Project/Pregnancy_Project 2/backend/data/kore_xml2"  # Use your saved model directory
tokenizer = XLMRobertaTokenizerFast.from_pretrained(model_name)
model = XLMRobertaModel.from_pretrained(model_name)

# ✅ Load precomputed embeddings from kore_xml.pkl
pkl_path = "/Users/lsbizz/Documents/AllMyCode/Capstone_Project/Pregnancy_Project 2/backend/data/kore_xlm_v2.pkl"
with open(pkl_path, "rb") as f:
    question_vectors, questions, answers = pickle.load(f)

# ✅ Define input schema
class Query(BaseModel):
    question: str

# ✅ Function to get sentence embeddings
def get_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

# ✅ Find the best answer
def get_answer(user_input):
    user_vector = get_embedding(user_input)  # Get embedding for user question
    similarities = cosine_similarity([user_vector], question_vectors)[0]

    # ✅ Find the most similar question
    best_idx = np.argmax(similarities)
    
    # ✅ Set a confidence threshold (avoid incorrect answers)
    if similarities[best_idx] < 0.5:
        return "សូមអភ័យទោស! ខ្ញុំមិនអាចរកឃើញចម្លើយសម្រាប់សំណួរនេះ។"
    
    return answers[best_idx]

# Save chat to MongoDB
def save_chat_history(user_id: str, question: str, answer: str):
    user_collection.update_one(
        {"_id": user_id},  # MongoDB uses _id as the default primary key
        {"$push": {"chatHistory": {"question": question, "answer": answer}}},
        upsert=True  # Create user if they don’t exist (optional)
    )
# ✅ API endpoint
@app.post("/ask")
async def answer_question(query: Query):
    response = get_answer(query.question)
    return {"question": query.question, "answer": response}

@app.get("/chat/history/{user_id}")
async def get_chat_history(user_id: str):
    user = user_collection.find_one({"_id": user_id}, {"chatHistory": 1})
    if not user or "chatHistory" not in user:
        return {"user_id": user_id, "history": []}
    return {"user_id": user_id, "history": user["chatHistory"]}


#apply json chatbot

# Define the correct path to the JSON file

# Get the current script directory
# Use an absolute path
DATA_FILE = "/Users/lsbizz/Documents/AllMyCode/Capstone_Project/Pregnancy_Project 2/backend/data/filtered_pregnancy_labels.json"

# 🔥 Ensure the file exists
if not os.path.exists(DATA_FILE):
    raise Exception("⚠️ Data file not found")

# 🔥 Normalize text (handle Unicode differences)
def normalize_text(text):
    return unicodedata.normalize("NFKC", text).strip().lower()

# 🔥 Load JSON data
def load_data():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="⚠️ Data file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="⚠️ Error decoding JSON file")

@app.get("/chatbot/")
async def chatbot(question: str):
    print(f"🔍 Received question: {question}")  # Debugging
    data = load_data()
    normalized_question = normalize_text(question)
    for entry in data:
        if "keywords" in entry:
            for keyword in entry["keywords"]:
                if keyword.lower() in normalized_question:
                    return {"answer": entry["answer"], "matched_keyword": keyword}

    raise HTTPException(status_code=404, detail="⚠️ No matching keyword found")

# To run the application, use:
# uvicorn your_file_name:app --reload
# To run the application, use:
# uvicorn your_file_name:app --reload



# 🔹 MongoDB Connection


UPLOAD_DIR = "uploads/videos"
BLOG_IMAGE_DIR = "uploads/blogs"
POST_UPLOAD_DIR = "uploads/posts"


# Create directories if they don't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(BLOG_IMAGE_DIR, exist_ok=True)
os.makedirs(POST_UPLOAD_DIR, exist_ok=True)
# 🔹 Serve Uploaded Files


# ======================== 📹 VIDEO UPLOAD SECTION ========================
from enum import Enum
class VideoCategory(str, Enum):
   
    PREGNANCY = "PREGNANCY"
    BEFOREGIVEBIRTH = "BEFOREGIVEBIRTH"
    FOOD = "FOOD"
    BODY = "BODY"
    FEELING = "FEELING"
    



@app.post("/upload/videos/")
async def upload_video(title: str = Form(...), description: str = Form(...),category: VideoCategory = Form(...), file: UploadFile = File(...)):
    if category not in ["PREGNANCY", "BEFOREGIVEBIRTH", "FOOD", "BODY", "FEELING"]:
        raise HTTPException(status_code=400, detail="Invalid category")
    try:
        filename = f"{int(time.time())}_{file.filename}"
        file_location = os.path.join(UPLOAD_DIR, filename)

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        

        video_data = {
            "title": title,
            "description": description,
            "file_url": f"http://localhost:8000/uploads/videos/{filename}",
            "category": category.value  
            
        }
        result = await video_collection.insert_one(video_data)

        return {"message": "Video uploaded successfully", "video_id": str(result.inserted_id)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.get("/videos/")
async def get_videos():
    videos = []
    async for video in video_collection.find():
        videos.append({
            "id": str(video["_id"]),
            "title": video["title"],
            "description": video["description"],
            "file_url": video["file_url"],
             "category": video.get("category", "Uncategorized") # Default to "Uncategorized" if missing
        })
    return videos



# @app.put("/videos/{video_id}/")
# async def update_video(
#     video_id: str,
#     title: str = Form(...),
#     description: str = Form(...),
#     file: UploadFile = File(None),  # Optional file upload
# ):
#     try:
#         update_data = {"title": title, "description": description}

#         if file:
#             filename = f"{int(time.time())}_{file.filename}"
#             file_location = os.path.join(UPLOAD_DIR, filename)

#             with open(file_location, "wb") as buffer:
#                 shutil.copyfileobj(file.file, buffer)

#             update_data["file_url"] = f"http://localhost:8000/uploads/videos/{filename}"

#         result = await video_collection.update_one(
#             {"_id": ObjectId(video_id)},
#             {"$set": update_data}
#         )

#         if result.matched_count == 0:
#             raise HTTPException(status_code=404, detail="Video not found")

#         return {"message": "Video updated successfully"}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Video update failed: {str(e)}")


# ======================== 📝 BLOG UPLOAD SECTION ========================

# ======================== 🗑 GET BLOG ========================

@app.get("/blogs/{blog_id}/")
async def get_blog(blog_id: str):
    blog = await blog_collection.find_one({"_id": ObjectId(blog_id)})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "description": blog["description"],
        "image_url": blog.get("image_url", ""),
        "createdAt": blog.get("createdAt", "")
    }


@app.post("/uploads/blogs/")  # Must be POST, not GET
async def upload_blog(
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...),
    createdAt: str = Form(None)  # Optional, matches your frontend
):
    try:
        # Save the image file
        filename = f"{int(time.time())}_{image.filename}"
        file_location = os.path.join(BLOG_IMAGE_DIR, filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Prepare blog data
        blog_data = {
            "title": title,
            "description": description,
            "image_url": f"http://localhost:8000/uploads/blogs/{filename}",
            "createdAt": datetime.strptime(createdAt, "%Y-%m-%d") if createdAt else datetime.now()
        }

        # Insert into MongoDB (assumes blog_collection is defined)
        result = await blog_collection.insert_one(blog_data)
        return {"message": "Blog uploaded successfully", "blog_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Blog upload failed: {str(e)}")
    
# Optional search field

@app.get("/blogs/")  # Changed from POST to GET
async def get_blogs():
    blogs = []
    async for blog in blog_collection.find():
        created_at = blog.get("createdAt")
        blogs.append({
            "id": str(blog["_id"]),
            "title": blog["title"],
            "description": blog["description"],
            "image_url": blog.get("image_url", ""),
            "createdAt": created_at.isoformat() if created_at else ""
        })
    return blogs






# ======================== 🗑 DELETE VIDEO ========================


@app.delete("/videos/{video_id}/")
async def delete_video(video_id: str):
    result = await video_collection.delete_one({"_id": ObjectId(video_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Video not found")

    return {"message": "Video deleted successfully"}


# ======================== 📝 UPDATE VIDEO ========================

@app.put("/videos/{id}/")
async def update_video(
    id: str,
    title: str = Form(...),
    description: str = Form(...),
    category: VideoCategory = Form(...),
    file: UploadFile = File(None),
    
):
    try:
        # Find the existing video
        video = await video_collection.find_one({"_id": ObjectId(id)})
        if not video:
            raise HTTPException(status_code=404, detail="Video not found")

        update_data = {
            "title": title,
            "description": description,
            "category": category.value,
        }

        # Update video file if provided
        if file:
            filename = f"{int(time.time())}_{file.filename}"
            file_location = os.path.join(UPLOAD_DIR, filename)
            with open(file_location, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            update_data["file_url"] = f"/uploads/videos/{filename}"

        
        # Update the video in the database
        await video_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})
        return {"message": "Video updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Update failed: {str(e)}")

# ======================== 🗑 DELETE BLOG ========================

@app.delete("/blogs/{blog_id}/")
async def delete_blog(blog_id: str):
    result = await blog_collection.delete_one({"_id": ObjectId(blog_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")

    return {"message": "Blog deleted successfully"}

# ======================== 📝 UPDATE BLOG ========================

@app.put("/blogs/{blog_id}/")
async def update_blog(
    blog_id: str,
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(None)  # Optional image file upload
):
    try:
        update_data = {"title": title, "description": description}

        # If a new image is uploaded, save it and update the blog data
        if image:
            image_filename = f"{int(time.time())}_{image.filename}"
            image_path = os.path.join(BLOG_IMAGE_DIR, image_filename)

            # Save the new image file
            with open(image_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

            # Add the new image URL to update data
            update_data["image_url"] = f"http://localhost:8000/uploads/blogs/{image_filename}"

        # Update the blog in the database
        result = await blog_collection.update_one(
            {"_id": ObjectId(blog_id)},
            {"$set": update_data}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Blog not found")

        return {"message": "Blog updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Blog update failed: {str(e)}")


#================================================= For User in admin ==========================================================================

db = client["pregnancyDB"]
User_count = db["users"]

@app.get("/all-users")
async def get_all_users():
    users = []
    async for user in User_count.find():
        users.append({
            "id": str(user["_id"]),
            "firstName": user.get("firstName", ""),
            "lastName": user.get("lastName", ""),
            "email": user.get("email", ""),
            "phone": user.get("phone", ""),
            "gender": user.get("gender", ""),
        })
    return users  # Return of all users from database to admin display

@app.put("/users/{user_id}/")
async def update_user(
    user_id: str,
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    gender: str = Form(...)
):
    update_data = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "phone": phone,
        "gender": gender
    }
    result = await User_count.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    print("==================User updated successfully===================")
    return {"message": "User updated successfully"}

@app.delete("/users/{user_id}/")
async def delete_user(user_id: str):
    # Check if user_id is valid
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    result = await User_count.delete_one({"_id": ObjectId(user_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "User deleted successfully"}

#==================================================================================================================================================
#================================================== For Post and Comment ==========================================================================

# Collections
post_collection = db["posts"]
comment_collection = db["comments"]
user_collection = db["users"]  # Assuming you have a users collection

# Security


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm="HS256")
    print(f"Generated token: {encoded_jwt}")
    return encoded_jwt

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await user_collection.find_one({"email": form_data.username})
    if not user or user.get("password") != form_data.password:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    user_id = str(user["_id"])
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"userId": user_id}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

# Models
class Post(BaseModel):
    user_id: str
    content: str
    image_url: str = None
    likes: int = 0
    identity: str  # User identity (e.g., username or "Anonymous")

class Comment(BaseModel):
    post_id: str
    user_id: str
    content: str

# Directory to store uploaded images
POST_UPLOAD_DIR = "uploads/posts"
client = AsyncIOMotorClient(MONGO_URL)
dotenv_path = os.path.join(os.path.dirname(__file__), "server", ".env")
load_dotenv(dotenv_path=dotenv_path)
JWT_SECRET = os.getenv("JWT_SECRET")
if not JWT_SECRET:
    raise ValueError("JWT_SECRET is missing in the environment variables!")
print(f"Loaded JWT_SECRET: {JWT_SECRET[:10]}...") 

# Debug: Print first 10 chars
# Token decoding
def decode_token(token: str):
    print(f"Received token: '{token}'")
    if not token or token == "undefined":
        raise HTTPException(status_code=400, detail="No valid token provided")
    if token.startswith("Bearer "):
        token = token.split("Bearer ")[1].strip()
        print(f"Token after stripping Bearer: '{token}'")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        print(f"Decoded token payload: {payload}")
        user_id = payload.get("userId")
        if not user_id:
            raise HTTPException(status_code=400, detail="Invalid token: Missing userId")
        print(f"Decoded user_id: {user_id}")
        return user_id
    except jwt.InvalidTokenError as e:
        print(f"Token decode error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Invalid token: {str(e)}")



# Directory for uploaded images
PROFILE_UPLOAD_DIR = "uploads/profiles"
os.makedirs(PROFILE_UPLOAD_DIR, exist_ok=True)

# Pydantic model for validation
class ProfileUpdate(BaseModel):
    phone: str | None = None
    gender: str | None = None

# GET /profile/ (existing)
@app.get("/profile/")
async def get_user_profile(token: str = Depends(oauth2_scheme)):
    try:
        print(f"🔍 Raw Token: {token}")  # Debug log to verify token
        user_id = str(decode_token(token))
        user = await user_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Handle profile image
        profile_image = user.get("profileImage")
        if profile_image:
            profile_image = str(profile_image).strip()
        else:
            profile_image = None

        # Get phoneNumber (required from signup) and gender (optional)
        phone = user.get("phone")  # Changed from "phone" to match signup
        gender = user.get("gender", None)

        # Return flat structure to match frontend expectation
        return {
            "_id": str(user["_id"]),
            "firstName": user.get("firstName", ""),
            "lastName": user.get("lastName", ""),
            "email": user.get("email", ""),
            "phone": phone,  # Changed to "phoneNumber" for consistency
            "gender": gender,
            "profileImage": profile_image,
        }

    except jwt.InvalidTokenError as e:
        print(f"❌ JWT Error Details: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"❌ Profile Fetch Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# PUT /profile/ (new)

@app.put("/profile/")
async def update_user_profile(
    phone: str = Form(None),
    gender: str = Form(None),
    profileImage: UploadFile = File(None),
    token: str = Depends(oauth2_scheme)
):
    try:
        user_id = str(decode_token(token))
        user = await user_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Prepare update data
        update_data = {}
        if phone is not None and phone.strip():  # Only update if provided and non-empty
            update_data["phone"] = phone
        if gender is not None and gender.strip():  # Only update if provided and non-empty
            update_data["gender"] = gender
        if profileImage is not None:  # Handle file upload
            file_path = os.path.join(PROFILE_UPLOAD_DIR, f"{user_id}_{profileImage.filename}")
            with open(file_path, "wb") as f:
                f.write(await profileImage.read())
            update_data["profileImage"] = f"http://localhost:8000/uploads/profiles/{user_id}_{profileImage.filename}"  # Return URL

        # Check if there's anything to update
        if not update_data:
            raise HTTPException(status_code=400, detail="No valid data provided to update")

        # Update user in MongoDB
        await user_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

        # Fetch updated user
        updated_user = await user_collection.find_one({"_id": ObjectId(user_id)})
        profile_image = updated_user.get("profileImage", None)

        return {
            "user": {
                "_id": str(updated_user["_id"]),
                "firstName": updated_user.get("firstName", ""),
                "lastName": updated_user.get("lastName", ""),
                "email": updated_user.get("email", ""),
                "phone": updated_user.get("phone", ""),
                "gender": updated_user.get("gender", ""),
                "profileImage": profile_image if profile_image else None,
            },
            "message": "Profile updated successfully"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"❌ Profile Update Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.post("/posts/")
async def create_post(
    user_id: str = Form(...),
    content: str = Form(...),
    images: list[UploadFile] = File(None),
    identity: str = Form(...),
    token: str = Depends(oauth2_scheme)
):
    decoded_user_id = str(decode_token(token))
    if decoded_user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    image_urls = []
    if images:
        for image in images:
            if image:
                image_filename = f"{int(time.time())}_{image.filename}"
                image_path = os.path.join(POST_UPLOAD_DIR, image_filename)
                with open(image_path, "wb") as buffer:
                    shutil.copyfileobj(image.file, buffer)
                image_urls.append(f"http://localhost:8000/uploads/posts/{image_filename}")

    ict_timezone = pytz.timezone("Asia/Phnom_Penh")
    post_dict = {
        "user_id": user_id,
        "content": content,
        "likes": 0,
        "image_urls": image_urls,
        "identity": identity,
        "createdAt": datetime.now(ict_timezone),  # Use ICT
        "status": "pending"
    }

    result = await post_collection.insert_one(post_dict)
    post_dict["_id"] = str(result.inserted_id)
    post_dict["createdAt"] = post_dict["createdAt"].isoformat()
    return post_dict
@app.delete("/posts/{post_id}")
async def delete_post(post_id: str):
    if not ObjectId.is_valid(post_id):  # Check if it's a valid ObjectId
        raise HTTPException(status_code=400, detail="Invalid post ID format")

    result = await post_collection.delete_one({"_id": ObjectId(post_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")

    return {"message": "Post deleted"}

    
@app.get("/posts/")
async def get_posts(token: str = Depends(oauth2_scheme)):
    user_id = str(decode_token(token))
    posts = []
    async for post in post_collection.find().sort("createdAt", -1):
        user = await user_collection.find_one({"_id": ObjectId(post["user_id"])})
        liked = await like_collection.find_one({"post_id": str(post["_id"]), "user_id": user_id})
        # Fetch comments for this post
        comments = []
        async for comment in comment_collection.find({"post_id": str(post["_id"])}).sort("created_at", 1):
            comments.append({
    "id": str(comment["_id"]),
    "post_id": comment["post_id"],
    "user_id": comment["user_id"],
    "content": comment["content"],
    "identity": comment.get("identity", "Anonymous"),  # Default to "Anonymous"
    "created_at": comment["created_at"].isoformat() if comment["created_at"] else None
})
        post_data = {
            "id": str(post["_id"]),
            "user_id": str(post["user_id"]),
            "content": post["content"],
            "likes": post["likes"],
            "image_urls": post.get("image_urls", []),
            "identity": post["identity"],
            "createdAt": post["createdAt"].isoformat(),
            "status": post.get("status", "pending"),
            "liked_by_user": bool(liked),
            "comments": comments,  # Add comments here
            "author": {
                "firstName": user.get("firstName", "") if user else "",
                "lastName": user.get("lastName", "") if user else "",
                "profileImage": user.get("profileImage", None) if user else None
            } if post["identity"] != "Anonymous" else None
        }
        posts.append(post_data)
    return posts

@app.put("/posts/{post_id}")
async def update_post(
    post_id: str,
    content: str = Form(...),
    images: list[UploadFile] = File(None),
    existingImages: str = Form(None),
    status: str = Form(...),
    token: str = Depends(oauth2_scheme)
):
    user_id = str(decode_token(token))
    post = await post_collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this post")

    # Handle new images
    new_image_urls = []
    if images:
        for image in images:
            if image:
                image_filename = f"{int(time.time())}_{image.filename}"
                image_path = os.path.join(POST_UPLOAD_DIR, image_filename)
                with open(image_path, "wb") as buffer:
                    shutil.copyfileobj(image.file, buffer)
                new_image_urls.append(f"http://localhost:8000/uploads/posts/{image_filename}")

    # Parse existing images
    existing_image_urls = []
    if existingImages:
        try:
            existing_image_urls = json.loads(existingImages)
            if not isinstance(existing_image_urls, list):
                raise ValueError("existingImages must be a list")
        except (json.JSONDecodeError, ValueError):
            raise HTTPException(status_code=400, detail="Invalid format for existingImages")
    else:
        existing_image_urls = post.get("image_urls", [])

    # Clean up old images that were removed
    old_image_urls = post.get("image_urls", [])
    images_to_delete = [url for url in old_image_urls if url not in existing_image_urls]
    for url in images_to_delete:
        filename = url.split("/")[-1]
        file_path = os.path.join(POST_UPLOAD_DIR, filename)
        if os.path.exists(file_path):
            os.remove(file_path)

    # Combine existing and new images
    updated_image_urls = existing_image_urls + new_image_urls

    # Set updatedAt to Cambodia time (ICT, UTC+07:00)
    ict_timezone = pytz.timezone("Asia/Phnom_Penh")
    updated_at_ict = datetime.now(ict_timezone)

    # Update the post
    updated_post = {
        "content": content,
        "image_urls": updated_image_urls,
        "status": status,
        "updatedAt": updated_at_ict  # Store as ICT timestamp
    }
    await post_collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": updated_post}
    )

    # Fetch and return the updated post
    updated_post_data = await post_collection.find_one({"_id": ObjectId(post_id)})
    updated_post_data["_id"] = str(updated_post_data["_id"])
    updated_post_data["updatedAt"] = updated_post_data["updatedAt"].isoformat()  # Convert to ISO string
    return updated_post_data

# @app.get("/posts/")
# async def get_posts():
#     posts = []
#     async for post in post_collection.find():
#         # Convert MongoDB _id to string
#         post["_id"] = str(post["_id"])  
        
#         # Fetch user data
#         user = await user_collection.find_one({"_id": ObjectId(post["user_id"])})
#         if user:
#             post["user_id"] = {  # Replace user_id with user object
#                 "_id": str(user["_id"]),
#                 "firstName": user.get("firstName", ""),
#                 "lastName": user.get("lastName", ""),
#                 "profileImage": user.get("profileImage", "/default-profile.png"),
#             }
#         else:
#             post["user_id"] = None  # Handle missing user
        
#         posts.append(post)

#     return posts

# Model for comments
class CommentCreate(BaseModel):
    post_id: str
    content: str


@app.post("/likes/")
async def like_post(post_id: str = Form(...), token: str = Depends(oauth2_scheme)):
    user_id = str(decode_token(token))

    # Validate post_id as ObjectId
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID format")

    post = await post_collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # Check if user already liked the post
    existing_like = await like_collection.find_one({"post_id": post_id, "user_id": user_id})
    if existing_like:
        raise HTTPException(status_code=400, detail="User already liked this post")

    # Add like and increment count
    await like_collection.insert_one({"post_id": post_id, "user_id": user_id})
    await post_collection.update_one({"_id": ObjectId(post_id)}, {"$inc": {"likes": 1}})

    updated_post = await post_collection.find_one({"_id": ObjectId(post_id)})
    return {
        "message": "Post liked",
        "post_id": post_id,
        "likes": updated_post["likes"],
        "liked": True
    }

@app.delete("/likes/{post_id}/")
async def unlike_post(post_id: str, token: str = Depends(oauth2_scheme)):
    user_id = str(decode_token(token))  # ✅ Ensure user_id is a string
# Convert to ObjectId before storing

    post = await post_collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # Check if user has liked the post
    like = await like_collection.find_one({"post_id": post_id, "user_id": user_id})
    if not like:
        raise HTTPException(status_code=400, detail="User has not liked this post")

    # Remove like entry and decrement likes
    await like_collection.delete_one({"post_id": post_id, "user_id": user_id})
    await post_collection.update_one({"_id": str(post_id)}, {"$inc": {"likes": -1}})

    return {"message": "Post unliked", "likes": max(0, post["likes"] - 1)}

@app.post("/comments/")
async def create_comment(
    post_id: str = Form(...),
    token: str = Depends(oauth2_scheme),
    content: str = Form(...),
    identity: str = Form(...)
):
    user_id = str(decode_token(token))
    ict_timezone = pytz.timezone("Asia/Phnom_Penh")
    comment_dict = {
        "post_id": post_id,
        "user_id": user_id,
        "content": content,
        "identity": identity,
        "created_at": datetime.now(ict_timezone)  # Use ICT
    }
    result = await comment_collection.insert_one(comment_dict)
    comment_dict["_id"] = str(result.inserted_id)
    comment_dict["created_at"] = comment_dict["created_at"].isoformat()
    return comment_dict


@app.get("/comments/{post_id}")
async def get_comments(post_id: str):
    comments = []
    async for comment in comment_collection.find({"post_id": post_id}).sort("created_at", 1):
        comments.append({
            "id": str(comment["_id"]),
            "post_id": comment["post_id"],
            "user_id": comment["user_id"],
            "content": comment["content"],
            "created_at": comment["created_at"]
        })
    return comments



#=========================================================Admin Manage post ==========================================================================


@app.get("/admin/posts/pending/")
async def get_pending_posts():
    posts = []
    async for post in post_collection.find({"status": "pending"}).sort("createdAt", -1):
        user = await user_collection.find_one({"_id": ObjectId(post["user_id"])})
        
        posts.append({
            "id": str(post["_id"]),
            "user": {
                "firstName": user.get("firstName", "") if user else "Unknown",
                "lastName": user.get("lastName", "") if user else "User",
            },
            "content": post["content"],
            "likes": post["likes"],
            "image_urls": post.get("image_urls", []),
            "createdAt": post["createdAt"].isoformat(),
            "status": post["status"]
        })
    return posts


@app.put("/admin/posts/{post_id}/approve/")
async def approve_post(post_id: str):
    result = await post_collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": {"status": "approved"}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")

    return {"message": "Post approved successfully"}

@app.delete("/admin/posts/{post_id}/reject/")
async def reject_post(post_id: str):
    result = await post_collection.delete_one({"_id": ObjectId(post_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")

    return {"message": "Post rejected and deleted successfully"}



@app.put("/admin/posts/{post_id}/reject/")
async def reject_post(post_id: str):
    result = await post_collection.update_one({"_id": ObjectId(post_id)}, {"$set": {"status": "rejected"}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post rejected"}


@app.get("/posts/")
async def get_posts(token: str = Depends(oauth2_scheme)):
    try:
        user_id = str(decode_token(token))
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
    posts = []
    async for post in post_collection.find().sort("createdAt", -1):
        posts.append({
            "id": str(post["_id"]),
            "user_id": str(post["user_id"]),
            "content": post["content"],
            "likes": post["likes"],
            "image_urls": post.get("image_urls", []),
            "identity": post["identity"],
            "createdAt": post["createdAt"].isoformat(),
            "status": post["status"]
        })
    return posts



# -------------------------------------------------------------------
# Endpoint to create a new conversation
@app.post("/chat/conversations/")
async def create_conversation(
    title: str = Form(...),
    token: str = Depends(oauth2_scheme)
):
    user_id = decode_token(token)
    conversation_doc = {
        "user_id": ObjectId(user_id),
        "title": title,
        "created_at": datetime.utcnow()
    }
    result = await chat_conversations_collection.insert_one(conversation_doc)
    conversation_doc["_id"] = result.inserted_id
    return {
        "conversation_id": str(conversation_doc["_id"]),
        "title": title,
        "created_at": conversation_doc["created_at"]
    }

# -------------------------------------------------------------------
# Endpoint to list all conversations for the authenticated user
@app.get("/chat/conversations/")
async def list_conversations(token: str = Depends(oauth2_scheme)):
    user_id = decode_token(token)
    conversations = []
    cursor = chat_conversations_collection.find({"user_id": ObjectId(user_id)}).sort("created_at", -1)
    async for conv in cursor:
        conversations.append({
            "conversation_id": str(conv["_id"]),
            "title": conv["title"],
            "created_at": conv["created_at"]
        })
    return conversations

# -------------------------------------------------------------------
# Endpoint to retrieve messages for a given conversation
@app.get("/chat/conversations/{conversation_id}")
async def get_conversation_messages(
    conversation_id: str,
    token: str = Depends(oauth2_scheme)
):
    user_id = decode_token(token)
    # Verify the conversation belongs to the user
    conversation = await chat_conversations_collection.find_one({
        "_id": ObjectId(conversation_id),
        "user_id": ObjectId(user_id)
    })
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    messages = []
    cursor = chat_messages_collection.find({"conversation_id": ObjectId(conversation_id)}).sort("timestamp", 1)
    async for msg in cursor:
        messages.append({
            "message_id": str(msg["_id"]),
            "sender": msg["sender"],
            "text": msg["text"],
            "timestamp": msg["timestamp"]
        })
    return {
        "conversation_id": conversation_id,
        "messages": messages
    }

# -------------------------------------------------------------------
# Endpoint to ask a question within a conversation
@app.post("/chat/ask/")
async def ask_question(
    conversation_id: str = Form(...),
    question: str = Form(...),
    token: str = Depends(oauth2_scheme)
):
    user_id = decode_token(token)
    # Ensure the conversation belongs to the user
    conversation = await chat_conversations_collection.find_one({
        "_id": ObjectId(conversation_id),
        "user_id": ObjectId(user_id)
    })
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # 1. Store the user's message in the messages collection
    user_message = {
        "conversation_id": ObjectId(conversation_id),
        "sender": "user",
        "text": question,
        "timestamp": datetime.utcnow()
    }
    await chat_messages_collection.insert_one(user_message)
    
    # 2. Generate the bot's response
    bot_response = get_answer(question)
    
    # 3. Store the bot's response in the messages collection
    bot_message = {
        "conversation_id": ObjectId(conversation_id),
        "sender": "bot",
        "text": bot_response,
        "timestamp": datetime.utcnow()
    }
    await chat_messages_collection.insert_one(bot_message)
    
    return {"response": bot_response}


# -------------------------------------------------------------------
# Endpoint to delete a conversation (and its messages)
@app.delete("/chat/conversations/{conversation_id}")
async def delete_conversation(
    conversation_id: str,
    token: str = Depends(oauth2_scheme)
):
    user_id = decode_token(token)
    # Verify that the conversation exists and belongs to the user
    conversation = await chat_conversations_collection.find_one({
        "_id": ObjectId(conversation_id),
        "user_id": ObjectId(user_id)
    })
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Delete the conversation document
    await chat_conversations_collection.delete_one({"_id": ObjectId(conversation_id)})
    # Delete all messages belonging to this conversation
    await chat_messages_collection.delete_many({"conversation_id": ObjectId(conversation_id)})
    
    return {"message": "Conversation deleted successfully"}

# API endpoint updated to match frontend expectations
# @app.post("/ask")
# async def answer_question(query: Query):
#     response = get_answer(query.message)
#     return {"response": response}
@app.post("/ask")
async def answer_question(query: Query):
    print("🛠 Incoming message:", query.message)
    response = get_answer(query.message)
    return {"response": response}


# ==========================================================chatbot history ==========================================================================

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


