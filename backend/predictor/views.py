import csv
import codecs
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .model.main import PredictionModel, model
import pandas as pd


def convert_to_float(str):
    try:
        return float(str)
    except ValueError:
        return str


class PredictorView(APIView):
    def post(self, request):
        file = request.FILES.get('file')
        reader = csv.DictReader(
            codecs.iterdecode(file, 'utf-8'), delimiter=',')

        data = list(reader)
        formatted_data = []

        for row in data:
            r = [convert_to_float(value)
                 for key, value in list(row.items())][1:]

            print(r)
            formatted_data.append(r)

        testing_sample = pd.DataFrame(
            columns=["Species", "LengthVer", "LengthDia",
                     "LengthCro", "Height", "Width"],
            data=formatted_data
        )

        y = model.predict(testing_sample)

        return Response(y)
