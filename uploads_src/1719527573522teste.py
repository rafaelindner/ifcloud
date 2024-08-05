
from helpers.file_utils import read_params_file

params_file = sys.argv[1]
data = read_params_file(params_file)

print(data[:100])
    
