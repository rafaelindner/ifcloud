import numpy as np
from biosppy.signals import ecg
import sys

arr = []

if len(sys.argv) == 1:
    # load raw ECG signal from file
    arr.append(-1)
    signal = np.loadtxt('./Files/1-NSR/100m (0).txt')
else:
    # load raw ECG signal from JSON FHIR
    for i, value in enumerate(sys.argv):
        if i != 0:
            teste = float(value)
            arr.append(int(teste))
    signal = arr

print("o tipo de signal eh...")
print(type(signal))


# process it and plot
out = ecg.ecg(signal=signal, sampling_rate=360.0, show=False)
print(out['heart_rate'])



