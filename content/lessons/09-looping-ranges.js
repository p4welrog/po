LESSONS.push({
    id: "looping-ranges",
    title: "Pętle i zakresy",
    atom: ["Looping & Ranges"],
    intro: "Pętla `for` w Kotlinie przechodzi po zakresie, napisie lub kolekcji, podobnie jak `for` w Pythonie. Nie ma klasycznej pętli `for (init; warunek; krok)` z C.",
    c: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) printf("%d ", i);
    printf("\\n");
    for (int i = 0; i < 5; i++) printf("%d ", i);
    printf("\\n");
    for (int i = 10; i >= 0; i -= 3) printf("%d ", i);
    printf("\\n");
    for (const char *p = "Kot"; *p; p++) printf("%c-", *p);
    printf("\\n");
    return 0;
}`,
    py: `for i in range(1, 6):
    print(i, end=" ")
print()
for i in range(5):
    print(i, end=" ")
print()
for i in range(10, -1, -3):
    print(i, end=" ")
print()
for c in "Kot":
    print(c, end="-")
print()`,
    kt: `// LoopingAndRanges/Ranges.kt

fun main() {
    for (i in 1..5) print("$i ")        // 1..5 zawiera 5
    println()
    for (i in 0 until 5) print("$i ")   // jak range(5)
    println()
    for (i in 10 downTo 0 step 3) print("$i ")
    println()
    for (c in "Kot") print("$c-")
    println()
}
/* Output:
1 2 3 4 5 
0 1 2 3 4 
10 7 4 1 
K-o-t-
*/`,
    changes: [
      "`a..b` to zakres domknięty (zawiera `b`). `a until b` oraz `a..<b` to zakres prawostronnie otwarty, jak `range(a, b)`.",
      "Odliczanie w dół: `downTo`, krok: `step`. Krok jest zawsze dodatni, a kierunek wynika z `..` lub `downTo`.",
      "Zmienna pętli (`i`, `c`) jest `val` i nie deklarujesz jej typu.",
      "`while` i `do { } while` działają jak w C. `repeat(n) { ... }` wykonuje blok `n` razy."
    ],
    traps: [
      { from: "py", text: "`1..10` zawiera 10, a `range(1, 10)` nie. Odpowiednikiem `range(1, 10)` jest `1 until 10` lub `1..<10`." },
      { from: "c", text: "`for (i in 5..1)` nie wykona się ani razu, bo zakres jest pusty. Do odliczania w dół użyj `5 downTo 1`." },
      { from: "py", text: "Krok ujemny nie działa jak w `range(10, 0, -2)`: `step` musi być dodatni. Pisz `10 downTo 1 step 2`." }
    ],
    exercise: {
      task: "Policz sumę wszystkich liczb parzystych od 2 do 100 włącznie.",
      expected: "2550",
      starter: `fun main() {
    var sum = 0
    // pętla po liczbach parzystych 2..100
    println(sum)
}`,
      solution: `fun main() {
    var sum = 0
    for (i in 2..100 step 2) {
        sum += i
    }
    println(sum)
}`
    },
    cheats: [
      { from: "c", src: "for (int i = 0; i < n; i++)", kt: "for (i in 0 until n)   // lub 0..<n", note: "" },
      { from: "c", src: "for (int i = 1; i <= n; i++)", kt: "for (i in 1..n)", note: "" },
      { from: "py", src: "for i in range(n):", kt: "for (i in 0 until n)", note: "albo repeat(n) { }" },
      { from: "py", src: "range(1, 11)", kt: "1..10", note: ".. zawiera koniec" },
      { from: "py", src: "range(10, 0, -2)", kt: "10 downTo 1 step 2", note: "step zawsze dodatni" },
      { from: "c", src: "for (int i = 10; i >= 0; i--)", kt: "for (i in 10 downTo 0)", note: "" },
      { from: "py", src: "for ch in s:", kt: "for (ch in s)", note: "" },
      { from: "py", src: "if 1 <= x < 10:", kt: "if (x in 1..9)", note: "operator in na zakresie" },
      { from: "c", src: "while (x > 0) { ... }", kt: "while (x > 0) { ... }", note: "bez zmian" }
    ],
    keywords: "pętla for while range zakres until downTo step repeat iteracja in"
});
