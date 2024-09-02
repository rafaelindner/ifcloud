import sys
import numpy as np
from biosppy.signals import ecg

# Load data from EECG.TXT
signal = np.loadtxt('ECG.TXT')

# Process the signal and plot the results
out = ecg.ecg(signal=signal, sampling_rate=256.41, show=True)
print(out)