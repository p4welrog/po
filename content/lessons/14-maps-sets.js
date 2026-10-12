LESSONS.push({
    id: "maps-sets",
    title: "Mapy i zbiory",
    atom: ["Maps", "Sets"],
    intro: "Mapa to odpowiednik słownika (`dict`) z Pythona, a zbiór — `set`. W C nie ma ich w bibliotece standardowej. Jak przy listach, są wersje tylko do odczytu (`mapOf`, `setOf`) i modyfikowalne (`mutableMapOf`, `mutableSetOf`).",
    c: `#include <stdio.h>

/* C nie ma map — dla znaków wystarczy tablica liczników */
int main(void) {
    const char *word = "banana";
    int counts[256] = {0};
    for (const char *p = word; *p; p++) counts[(unsigned char) *p]++;
    for (int c = 0; c < 256; c++)
        if (counts[c] > 0) printf("%c=%d ", c, counts[c]);
    printf("\\n");
    return 0;
}`,
    py: `ages = {"Ada": 36, "Alan": 41}
ages["Grace"] = 85
print(ages["Ada"])
print(ages.get("Linus"))
print(ages.get("Linus", 0))
print("Alan" in ages)
for name, age in ages.items():
    print(f"{name}: {age}")
counts = {}
for c in "banana":
    counts[c] = counts.get(c, 0) + 1
print(counts)
print(set("mississippi"))
print({1, 2, 3} & {2, 3, 4})`,
    kt: `// Maps/Maps.kt

fun main() {
    val ages = mutableMapOf("Ada" to 36, "Alan" to 41)
    ages["Grace"] = 85
    println(ages["Ada"])
    println(ages["Linus"])                 // brak klucza: null
    println(ages.getOrDefault("Linus", 0))
    println("Alan" in ages)
    for ((name, age) in ages) println("$name: $age")

    val counts = mutableMapOf<Char, Int>()
    for (c in "banana") counts[c] = (counts[c] ?: 0) + 1
    println(counts)

    println("mississippi".toSet())
    println(setOf(1, 2, 3) intersect setOf(2, 3, 4))
}
/* Output:
36
null
0
true
Ada: 36
Alan: 41
Grace: 85
{b=1, a=3, n=2}
[m, i, s, p]
[2, 3]
*/`,
    changes: [
        "Mapę tworzy się z par `klucz to wartość`: `mapOf(\"a\" to 1, \"b\" to 2)`.",
        "`m[k]` zwraca wartość albo `null`, gdy klucza nie ma — dlatego jej typ to `Int?` i często łączy się ją z `?:`.",
        "Pętla `for ((k, v) in m)` rozpakowuje pary jak `items()` w Pythonie.",
        "Zbiory: `setOf`, `mutableSetOf`, `toSet()`. Operacje: `union`, `intersect`, `subtract` oraz `in`.",
        "Domyślne mapy i zbiory zachowują kolejność wstawiania."
    ],
    traps: [
        { from: "py", text: "Brak klucza nie rzuca `KeyError` — `m[k]` zwraca `null`. Wynik ma typ z `?`, więc `m[k] + 1` się nie skompiluje: pisz `(m[k] ?: 0) + 1`." },
        { from: "py", text: "Nie ma literałów `{}` dla map i zbiorów. Pusta mapa wymaga typów: `mutableMapOf<String, Int>()`." },
        { from: "py", text: "Mapa wypisuje się jako `{a=1, b=2}`, a nie `{'a': 1, 'b': 2}`." }
    ],
    exercise: {
        task: "Policz, ile razy każde słowo występuje w tekście, i wypisz mapę.",
        expected: "{kot=3, pies=2, mysz=1}",
        starter: `fun main() {
    val text = "kot pies kot mysz kot pies"
    // policz wystąpienia słów
}`,
        solution: `fun main() {
    val text = "kot pies kot mysz kot pies"
    val counts = mutableMapOf<String, Int>()
    for (w in text.split(" ")) {
        counts[w] = (counts[w] ?: 0) + 1
    }
    println(counts)
}`
    },
    cheats: [
        { from: "py", src: "d = {\"a\": 1, \"b\": 2}", kt: "val m = mutableMapOf(\"a\" to 1, \"b\" to 2)", note: "mapOf, jeśli bez zmian" },
        { from: "py", src: "d = {}", kt: "val m = mutableMapOf<String, Int>()", note: "" },
        { from: "py", src: "d[k] = v", kt: "m[k] = v", note: "" },
        { from: "py", src: "d[k]", kt: "m[k]  // Int?", note: "null zamiast KeyError" },
        { from: "py", src: "d.get(k, 0)", kt: "m.getOrDefault(k, 0)", note: "albo m[k] ?: 0" },
        { from: "py", src: "k in d", kt: "k in m", note: "" },
        { from: "py", src: "for k, v in d.items():", kt: "for ((k, v) in m)", note: "" },
        { from: "py", src: "d.keys() / d.values()", kt: "m.keys / m.values", note: "" },
        { from: "py", src: "del d[k]", kt: "m.remove(k)", note: "" },
        { from: "py", src: "len(d)", kt: "m.size", note: "" },
        { from: "py", src: "s = {1, 2}", kt: "val s = mutableSetOf(1, 2)", note: "" },
        { from: "py", src: "set(lst)", kt: "lst.toSet()", note: "" },
        { from: "py", src: "a & b / a | b / a - b", kt: "a intersect b / a union b / a subtract b", note: "" },
        { from: "py", src: "Counter(lst)", kt: "lst.groupingBy { it }.eachCount()", note: "" }
    ],
    keywords: "mapa map słownik dict klucz wartość zbiór set to getOrDefault get items keys values counter liczenie"
});
