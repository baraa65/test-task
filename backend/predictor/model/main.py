import pickle
import pandas as pd
from .model_class import PredictionModel

pickle_path = 'predictor/model/weight-prediction.model'

model = pickle.load(open(pickle_path, 'rb'))

