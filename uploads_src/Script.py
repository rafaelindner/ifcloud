import sys
import json
import logging
from helpers.file_utils import read_params_file


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    
    data = read_params_file()

    res = {
        "Response": 200,
        "Script Name": sys.argv[0],
        "Message": data
    }

    print(json.dumps(res))

    sys.stdout.flush()
