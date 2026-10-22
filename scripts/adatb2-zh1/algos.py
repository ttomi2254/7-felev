# Adatb2 papíros feladatok ellenőrzése: B+ fa, statikus/kiterjeszthető/lineáris hash, bitmap, RLE
import math

# ---------------- B+ fa (Garcia-Molina / óra konvenció) ----------------
# levél túlcsordul: ceil((M+1)/2) marad a bal oldalon, a jobb első kulcsa megy fel
# belső túlcsordul (N+1 kulcs, N+2 pointer): ceil((N+2)/2) pointer marad balra,
# a középső kulcs felmegy, nem marad egyik csúcsban sem
class Node:
    def __init__(s, leaf, keys=None, ch=None):
        s.leaf = leaf; s.keys = keys or []; s.ch = ch or []

def show(n):
    if n.leaf: return "[" + ",".join(map(str, n.keys)) + "]"
    return "(" + ",".join(map(str, n.keys)) + "){" + " ".join(show(c) for c in n.ch) + "}"

def levels(root):
    out = []; lvl = [root]
    while lvl:
        out.append("  ".join("[" + ",".join(map(str, n.keys)) + "]" for n in lvl))
        nxt = []
        for n in lvl:
            if not n.leaf: nxt += n.ch
        lvl = nxt
    return out

def bplus(keys, N, M):
    root = Node(True)
    for k in keys:
        # keresés
        path = []; n = root
        while not n.leaf:
            i = 0
            while i < len(n.keys) and k >= n.keys[i]: i += 1
            path.append((n, i)); n = n.ch[i]
        n.keys.append(k); n.keys.sort()
        if len(n.keys) <= M:
            continue
        print(f"  {k} beszúrása előtt (vágás jön):")
        n.keys.remove(k)
        for l in levels(root): print("     ", l)
        n.keys.append(k); n.keys.sort()
        left = math.ceil((M + 1) / 2)
        new = Node(True, n.keys[left:]); n.keys = n.keys[:left]
        up, child = new.keys[0], new
        while True:
            if not path:
                root = Node(False, [up], [n, child]); break
            p, i = path.pop()
            p.keys.insert(i, up); p.ch.insert(i + 1, child)
            if len(p.keys) <= N: break
            ptrs = len(p.ch); lp = math.ceil(ptrs / 2)
            newp = Node(False, p.keys[lp:], p.ch[lp:])
            up = p.keys[lp - 1]
            p.keys = p.keys[:lp - 1]; p.ch = p.ch[:lp]
            n, child = p, newp
        print(f"   ... {k} után:")
        for l in levels(root): print("     ", l)
    print("  VÉGÁLLAPOT:")
    for l in levels(root): print("     ", l)

print("== Óra példa (N=M=3) {10,20,5,6,12,30,7,17,19,8}")
bplus([10,20,5,6,12,30,7,17,19,8], 3, 3)
print("\n== 5. lecke kidolgozott feladat (belső 3 kulcs, levél 2 kulcs) {8,14,2,20,11,5,17}")
bplus([8,14,2,20,11,5,17], 3, 2)
print("\n== HW04 (N=M=3)")
bplus([39,15,50,70,79,83,72,43,75,45,60,80], 3, 3)

# ---------------- statikus hash ----------------
print("\n== 8. lecke kidolgozott feladat: statikus hash, 3 MSB, kapacitás 2")
keys = "110010 001101 110111 011000 110001 001011 100110 110100 110011".split()
b = {}
for k in keys: b.setdefault(k[:3], []).append(k)
for i in range(8):
    p = format(i, "03b"); lst = b.get(p, [])
    blocks = [lst[j:j+2] for j in range(0, len(lst), 2)] or [[]]
    print("  ", p, " -> ".join(str(x) for x in blocks))

# ---------------- kiterjeszthető hash ----------------
print("\n== HW05 kiterjeszthető hash")
i = 1
A = {"keys": ["0001"], "j": 1}; B = {"keys": ["1001", "1101"], "j": 1}
d = [A, B]
def dump():
    seen = []
    for idx, bk in enumerate(d):
        print("    ", format(idx, f"0{i}b"), "->", bk["keys"], "j=", bk["j"], "(ua.)" if bk in seen else "")
        seen.append(bk)
