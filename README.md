#  MindScope

MindScope is a full-stack web application designed to provide intelligent mental health insights and analysis. The platform combines a smooth, animated, and responsive user interface with a robust FastAPI backend powered by machine learning models.

* **Live Demo:** [MindScope Website](https://mindscope-vsfo.onrender.com)

---

##  Tech Stack

### Frontend
* **React** (built with Vite)
* **HTML5 & JavaScript (JSX)**
* **Tailwind CSS** for styling
* **Custom Animations** for an engaging user experience

### Backend
* **FastAPI** (Python web framework)
* **Machine Learning Model** (`Mental_Health_model.pkl`) for predictive analysis
* **Pandas / NumPy** for data handling
* **Jupyter Notebooks** (`/Notebooks`) for data exploration and model training

---

##  Project Structure

```text
├── Frontend/                 # React frontend application
│   ├── src/                  # React components, styles, and assets
│   ├── public/               # Public static assets
│   ├── package.json          # Frontend dependencies and scripts
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── vite.config.js        # Vite bundler configuration
│
└── Backend/                  # FastAPI backend application
    ├── Dataset/              # Training and analysis datasets
    ├── Notebooks/            # Jupyter notebooks for ML experimentation
    ├── src/                  # Backend source modules
    ├── main.py               # FastAPI application entry point
    ├── Mental_Health_model.pkl # Serialized machine learning model
    └── requirements.txt      # Python dependencies