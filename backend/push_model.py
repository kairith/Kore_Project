from pyexpat import model
import torch

MODEL_PATH = "/Users/lsbizz/Documents/AllMyCode/Capstone_Project/Pregnancy_Project 2/backend/data/bert_pregnancy_classifier"

# Save the fine-tuned model
torch.save(model.state_dict(), f"{MODEL_PATH}/pytorch_model.bin")
print("Model saved successfully!")