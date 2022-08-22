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

            formatted_data.append(r)

        df = pd.DataFrame(
            columns=["Species", "LengthVer", "LengthDia",
                     "LengthCro", "Height", "Width"],
            data=formatted_data
        )

        y = model.predict(df)

        response = []

        for row, weight in zip(formatted_data, y):
            response.append({"features": {
                            "Species": row[0], "LengthVer": row[1], "LengthDia": row[2], "LengthCro": row[3], "Height": row[4], "Width": row[5]}, "weight": weight})

        return Response(response)
