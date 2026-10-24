# TruthCheck — Fake News Detection System

A machine-learning-based Fake News Detection System developed as an Object-Oriented Software Engineering (OOSE) mini-project.

## About the Project

TruthCheck is a web-based application that analyzes a news headline or article and predicts whether the submitted text resembles examples labeled as likely real or likely fake using a machine-learning classification model.

The project demonstrates frontend development, backend integration, text processing, machine learning, input validation, and displaying prediction results.

## Features

- Responsive web interface
- News headline and article input
- Machine-learning classification using TF-IDF and Logistic Regression
- Prediction result and confidence display
- Word and character counts
- Sample news text buttons
- Recent analysis history
- Input validation and error handling

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Python and Flask
- **Machine Learning:** scikit-learn
- **Text Processing:** TF-IDF Vectorization
- **Classification Algorithm:** Logistic Regression
- **Server:** Gunicorn
- **Dataset:** Illustrative CSV dataset

## Project Structure

```text
FakeNewsDetecction_TruthChecker/
├── app.py
├── README.md
├── requirements.txt
├── data/
│   └── news.csv
├── templates/
│   └── index.html
└── static/
    ├── script.js
    └── style.css
```

If you include a `.gitignore` file, keep it in the main project folder as well.

## Requirements

- Python 3.10 or newer
- Visual Studio Code (recommended)
- Internet connection for installing dependencies

## Installation and Setup

### 1. Clone the Repository

Open a terminal and run the following commands. Replace the repository URL with your actual GitHub repository URL if it is different.

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd FakeNewsDetecction_TruthChecker
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

### 3. Activate the Virtual Environment

**Windows PowerShell**

```powershell
.\.venv\Scripts\Activate.ps1
```

**Windows Command Prompt**

```bat
.venv\Scripts\activate.bat
```

### 4. Install Dependencies

```bash
python -m pip install -r requirements.txt
```

Make sure `requirements.txt` includes Flask, scikit-learn, and any other packages required by `app.py`. Include Gunicorn for deployment.

### 5. Run the Application

```bash
python app.py
```

### 6. Open the Website

Open your browser and visit:

http://127.0.0.1:5000

Keep the terminal running while you use the application. Press `Ctrl+C` in the terminal to stop the server.

## Deploying on Render

TruthCheck can be deployed as a Python web service on Render.

1. Push the complete project to GitHub.
2. Sign in to Render and create a new Web Service.
3. Connect the GitHub repository containing the project files.
4. Configure the build and start commands as shown below.

**Build Command**

```bash
pip install -r requirements.txt
```

**Start Command**

```bash
gunicorn app:app --bind 0.0.0.0:$PORT
```

5. Deploy the service and check the deployment logs.
6. When the service is successfully deployed, open the public URL provided by Render.

The project files must be in the repository root or the correct Render Root Directory. Keep `data/news.csv` inside the `data` folder and the frontend files in their respective folders.

## How It Works

1. The user enters a news headline or article.
2. JavaScript sends the submitted text to the Flask backend.
3. TF-IDF converts the text into numerical features.
4. A trained Logistic Regression classifier predicts a label.
5. The backend returns the prediction and estimated model confidence.
6. The webpage displays the result and updates the analysis history.

## Limitations

This version uses a small illustrative dataset for software demonstration. The model's predictions are not verified fact-checks and may be inaccurate.

The displayed confidence represents the model's estimated class probability, not proof that a news claim is true or false.

A production-quality system would require a large, reliable, properly labeled dataset, testing on unseen data, performance evaluation, and evidence-based verification from trusted sources.

## Future Enhancements

- Train and evaluate the model using a larger real-world dataset.
- Integrate trusted sources for claim verification.
- Add automated tests and performance metrics.
- Store analysis history in a database.
- Improve error handling and model evaluation.
- Deploy the application with reliable monitoring.

## Academic Project Details

- **Project Name:** TruthCheck — Fake News Detection System
- **Subject:** Object-Oriented Software Engineering (OOSE)
- **Project Type:** Mini-project

## Disclaimer

This project is intended for educational purposes only. Its predictions must not be treated as definitive proof of whether a news story is true or false. Always verify important claims with reliable sources.
