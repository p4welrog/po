LESSONS.push({
    id: "var-val",
    title: "Zmienne: val i var",
    atom: ["var & val"],
    intro: "W Kotlinie deklarujesz zmienną słowem `val` (nie można jej ponownie przypisać) albo `var` (można). Typ zwykle wnioskuje kompilator, ale jest ustalony na stałe, tak jak w C.",
    c: `#include <stdio.h>

int main(void) {
    const int maxScore = 100;
    int score = 42;
    score = score + 8;
    double ratio = (double) score / maxScore;
    printf("%d/%d = %.1f\\n", score, maxScore, ratio);
    return 0;
}`,
    py: `MAX_SCORE = 100   # "stała" tylko z konwencji
score = 42
score = score + 8
ratio = score / MAX_SCORE
print(f"{score}/{MAX_SCORE} = {ratio}")`,
    kt: `// VarAndVal/Score.kt

fun main() {
    val maxScore = 100      // val: nie da się przypisać ponownie
    var score = 42          // var: typ Int wywnioskowany
    score = score + 8
    val ratio = score.toDouble() / maxScore
    println("$score/$maxScore = $ratio")
}
/* Output:
50/100 = 0.5
*/`,
    changes: [
      "Brak średników i deklaracji typu przed nazwą. Jeśli chcesz podać typ jawnie, piszesz go po dwukropku: `val maxScore: Int = 100`.",
      "Od Pythona: typ zmiennej jest ustalany raz. Po `var score = 42` przypisanie `score = \"tekst\"` to błąd kompilacji.",
      "Od C: `val` działa jak `const`, ale jest domyślnym wyborem. Zasada z Atomic Kotlin: używaj `val`, a `var` tylko wtedy, gdy naprawdę musisz.",
      "Szablony napisów: `\"$score\"` i `\"${a + b}\"` zastępują `printf` z C i f-stringi z Pythona."
    ],
    traps: [
      { from: "py", text: "`/` na dwóch liczbach `Int` to dzielenie całkowite, jak w C: `50 / 100` daje `0`. Pythonowe `/` to w Kotlinie `x.toDouble() / y`." },
      { from: "c", text: "Nie ma niejawnej konwersji `Int` → `Double` przy przypisaniu: `val d: Double = score` się nie skompiluje. Użyj `score.toDouble()`." }
    ],
    exercise: {
      task: "Masz trzy oceny: 4, 5 i 3. Wypisz ich średnią jako liczbę zmiennoprzecinkową.",
      expected: "4.0",
      starter: `fun main() {
    val a = 4
    val b = 5
    val c = 3
    // policz średnią jako Double
    println()
}`,
      solution: `fun main() {
    val a = 4
    val b = 5
    val c = 3
    val average = (a + b + c) / 3.0
    println(average)
}`
    },
    cheats: [
      { from: "py", src: "x = 5", kt: "val x = 5   // lub var x = 5", note: "val, gdy wartość się nie zmienia" },
      { from: "c", src: "const int N = 10;", kt: "val n = 10", note: "" },
      { from: "c", src: "int x = 5;", kt: "var x: Int = 5   // lub var x = 5", note: "typ po dwukropku" },
      { from: "c", src: "double d = (double) i;", kt: "val d = i.toDouble()", note: "brak rzutowania w stylu C" },
      { from: "py", src: "x / y  # wynik float", kt: "x.toDouble() / y", note: "Int / Int to dzielenie całkowite" },
      { from: "py", src: "f\"{a} + {b} = {a + b}\"", kt: "\"$a + $b = ${a + b}\"", note: "szablony napisów" },
      { from: "c", src: "printf(\"%d\\n\", x);", kt: "println(x)", note: "" }
    ],
    keywords: "zmienna stała const typ int double float rzutowanie konwersja print printf f-string szablon napis string"
});
