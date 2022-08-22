class PredictionModel:
    def __init__(self, encoder, model):
        self.encoder = encoder
        self.model = model

    def predict(self, inp):
        import numpy as np

        encoded_part = self.encoder.transform(inp[['Species']]).toarray()
        X = inp.drop(['Species'], axis=1)
        np.hstack([X.values, encoded_part])

        return self.model.predict(X)