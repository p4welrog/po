LESSONS.push({
    id: "booleans",
    title: "Logika i porównania",
    atom: ["Booleans"],
    intro: "Typ logiczny to `Boolean` z wartościami `true` i `false`. Operatory logiczne są jak w C, a `==` porównuje zawartość jak w Pythonie.",
    c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

int main(void) {
    int hour = 14;
    bool isOpen = hour >= 9 && hour < 17;
    printf("%d\\n", isOpen);
    printf("%d\\n", !isOpen || hour == 14);
    const char *a = "kot";
    const char *b = "kot";
    printf("%d\\n", strcmp(a, b) == 0);   /* zawartość */
    printf("%d\\n", strcmp("abc", "abd") < 0);
    return 0;
}`,
    py: `hour = 14
is_open = 9 <= hour < 17
print(is_open)
print(not is_open or hour == 14)
a = "kot"
b = "KOT".lower()
print(a == b)      # zawartość
print(a is b)      # tożsamość obiektu
print(a != b)
print("abc" < "abd")`,
    kt: `// Booleans/Booleans.kt

fun main() {
    val hour = 14
    val isOpen = hour >= 9 && hour < 17
    println(isOpen)
    println(!isOpen || hour == 14)
    val a = "kot"
    val b = "KOT".lowercase()
    println(a == b)      // zawartość
    println(a === b)     // tożsamość obiektu
    println(a != b)
    println("abc" < "abd")
}
/* Output:
true
true
true
false
false
true
*/`,
    changes: [
        "Wartości logiczne piszemy małą literą: `true`, `false`.",
        "Operatory jak w C: `&&`, `||`, `!` (z leniwym wartościowaniem).",
        "`==` porównuje wartości (wywołuje `equals`), `===` sprawdza, czy to ten sam obiekt — jak `is` w Pythonie.",
        "Napisy porównujesz bezpośrednio: `a == b`, `a < b`."
    ],
    traps: [
        { from: "py", text: "Nie ma porównań łańcuchowych: `9 <= hour < 17` się nie skompiluje. Pisz `hour >= 9 && hour < 17` albo `hour in 9 until 17`." },
        { from: "c", text: "Liczba nie jest wartością logiczną: `if (x)` i `while (1)` to błędy. Pisz `if (x != 0)` i `while (true)`." },
        { from: "c", text: "`==` na napisach porównuje zawartość, a nie wskaźniki — inaczej niż w C." },
        { from: "py", text: "Pusta lista, `0` czy `\"\"` nie są „fałszywe”: `if (lista)` nie działa, pisz `if (lista.isNotEmpty())`." }
    ],
    exercise: {
        task: "Ustal, czy rok jest przestępny: podzielny przez 4 i niepodzielny przez 100, albo podzielny przez 400.",
        expected: "true",
        starter: `fun main() {
    val year = 2024
    val isLeap = false   // popraw warunek
    println(isLeap)
}`,
        solution: `fun main() {
    val year = 2024
    val isLeap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
    println(isLeap)
}`
    },
    cheats: [
        { from: "py", src: "True / False", kt: "true / false", note: "" },
        { from: "c", src: "bool (stdbool.h)", kt: "Boolean", note: "" },
        { from: "py", src: "and / or / not", kt: "&& / || / !", note: "" },
        { from: "py", src: "a is b", kt: "a === b", note: "tożsamość" },
        { from: "py", src: "a is not b", kt: "a !== b", note: "" },
        { from: "c", src: "strcmp(a, b) == 0", kt: "a == b", note: "" },
        { from: "c", src: "strcmp(a, b) < 0", kt: "a < b", note: "" },
        { from: "py", src: "0 <= x < 10", kt: "x in 0 until 10", note: "albo x >= 0 && x < 10" },
        { from: "c", src: "while (1)", kt: "while (true)", note: "" },
        { from: "py", src: "if lst:", kt: "if (lst.isNotEmpty())", note: "" },
        { from: "py", src: "if s:", kt: "if (s.isNotEmpty())", note: "" }
    ],
    keywords: "boolean bool logiczny true false and or not porównanie równość is tożsamość equals strcmp"
});
