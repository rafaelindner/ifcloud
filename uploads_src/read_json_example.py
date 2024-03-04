# import urllib library
from urllib.request import urlopen
import json
import numpy as np
from biosppy import storage
from biosppy.signals import ecg

# import json
import json
# store the URL in url as
# parameter for urlopen
url = "https://ecgremote.herokuapp.com/"
user = "whatever"
route = "/exams/"
id_exam = "609afbca1177f2001acc77ca"


# store the response of URL
response = urlopen(url + user + route + id_exam)
# storing the JSON response
# from url in data
data_json = json.loads(response.read())

lista = list(filter(None, data_json["data"]))
# print the json response
print(lista)
print( type(lista))
print(data_json["sampling_rate"])

# converting list to array
arr = np.array(lista,dtype=float)
 
# displaying array
print( type(arr))
print ("Array: ", arr)


print("-----------------------------------------")
print(" NOVO LOG... ")
print("-----------------------------------------")

out = ecg.ecg(signal=arr, sampling_rate=data_json["sampling_rate"], show=True)

class NDArrayEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


json_str = json.dumps({"filtered" : out['filtered'], 'rpeaks': out["rpeaks"],'bpm' :out["heart_rate"], "rate": data_json["sampling_rate"]}, cls=NDArrayEncoder)

print(json_str)