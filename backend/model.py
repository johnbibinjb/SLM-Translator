

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

MODEL_NAME = "Helsinki-NLP/opus-mt-en-dra"
TARGET_LANGUAGE = ">>tam<<"

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
model.to(DEVICE)
model.eval()


def translation_text(text: str) -> str:
    if not isinstance(text, str):
        raise TypeError("Input must be a string.")

    text = text.strip()

    if not text:
        raise ValueError("Please enter text to translate.")

    formatted_text = f"{TARGET_LANGUAGE} {text}"

    inputs = tokenizer(
        formatted_text,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )

    inputs = {
        key: value.to(DEVICE)
        for key, value in inputs.items()
    }

    with torch.inference_mode():
        output = model.generate(
            **inputs,
            max_new_tokens=256,
            num_beams=4,
            do_sample=False
        )

    result = tokenizer.decode(
        output[0],
        skip_special_tokens=True
    )

    return result.strip()
