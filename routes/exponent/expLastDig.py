import sys
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

cycle = [n % 10]

while True:
    a = cycle[-1] * n
    next = a % 10
    if next == cycle[0]:
        break
    cycle.append(next)
print(cycle[(p - 1) % len(cycle)])
