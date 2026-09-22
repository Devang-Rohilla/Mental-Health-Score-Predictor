# Mindscope — Mental Health Prediction Frontend

A React + Tailwind + Framer Motion frontend for a mental wellbeing prediction
model served by a FastAPI backend at `http://localhost:8000/predict`.

## 1. Setup

This project folder already contains the finished source (`package.json`,
`src/`, configs). You just need to install dependencies and run it — you do
**not** need to re-run `npm create vite`.

```bash
# from inside this folder
npm install
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`). Open it in
your browser.

If you are starting completely from scratch instead of using this folder,
this is the sequence that produced it:

```bash
npm create vite@latest mental-health-predictor -- --template react
cd mental-health-predictor
npm install
npm install axios framer-motion react-icons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Backend requirement: enable CORS

The form calls `http://localhost:8000/predict` directly from the browser, so
your FastAPI app must allow that origin, e.g.:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["*"],
)
```

Without this, the browser will block the request and the app will show the
"couldn't reach the server" error message.

## 3. Expected request/response shape

**Request** (`POST /predict`):

```json
{
  "age": 21,
  "gender": "Female",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Entertainment",
  "avg_daily_usage_hours": 4.5,
  "daily_unlocks": 60,
  "study_hours": 3,
  "physical_activity_hours": 1,
  "sleep_hours_per_night": 6.5,
  "stress_level": "Medium"
}
```

**Response:**

```json
{ "predicted_mental_health_score": 6.77 }
```

The result gauge assumes the score is on a 0–10 scale. If your model's range
differs, change `MAX_SCORE` in `src/components/ResultCard.jsx`.

## 4. Project structure

```
src/
  App.jsx                     – page layout (context panel + form)
  index.css                   – Tailwind layers, font import, base styles
  constants/formOptions.js    – dropdown options, field groupings, defaults
  components/
    ContextPanel.jsx          – left-hand intro panel
    ProgressTrack.jsx         – 3-step progress indicator
    SelectField.jsx           – custom animated dropdown (+ optional search)
    NumberField.jsx           – styled number input
    PredictionForm.jsx        – state, validation, step logic, API call
    ResultCard.jsx            – animated score gauge + supportive message
```

## 5. Notes

- Validation happens per step, so the user can't move on with missing or
  out-of-range values.
- Network/CORS/timeout errors surface as a plain-language banner rather than
  a console-only failure.
- This is a screening estimate, not a diagnostic tool — the copy in
  `ContextPanel.jsx` says so; keep that framing if you extend the app.
