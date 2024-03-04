import sys
import biosppy.signals.ecg as ecg

if __name__ == "__main__":
    str = ""

    if len(sys.argv) == 1:
        str = "Não foi enviado nada!"
    else:
        for i, value in enumerate(sys.argv):
            if i != 0:
                str += value

    # Imprime a entrada original
    print("Entrada original:")
    print(str)