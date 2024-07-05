import biosppy.signals.ecg as ecg
from helpers.file_utils import read_params_file

if __name__ == "__main__":
    str = read_params_file()
    print(str)