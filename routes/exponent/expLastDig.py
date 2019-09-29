import sys
import math
import json
import warnings

warnings.filterwarnings('ignore')

n = 0
p = 0

for i in sys.argv[1:]:
    if n is 0:
        n = i
    elif p is 0:
        p = i

n = int(n)
p = int(p)


def lastDigit(n, p):
    cycle = [n % 10]

    while True:
        a = cycle[-1] * n
        next = a % 10
        if next == cycle[0]:
            break
        cycle.append(next)
    return cycle[(p - 1) % len(cycle)]


def firstDigit(n, p):
    dec = (math.log10(n) * p) % 1
    return int(10 ** dec)


def numDigit(n, p):
    return int(p * math.log10(n) + 1)


output = []

if n is 0:
    output = [0, 1, 0]
elif p is 0:
    output = [1, 1, 1]
else:
    output.append(firstDigit(n, p))
    output.append(numDigit(n, p))
    output.append(lastDigit(n, p))
print(json.dumps({"result": output}))
