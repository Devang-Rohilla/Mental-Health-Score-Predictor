import numpy as np 
import pandas as pd  

def group_countries(data,top_countries,country):
  if country in top_countries:
    return country
  else:
    return 'Other'