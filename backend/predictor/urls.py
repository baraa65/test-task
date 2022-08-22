from django.urls import path
from .views import PredictorView

urlpatterns = [
    path('predict-weight/', PredictorView().as_view())
]
