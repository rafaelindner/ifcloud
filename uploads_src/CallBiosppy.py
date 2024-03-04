import sys
import logging
from biosppy.signals import ecg

logging.basicConfig(level=logging.INFO)

if len(sys.argv) == 1:
    logging.info('Not arguments!')
    print("Not arguments!")
    sys.stdout.flush()
    sys.exit()

arrString = sys.argv[1].split(',')

arrInt = [int(val) for val in arrString]

out = ecg.ecg(signal=arrInt, sampling_rate=360, show=False)

print(list(out[0]))

sys.stdout.flush()
