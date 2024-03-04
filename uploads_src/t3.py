import sys
import logging
from biosppy.signals import ecg

logging.basicConfig(level=logging.INFO)

if len(sys.argv) <= 2:
    logging.info('Not enough arguments!')
    print("Not enough arguments!")
    sys.stdout.flush()
    sys.exit()

arrString = sys.argv[1].split(',')
arrInt = [int(val) for val in arrString]

# Defina os índices para o início e o fim do período desejado
start_index = int(sys.argv[2])
end_index = int(sys.argv[3])

# Selecione o período desejado do sinal
segment = arrInt[start_index:end_index]

# Agora, você pode passar o segmento para o BioSPPy para análise
out = ecg.ecg(signal=segment, sampling_rate=360, show=False)

print(list(out[0]))

sys.stdout.flush()