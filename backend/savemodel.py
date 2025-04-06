from transformers import AutoModelForQuestionAnswering, AutoTokenizer

model_name = "bert-large-uncased-whole-word-masking-finetuned-squad"

# Download and save the model locally
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

# Save it to a local directory
local_model_path = "/Users/lsbizz/Documents/AllMyCode/Capstone_Project/Pregnancy_Project 2/backend/data/bert_pregnancy_model"
tokenizer.save_pretrained(local_model_path)
model.save_pretrained(local_model_path)

print("Model downloaded and saved locally.")
