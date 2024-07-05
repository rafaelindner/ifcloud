import sys
import logging
from biosppy.signals import ecg
import numpy as np
from helpers.file_utils import read_params_file

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    
    data = read_params_file()
    arrFloat = signal = np.array([float(i) for i in data.split()])
    
    # Defina os índices para o início e o fim do período desejado
    # start_index = int(sys.argv[2])
    # end_index = int(sys.argv[3])

    start_index = 4
    end_index = 10

    # Selecione o período desejado do sinal
    segment = arrFloat[start_index:end_index]

    # Agora, você pode passar o segmento para o BioSPPy para análise
    out = ecg.ecg(signal=segment, sampling_rate=360, show=False)

    print(list(out[0]))

    sys.stdout.flush()