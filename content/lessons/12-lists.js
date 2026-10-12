LESSONS.push({
    id: "lists",
    title: "Listy i tablice",
    atom: ["Lists"],
    intro: "Kotlin rozróżnia listę tylko do odczytu (`listOf`) i listę modyfikowalną (`mutableListOf`). Lista modyfikowalna odpowiada liście Pythona, a tablice o stałym rozmiarze (`IntArray`, `Array`) — tablicom z C, ale ze sprawdzaniem zakresu.",
    c: `#include <stdio.h>

int main(void) {
    int primes[] = {2, 3, 5, 7};
    int n = sizeof(primes) / sizeof(primes[0]);
    printf("%d %d %d\\n", primes[0], n, primes[n - 1]);

    int squares[5];
    for (int i = 0; i < 5; i++) squares[i] = i * i;
    for (int i = 0; i < 5; i++) printf("%d ", squares[i]);
    printf("\\n");

    int sum = 0;
    for (int i = 0; i < n; i++) sum += primes[i];
    printf("%d\\n", sum);
    /* primes[10] — niezdefiniowane zachowanie, brak błędu */
    return 0;
}`,
    py: `primes = [2, 3, 5, 7]
print(primes)
print(primes[0], len(primes), primes[-1])

names = ["Ada", "Linus"]
names.append("Grace")
names[0] = "Alan"
del names[1]
print(names)
for i, p in enumerate(primes):
    print(f"{i}:{p}", end=" ")
print()
squares = [i * i for i in range(5)]
print(squares)
print(sum(primes))
print(primes[1:3])`,
    kt: `// Lists/Lists.kt

fun main() {
    val primes = listOf(2, 3, 5, 7)
    println(primes)
    println("\${primes[0]} \${primes.size} \${primes.last()}")
    // primes.add(11)   // błąd: List jest tylko do odczytu

    val names = mutableListOf("Ada", "Linus")
    names.add("Grace")
    names[0] = "Alan"
    names.removeAt(1)
    println(names)
    for ((i, p) in primes.withIndex()) print("$i:$p ")
    println()
    val squares = IntArray(5) { it * it }   // it = indeks
    println(squares.joinToString())
    println(primes.sum())
    println(primes.subList(1, 3))
}
/* Output:
[2, 3, 5, 7]
2 4 7
[Alan, Grace]
0:2 1:3 2:5 3:7
0, 1, 4, 9, 16
17
[3, 5]
*/`,
    changes: [
        "`listOf(...)` tworzy listę tylko do odczytu, `mutableListOf(...)` listę, do której można dodawać i z której można usuwać.",
        "Rozmiar to `size`, ostatni element to `last()`, zakres indeksów to `indices`.",
        "Indeks razem z elementem daje `withIndex()`, jak `enumerate` w Pythonie.",
        "`IntArray(n)`, `DoubleArray(n)`, `Array<String>(n) { ... }` to tablice o stałym rozmiarze. Wyjście poza zakres rzuca wyjątek, a nie psuje pamięci.",
        "Listy mają wiele gotowych metod: `sum()`, `max()`, `sorted()`, `contains()`, `indexOf()`, `reversed()`."
    ],
    traps: [
        { from: "py", text: "Lista z `listOf` jest tylko do odczytu: nie ma na niej `add`. Gdy chcesz ją zmieniać, użyj `mutableListOf`." },
        { from: "py", text: "Nie ma ujemnych indeksów ani wycinków: zamiast `lst[-1]` pisz `lst.last()`, zamiast `lst[1:3]` — `lst.subList(1, 3)`." },
        { from: "c", text: "`println(tablica)` wypisuje coś w rodzaju `[I@1b6d3586`, a nie zawartość. Użyj `tablica.joinToString()` albo `tablica.contentToString()`. Listy wypisują się poprawnie." },
        { from: "c", text: "`val` przy liście oznacza, że nie zmienisz referencji, ale zawartość `mutableListOf` nadal możesz modyfikować." }
    ],
    exercise: {
        task: "Dla listy temperatur wypisz najwyższą temperaturę, a w drugiej linii średnią.",
        expected: "21\n14.6",
        starter: `fun main() {
    val temps = listOf(12, 18, 7, 21, 15)
    // wypisz maksimum i średnią
}`,
        solution: `fun main() {
    val temps = listOf(12, 18, 7, 21, 15)
    println(temps.max())
    println(temps.average())
}`
    },
    cheats: [
        { from: "py", src: "lst = [1, 2, 3]", kt: "val lst = mutableListOf(1, 2, 3)", note: "listOf, jeśli bez zmian" },
        { from: "py", src: "lst = []", kt: "val lst = mutableListOf<Int>()", note: "typ elementu trzeba podać" },
        { from: "c", src: "int a[] = {1, 2, 3};", kt: "val a = intArrayOf(1, 2, 3)", note: "" },
        { from: "c", src: "int a[n];  /* zera */", kt: "val a = IntArray(n)", note: "" },
        { from: "c", src: "sizeof(a) / sizeof(a[0])", kt: "a.size", note: "" },
        { from: "py", src: "len(lst)", kt: "lst.size", note: "" },
        { from: "py", src: "lst.append(x)", kt: "lst.add(x)", note: "" },
        { from: "py", src: "lst.insert(i, x)", kt: "lst.add(i, x)", note: "" },
        { from: "py", src: "del lst[i]", kt: "lst.removeAt(i)", note: "" },
        { from: "py", src: "lst.remove(x)", kt: "lst.remove(x)", note: "" },
        { from: "py", src: "lst[-1]", kt: "lst.last()", note: "" },
        { from: "py", src: "lst[1:3]", kt: "lst.subList(1, 3)", note: "" },
        { from: "py", src: "for i, x in enumerate(lst):", kt: "for ((i, x) in lst.withIndex())", note: "" },
        { from: "py", src: "range(len(lst))", kt: "lst.indices", note: "" },
        { from: "py", src: "sum(lst) / max(lst)", kt: "lst.sum() / lst.max()", note: "" },
        { from: "py", src: "[i * i for i in range(5)]", kt: "List(5) { it * it }", note: "" },
        { from: "c", src: "printf w pętli po tablicy", kt: "println(a.joinToString())", note: "" }
    ],
    keywords: "lista list tablica array listOf mutableListOf append add size len indeks enumerate withIndex wycinek slice sum max"
});
