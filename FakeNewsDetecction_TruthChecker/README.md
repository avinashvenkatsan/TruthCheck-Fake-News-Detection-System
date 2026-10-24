# TruthCheck — Fake News Detection OOSE Mini-Project

This is a local Flask website with HTML/CSS/JavaScript and a scikit-learn text classifier.

**Important:** `data/news.csv` is a tiny illustrative dataset made for demonstrating the software. Predictions are not reliable fact-checks and may be wrong. Do not use this model to determine whether real-world claims are true. A serious project needs a larger, sourced, labeled dataset and held-out evaluation.

## Run on Windows using VS Code

1. Extract the ZIP and open the `FakeNewsDetection_FullWebsite` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Run:
   ```powershell
   py -m venv .venv
   ```
4. Activate in PowerShell:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
   Or in Command Prompt:
   ```bat
   .venv\Scripts\activate.bat
   ```
5. Install dependencies:
   ```powershell
   python -m pip install -r requirements.txt
   ```
6. Start the server:
   ```powershell
   python app.py
   ```
7. Open `https://truthcheck-python-live.onrender.com` in your browser. Keep the terminal open while using it. Press Ctrl+C to stop.

## Files
- `app.py`: Flask server and model training
- `templates/index.html`: website structure
- `static/style.css`: responsive design
- `static/script.js`: form, API request, results, history
- `data/news.csv`: illustrative training examples
- `requirements.txt`: Python packages
