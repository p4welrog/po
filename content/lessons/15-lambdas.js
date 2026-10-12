LESSONS.push({
    id: "lambdas",
    title: "Lambdy i operacje na kolekcjach",
    atom: ["Lambdas", "Operations on Collections"],
    intro: "Lambda to funkcja bez nazwy zapisana w klamrach: `{ x: Int -> x * x }`. Kolekcje mają metody przyjmujące lambdy (`map`, `filter`, `sortedBy`…), które w Kotlinie zastępują wyrażenia listowe z Pythona.",
    c: `#include <stdio.h>
#include <stdlib.h>

int square(int x) { return x * x; }

int cmp(const void *a, const void *b) {
    return *(const int *) a - *(const int *) b;
}

int main(void) {
    int (*f)(int) = square;          /* wskaźnik do funkcji */
    printf("%d\\n", f(4));
    int nums[] = {3, 8, 1, 6, 5};
    int n = 5;
    for (int i = 0; i < n; i++) printf("%d ", square(nums[i]));
    printf("\\n");
    for (int i = 0; i < n; i++) if (nums[i] % 2 == 0) printf("%d ", nums[i]);
    printf("\\n");
    qsort(nums, n, sizeof(int), cmp);
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
    py: `nums = [3, 8, 1, 6, 5]
square = lambda x: x * x
print(square(4))
print([x * x for x in nums])
print([x for x in nums if x % 2 == 0])
print(sorted(nums))
print(sorted(nums, reverse=True))
print(any(x > 7 for x in nums))
print(sum(1 for x in nums if x > 3))
print(sum(x * 2 for x in nums))
words = ["kot", "hipopotam", "pies"]
print(max(words, key=len))
print(sorted(words, key=len))
print(" | ".join(w.upper() for w in words))`,
    kt: `// Lambdas/Lambdas.kt

fun main() {
    val nums = listOf(3, 8, 1, 6, 5)
    val square = { x: Int -> x * x }
    println(square(4))
    println(nums.map { it * it })
    println(nums.filter { it % 2 == 0 })
    println(nums.sorted())
    println(nums.sortedDescending())
    println(nums.any { it > 7 })
    println(nums.count { it > 3 })
    println(nums.sumOf { it * 2 })
    val words = listOf("kot", "hipopotam", "pies")
    println(words.maxBy { it.length })
    println(words.sortedBy { it.length })
    println(words.joinToString(" | ") { it.uppercase() })
}
/* Output:
16
[9, 64, 1, 36, 25]
[8, 6]
[1, 3, 5, 6, 8]
[8, 6, 5, 3, 1]
true
3
46
hipopotam
[kot, pies, hipopotam]
KOT | HIPOPOTAM | PIES
*/`,
    changes: [
        "Lambda: `{ parametry -> ciało }`. Wynikiem jest ostatnie wyrażenie ciała, bez `return`.",
        "Gdy lambda ma jeden parametr, można go pominąć i używać nazwy `it`: `nums.map { it * it }`.",
        "Jeśli lambda jest ostatnim argumentem, pisze się ją za nawiasami, a puste nawiasy pomija: `nums.filter { it > 0 }`.",
        "`map`, `filter`, `sorted`, `sortedBy` zwracają nową listę i nie zmieniają oryginału. Operacje można łączyć w łańcuch.",
        "Przydatne: `any`, `all`, `none`, `count`, `sumOf`, `maxBy`, `minBy`, `first { }`, `groupBy`, `joinToString`."
    ],
    traps: [
        { from: "py", text: "Lambda to klamry, nie słowo `lambda`: `lambda x: x * x` to `{ x: Int -> x * x }`." },
        { from: "py", text: "Nie ma wyrażeń listowych. `[x * x for x in nums if x > 2]` to `nums.filter { it > 2 }.map { it * it }`." },
        { from: "py", text: "`nums.sorted()` zwraca nową listę jak `sorted(nums)`. Sortowanie w miejscu (`nums.sort()`) działa tylko na `MutableList`." },
        { from: "c", text: "Samo `return` wewnątrz lambdy przekazanej do `map` czy `forEach` kończy całą otaczającą funkcję. Aby wyjść tylko z lambdy, pisz `return@forEach`." }
    ],
    exercise: {
        task: "Z listy nazw języków wybierz te dłuższe niż 2 znaki, zamień je na wielkie litery i połącz przecinkami — jednym łańcuchem wywołań.",
        expected: "KOTLIN, PYTHON, RUST",
        starter: `fun main() {
    val langs = listOf("Kotlin", "C", "Python", "Go", "Rust")
    println(langs)   // popraw
}`,
        solution: `fun main() {
    val langs = listOf("Kotlin", "C", "Python", "Go", "Rust")
    println(langs.filter { it.length > 2 }.map { it.uppercase() }.joinToString(", "))
}`
    },
    cheats: [
        { from: "py", src: "lambda x: x * x", kt: "{ x: Int -> x * x }", note: "" },
        { from: "c", src: "int (*f)(int) = square;", kt: "val f = ::square", note: "referencja do funkcji" },
        { from: "py", src: "[f(x) for x in lst]", kt: "lst.map { f(it) }", note: "" },
        { from: "py", src: "[x for x in lst if c(x)]", kt: "lst.filter { c(it) }", note: "" },
        { from: "py", src: "list(map(int, lst))", kt: "lst.map { it.toInt() }", note: "" },
        { from: "py", src: "sorted(lst)", kt: "lst.sorted()", note: "" },
        { from: "py", src: "sorted(lst, reverse=True)", kt: "lst.sortedDescending()", note: "" },
        { from: "py", src: "sorted(lst, key=len)", kt: "lst.sortedBy { it.length }", note: "" },
        { from: "c", src: "qsort(a, n, sizeof(int), cmp)", kt: "a.sort()", note: "dla tablicy lub MutableList" },
        { from: "py", src: "max(lst, key=len)", kt: "lst.maxBy { it.length }", note: "" },
        { from: "py", src: "any(c for x in lst)", kt: "lst.any { c }", note: "też all, none" },
        { from: "py", src: "sum(f(x) for x in lst)", kt: "lst.sumOf { f(it) }", note: "" },
        { from: "py", src: "\" \".join(f(x) for x in lst)", kt: "lst.joinToString(\" \") { f(it) }", note: "" },
        { from: "py", src: "next(x for x in lst if c)", kt: "lst.first { c }", note: "firstOrNull, gdy może nie być" },
        { from: "py", src: "for x in lst: f(x)", kt: "lst.forEach { f(it) }", note: "zwykła pętla for też jest OK" }
    ],
    keywords: "lambda funkcja anonimowa map filter sorted sortedBy key comprehension wyrażenie listowe any all sum max joinToString forEach it qsort wskaźnik"
});
