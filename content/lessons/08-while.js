LESSONS.push({
    id: "while",
    title: "Pętle while",
    atom: ["Repetition with while"],
    intro: "`while` i `do { } while` działają tak samo jak w C. Kotlin ma też operatory `++`, `--` i `+=`, a `break` i `continue` zachowują się zgodnie z oczekiwaniami.",
    c: `#include <stdio.h>

int main(void) {
    int n = 27, steps = 0;
    while (n != 1) {
        n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        steps++;
    }
    printf("kroki: %d\\n", steps);

    int i = 0;
    do {
        printf("%d ", i);
        i += 2;
    } while (i < 10);
    printf("\\n");

    int k = 0;
    while (1) {
        k++;
        if (k % 3 == 0) continue;
        if (k > 7) break;
        printf("%d ", k);
    }
    printf("\\n");
    return 0;
}`,
    py: `n, steps = 27, 0
while n != 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    steps += 1
print(f"kroki: {steps}")

i = 0
while True:              # brak do-while w Pythonie
    print(i, end=" ")
    i += 2
    if not i < 10:
        break
print()

k = 0
while True:
    k += 1
    if k % 3 == 0:
        continue
    if k > 7:
        break
    print(k, end=" ")
print()`,
    kt: `// RepetitionWithWhile/While.kt

fun main() {
    var n = 27
    var steps = 0
    while (n != 1) {
        n = if (n % 2 == 0) n / 2 else 3 * n + 1
        steps++
    }
    println("kroki: $steps")

    var i = 0
    do {
        print("$i ")
        i += 2
    } while (i < 10)
    println()

    var k = 0
    while (true) {
        k++
        if (k % 3 == 0) continue
        if (k > 7) break
        print("$k ")
    }
    println()
}
/* Output:
kroki: 111
0 2 4 6 8
1 2 4 5 7
*/`,
    changes: [
        "`while (warunek) { ... }` i `do { ... } while (warunek)` jak w C. Warunek musi być typu `Boolean`.",
        "Są operatory `++`, `--`, `+=`, `-=`, `*=`, `/=`, `%=` (Python ma tylko złożone przypisania).",
        "`break` i `continue` jak w C. Do wyjścia z zagnieżdżonej pętli służą etykiety: `outer@ while (...)` i `break@outer`.",
        "Zmienna sterująca musi być `var`, bo zmienia wartość."
    ],
    traps: [
        { from: "c", text: "Przypisanie nie jest wyrażeniem: `while ((c = getchar()) != EOF)` się nie skompiluje. Wczytaj wartość przed pętlą i na jej końcu." },
        { from: "py", text: "`while (n)` czy `while (lista)` nie działa — warunek musi być `Boolean`: `while (n != 0)`, `while (lista.isNotEmpty())`." },
        { from: "py", text: "Nie ma `while ... else`. Jeśli potrzebujesz informacji, czy pętla zakończyła się przez `break`, użyj zmiennej logicznej." }
    ],
    exercise: {
        task: "Za pomocą pętli `while` policz sumę cyfr liczby 98765.",
        expected: "35",
        starter: `fun main() {
    var n = 98765
    var sum = 0
    // pętla while
    println(sum)
}`,
        solution: `fun main() {
    var n = 98765
    var sum = 0
    while (n > 0) {
        sum += n % 10
        n /= 10
    }
    println(sum)
}`
    },
    cheats: [
        { from: "c", src: "while (x) { ... }", kt: "while (x != 0) { ... }", note: "" },
        { from: "py", src: "while True:", kt: "while (true)", note: "" },
        { from: "c", src: "do { ... } while (c);", kt: "do { ... } while (c)", note: "" },
        { from: "py", src: "i += 1", kt: "i++  // lub i += 1", note: "" },
        { from: "c", src: "while ((c = getchar()) != EOF)", kt: "while (true) { val line = readlnOrNull() ?: break ... }", note: "przypisanie nie jest wyrażeniem" },
        { from: "c", src: "goto / flaga do wyjścia z dwóch pętli", kt: "outer@ for (...) { ... break@outer }", note: "etykiety" },
        { from: "py", src: "for ... else / while ... else", kt: "(brak — użyj zmiennej Boolean)", note: "" }
    ],
    keywords: "pętla while do break continue etykieta label inkrementacja ++ += powtarzanie"
});
