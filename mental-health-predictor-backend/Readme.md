#  MindScope Backend

This is the backend service for **MindScope**, built using **FastAPI** and powered by a machine learning model to deliver mental health insights and predictive analysis[cite: 2].

---

##  Tech Stack & Libraries

* **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (High-performance Python web framework)
* **Server:** Uvicorn
* **Machine Learning:** Scikit-Learn (**Random Forest Regressor**)
* **Data Processing:** Pandas, NumPy
* **Environment:** Python 3.x

---

##  Machine Learning Model Details

The core intelligence of MindScope is driven by a predictive pipeline utilizing a **Random Forest Regressor**:

* **Algorithm:** Random Forest Regressor (an ensemble learning method that constructs multiple decision trees during training and outputs the average prediction of the individual trees to improve accuracy and control over-fitting).
* **Model File:** `Mental_Health_model.pkl` (Serialized using `joblib` or `pickle` for fast loading at startup)[cite: 2].
* **Training Workflow:** 
  * Exploratory Data Analysis and training scripts are located in the `Notebooks/` directory[cite: 2].
  * Raw and processed training datasets are stored in `Dataset/`[cite: 2].

---

##  Backend Directory Structure

```text
Backend/
├── Dataset/                  # Training and testing datasets
├── Notebooks/                # Jupyter notebooks used for model experimentation and training
├── __pycache__/              # Python compiled bytecode
├── src/                      # Source code modules (routers, schemas, utils)
├── main.py                   # FastAPI application entry point and endpoint definitions
├── Mental_Health_model.pkl   # Serialized Random Forest Regressor model
└── requirements.txt          # Python dependencies