for k in "0011 0110 1011 0111 1110 1111 0100".split():
    while True:
        bk = d[int(k[:i], 2)]
        if len(bk["keys"]) < 2:
            bk["keys"].append(k); print("  ", k, "befér"); break
        if bk["j"] == i:
            i += 1; d = [x for x in d for _ in (0, 1)]
            print("  ", k, ": j=i -> i =", i, "duplázás")
        j = bk["j"]
        b0 = {"keys": [x for x in bk["keys"] if x[j] == "0"], "j": j + 1}
        b1 = {"keys": [x for x in bk["keys"] if x[j] == "1"], "j": j + 1}
        for idx in range(len(d)):
            if d[idx] is bk:
                d[idx] = b1 if format(idx, f"0{i}b")[j] == "1" else b0
        print("  ", k, ": vágás a(z)", j + 1, ". bit szerint")
    dump()

# ---------------- lineáris hash (hw05 szabályai szerint) ----------------
print("\n== HW05 lineáris hash: blokk 2 rekord, lánc max 4 rekord")
bk = {0: ["0000", "1110"], 1: ["0101"]}; n = 2; i = 1
def lin_ins(k):
    global n, i
    m = int(k[-i:], 2)
    if m >= n: m -= 2 ** (i - 1)
    if len(bk[m]) + 1 <= 4:
        bk[m].append(k); return True
    return False
def split():
    global n, i
    new = n; n += 1
    if n > 2 ** i: i += 1
    old = new - 2 ** (i - 1)
    allr = bk[old]; bk[old] = []; bk[new] = []
    for r in allr: bk[int(r[-i:], 2)].append(r)
    print(f"     új vödör {format(new, f'0{i}b')}, szétosztva a(z) {format(old, f'0{i}b')} vödörből")
def ldump():
    for x in sorted(bk):
        l = bk[x]; print("    ", format(x, f"0{i}b"), " | ".join(str(l[j:j+2]) for j in range(0, max(len(l), 1), 2)))
for k in "0001 0110 1011 0111 1100 1111 0100".split():
    while not lin_ins(k):
        print("   ", k, ": a lánc túllépné a 4 rekordot -> új vödör"); split()
    print("   ", k, "beszúrva");
ldump()

# ---------------- bitmap ----------------
print("\n== HW04 bitmap")
rows = [(1,"SMITH","CLERK",1980,20),(2,"ALLEN","SALESMAN",1981,30),(3,"WARD","SALESMAN",1981,30),
(4,"JONES","MANAGER",1981,20),(5,"MARTIN","SALESMAN",1981,30),(6,"BLAKE","MANAGER",1981,30),
(7,"CLARK","MANAGER",1981,10),(8,"SCOTT","ANALYST",1982,20),(9,"KING","PRESIDENT",1981,10),
(10,"TURNER","SALESMAN",1981,30),(11,"ADAMS","CLERK",1983,20),(12,"JAMES","CLERK",1981,30),
(13,"FORD","ANALYST",1981,20),(14,"MILLER","CLERK",1982,10)]
def bv(col, v): return "".join("1" if r[col] == v else "0" for r in rows)
for col, name in ((4, "deptid"), (2, "position"), (3, "start")):
    for v in sorted(set(r[col] for r in rows), key=str): print("  ", name, v, bv(col, v))
def AND(a, b): return "".join("1" if x == y == "1" else "0" for x, y in zip(a, b))
def OR(a, b): return "".join("1" if "1" in (x, y) else "0" for x, y in zip(a, b))
def NOT(a): return "".join("0" if x == "1" else "1" for x in a)
q1 = OR(AND(bv(3, 1981), bv(2, "CLERK")), AND(bv(4, 20), bv(2, "MANAGER")))
q2 = AND(NOT(bv(3, 1981)), OR(bv(4, 10), bv(4, 30)))
for q in (q1, q2): print("   q:", q, [rows[j][1] for j in range(14) if q[j] == "1"])

# ---------------- RLE ----------------
def rle_enc(bits):
    out = []; run = 0
    for c in bits:
        if c == "0": run += 1
        else:
            b = format(run, "b"); out.append("1" * (len(b) - 1) + "0" + b); run = 0
    return "".join(out), run
def rle_dec(code):
    out = []; p = 0
    while p < len(code):
        j = 1
        while code[p] == "1": j += 1; p += 1
        p += 1; v = int(code[p:p+j], 2); p += j; out.append("0" * v + "1")
    return "".join(out)
print("\n== RLE")
print("  enc:", rle_enc("00000000" "00000000" "00000001" "00000001" "01"))
print("  dec:", rle_dec("1111010101001011"), len(rle_dec("1111010101001011")))
print("  ell:", rle_enc(rle_dec("1111010101001011")))
