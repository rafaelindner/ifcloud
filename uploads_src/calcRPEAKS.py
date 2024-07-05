import json
import numpy as np
from biosppy import storage
from biosppy.signals import ecg
import os
import sys
# from pymongo import MongoClient
from bson.objectid import ObjectId
from helpers.file_utils import read_params_file

class NDArrayEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

if __name__ == '__main__':
    data = read_params_file()
    signal = np.array([float(i) for i in data.split()])
    
    # process it and plot
    out = ecg.ecg(signal=signal, sampling_rate=360, show=False)
    
    json_str = json.dumps({"filtered" : out['filtered'], 'rpeaks': out["rpeaks"],'bpm' :out["heart_rate"], "rate": 360}, cls=NDArrayEncoder, indent=4)

    data = out["rpeaks"]
    
    string_data = ' '.join(map(str, data))
    print(string_data)


# with open('joined_filtered_100m.txt', 'w') as convert_file: 
#      convert_file.write(json_str)