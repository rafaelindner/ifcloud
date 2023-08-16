import sys
import json
import logging

logging.basicConfig(level=logging.INFO)

if len(sys.argv) == 1:
    logging.info('Not arguments!')
    print("Not arguments!")
    sys.exit()

text = ""

for value in sys.argv[1:]:
    if len(text) == 0:
        text += value
    else:
        text += " " + value

res = {
    "Response": 200,
    "Script Name": sys.argv[0],
    "Message": text
}

print(json.dumps(res))

sys.stdout.flush()
