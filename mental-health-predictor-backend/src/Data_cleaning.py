import numpy as np
import pandas as pd 

def deleting_duplictions(data):
    data = data.drop_duplicates()
    return data

def clean_physical_activity_hours(data,column='Physical_Activity_Hours'):
    if column in data.columns:
        data[column]=data[column].clip(lower=0)
    return data
