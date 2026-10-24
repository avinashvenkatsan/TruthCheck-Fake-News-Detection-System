from flask import Flask, render_template, request, jsonify
from pathlib import Path
import csv
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)
DATA = Path(__file__).resolve().parent / "data" / "news.csv"

def load_data():
    texts, labels = [], []
    with DATA.open(encoding="utf-8", newline="") as file:
        for row in csv.DictReader(file):
            text, label = row["text"].strip(), row["label"].strip()
            if text and label in {"likely_real", "likely_fake"}:
                texts.append(text)
                labels.append(label)
    if len(set(labels)) != 2:
        raise RuntimeError("Training CSV must contain both labels.")
    return texts, labels

texts, labels = load_data()
model = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2), strip_accents="unicode")),
    ("classifier", LogisticRegression(max_iter=1000, class_weight="balanced", random_state=42))
])
model.fit(texts, labels)

@app.route("/")
def home():
    return render_template("index.html")

@app.post("/api/analyze")
def analyze():
    body = request.get_json(silent=True) or {}
    news = str(body.get("news", "")).strip()
    if len(news) < 20:
        return jsonify(error="Please enter at least 20 characters."), 400
    if len(news) > 10000:
        return jsonify(error="Please keep the text under 10,000 characters."), 400
    prediction = model.predict([news])[0]
    probabilities = model.predict_proba([news])[0]
    confidence = float(probabilities[list(model.classes_).index(prediction)])
    fake = prediction == "likely_fake"
    return jsonify({
        "label": "Likely fake" if fake else "Likely real",
        "className": "fake" if fake else "real",
        "confidence": round(confidence * 100),
        "wordCount": len(news.split()),
        "characterCount": len(news),
        "disclaimer": "Educational prototype trained on a tiny illustrative dataset. This is not a fact-check and may be wrong. Verify claims with multiple reputable sources."
    })

if __name__ == "__main__":
    app.run(debug=True)
