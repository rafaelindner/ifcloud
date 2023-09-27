import json
import numpy as np
from biosppy import storage
from biosppy.signals import ecg
import os

import sys

# from pymongo import MongoClient
from bson.objectid import ObjectId

# load raw ECG signal
signal, mdata = storage.load_txt('./uploads_src/ecg.txt')

print( type(signal))

# process it and plot
out = ecg.ecg(signal=signal, sampling_rate=360, show=False)



class NDArrayEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


json_str = json.dumps({"filtered" : out['filtered'], 'rpeaks': out["rpeaks"],'bpm' :out["heart_rate"], "rate": 360}, cls=NDArrayEncoder, indent = 4)

print(json_str)
