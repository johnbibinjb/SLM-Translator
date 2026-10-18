
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch


tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-dra")

model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-en-dra")

text = ">>tam<< Artificial intelligence changes the world"

inputs = tokenizer(
    text,
    return_tensors="pt"
)



output = model.generate(**inputs)

translated_text = tokenizer.decode(
    output[0],
    skip_special_tokens=True
)

print("Translation:", translated_text)