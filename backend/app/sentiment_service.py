
import json
import re
from pathlib import Path

import numpy as np
import onnxruntime as ort


# Model directory
MODEL_DIR = Path(__file__).resolve().parent.parent / "sentiment_model"

# Load configuration
with open(MODEL_DIR / "config.json", "r", encoding="utf-8") as file:
    CONFIG = json.load(file)

MAX_WORDS = CONFIG["max_words"]
MAX_LENGTH = CONFIG["max_length"]
LABELS = CONFIG["labels"]

# Load tokenizer vocabulary
with open(MODEL_DIR / "tokenizer.json", "r", encoding="utf-8") as file:
    tokenizer_data = json.load(file)

tokenizer_config = tokenizer_data["config"]
WORD_INDEX = json.loads(tokenizer_config["word_index"])

OOV_INDEX = WORD_INDEX[tokenizer_config["oov_token"]]
FILTERS = tokenizer_config["filters"]
SPLIT = tokenizer_config["split"]


def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"[^a-z\s']", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def preprocess_review(text):
    text = clean_text(text)

    # Match Keras Tokenizer's punctuation filtering
    translate_table = str.maketrans(
        {character: SPLIT for character in FILTERS}
    )
    text = text.translate(translate_table)

    tokens = text.split(SPLIT)

    sequence = []

    for token in tokens:
        if not token:
            continue

        index = WORD_INDEX.get(token, OOV_INDEX)

        if MAX_WORDS and index >= MAX_WORDS:
            index = OOV_INDEX

        sequence.append(index)

    # Post-padding and post-truncation
    sequence = sequence[:MAX_LENGTH]
    sequence += [0] * (MAX_LENGTH - len(sequence))

    return np.array(sequence, dtype=np.float32)


# Load ONNX model
SESSION = ort.InferenceSession(
    str(MODEL_DIR / "bilstm_sentiment.onnx"),
    providers=["CPUExecutionProvider"]
)

INPUT_NAME = SESSION.get_inputs()[0].name


def predict_sentiment(text):
    input_data = preprocess_review(text).reshape(1, MAX_LENGTH)

    probabilities = SESSION.run(
        None,
        {INPUT_NAME: input_data}
    )[0][0]

    predicted_class = int(np.argmax(probabilities))

    return {
        "sentiment": LABELS[str(predicted_class)],
        "probabilities": {
            LABELS[str(index)]: round(float(probability), 4)
            for index, probability in enumerate(probabilities)
        }
    }
