# # file_utils.py

# import sys

# def read_params_file():
#     if len(sys.argv) != 2:
#         print("Parâmetros inválidos!")
#         sys.exit(1)

#     params_file = sys.argv[1]

#     try:
#         with open(params_file, 'r') as file:
#             return file.read().strip()
#     except IOError:
#         print(f"Erro ao abrir o arquivo: {params_file}")
#         sys.exit(1)


# file_utils.py

import sys

def read_params_file(params_file):
    try:
        with open(params_file, 'r') as file:
            return file.read().strip()
    except IOError:
        print(f"Erro ao abrir o arquivo: {params_file}")
        sys.exit(1)



