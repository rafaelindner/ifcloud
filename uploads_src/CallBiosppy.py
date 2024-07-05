import sys
import logging
from biosppy.signals import ecg
import numpy as np
from helpers.file_utils import read_params_file

logging.basicConfig(level=logging.INFO)

if __name__ == "__main__":
    data = read_params_file()
    signal = np.array([float(i) for i in data.split()])

    out = ecg.ecg(signal=signal, sampling_rate=360, show=False)

    print(list(out[0]))

    sys.stdout.flush()
