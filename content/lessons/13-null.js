LESSONS.push({
    id: "null-safety",
    title: "Null safety",
    atom: ["Nullable Types", "Safe Calls & the Elvis Operator", "Non-Null Assertions"],
    intro: "Tego mechanizmu nie ma ani w C, ani w Pythonie. Zwykła zmienna typu `Int` czy `String` nie może zawierać `null`. Gdy wartość może być pusta, typ ma znak zapytania (`Int?`), a kompilator nie pozwoli jej użyć bez sprawdzenia.",
    c: `#include <stdio.h>
#include <string.h>

/* brak wyniku sygnalizujemy wartością -1 */
int findIndex(const char *words[], int n, const char *target) {
    for (int i = 0; i < n; i++)
        if (strcmp(words[i], target) == 0) return i;
    return -1;
}

int main(void) {
    const char *words[] = {"kot", "pies", "mysz"};
    int a = findIndex(words, 3, "pies");
    int b = findIndex(words, 3, "lis");
    printf("%d %d\\n", a, b);
    printf("%d\\n", b + 1);   /* kompiluje się: 0 — cichy błąd */
    const char *s = NULL;
    /* strlen(s) — awaria programu */
    printf("%zu\\n", s ? strlen(s) : 0);
    return 0;
}`,
    py: `def find_index(words, target):
    for i, w in enumerate(words):
        if w == target:
            return i
    return None

words = ["kot", "pies", "mysz"]
a = find_index(words, "pies")
b = find_index(words, "lis")
print(a, b)
# print(b + 1)  -> TypeError dopiero w czasie działania
print(b + 1 if b is not None else None)
print(b if b is not None else -1)
s = None
print(len(s) if s is not None else 0)
try:
    print(int("abc"))
except ValueError:
    print(None)`,
    kt: `// NullableTypes/Nullable.kt

fun findIndex(words: List<String>, target: String): Int? {
    for (i in words.indices) {
        if (words[i] == target) return i
    }
    return null
}

fun main() {
    val words = listOf("kot", "pies", "mysz")
    val a: Int? = findIndex(words, "pies")
    val b: Int? = findIndex(words, "lis")
    println("$a $b")
    // println(b + 1)            // błąd kompilacji: b może być null
    if (b != null) println(b + 1)   // tu b jest już typu Int
    println(b?.plus(1))         // bezpieczne wywołanie: null zamiast błędu
    println(b ?: -1)            // Elvis: wartość zastępcza
    val s: String? = null
    println(s?.length ?: 0)
    println("42".toIntOrNull())
    println("abc".toIntOrNull())
}
/* Output:
1 null
null
-1
0
42
null
*/`,
    changes: [
        "`String` nigdy nie jest `null`, `String?` może być. Przypisanie `null` do `String` to błąd kompilacji.",
        "Po sprawdzeniu `if (x != null)` kompilator traktuje `x` w tym bloku jak typ bez `?` (smart cast).",
        "`x?.metoda()` wywołuje metodę tylko wtedy, gdy `x` nie jest `null`; w przeciwnym razie całe wyrażenie daje `null`.",
        "`x ?: domyślna` (operator Elvis) zwraca `x`, a gdy `x` jest `null` — wartość domyślną.",
        "Wiele funkcji ma wersję `...OrNull`: `toIntOrNull()`, `firstOrNull()`, `getOrNull(i)`. Zwracają `null` zamiast rzucać wyjątek."
    ],
    traps: [
        { from: "c", text: "`?:` to nie operator trójargumentowy, tylko Elvis: `b ?: -1` znaczy „`b`, a jeśli `b` jest null, to `-1`”." },
        { from: "py", text: "`x ?: d` zastępuje tylko `null`. W odróżnieniu od Pythonowego `x or d` nie reaguje na `0`, `\"\"` ani pustą listę." },
        { from: "c", text: "`x!!` wymusza „to na pewno nie null” i rzuca wyjątek, gdy się mylisz. Wyłącza całą ochronę — używaj go wyjątkowo." },
        { from: "py", text: "Starsze materiały używają `readLine()!!`. Dziś pisze się `readln()` (patrz lekcja o wczytywaniu danych)." }
    ],
    exercise: {
        task: "Dla każdego tekstu z listy wypisz liczbę pomnożoną przez 2 albo `błąd`, jeśli tekst nie jest liczbą. Użyj `toIntOrNull()`, `?.` i `?:`.",
        expected: "42\nbłąd\n10",
        starter: `fun main() {
    for (t in listOf("21", "x", "5")) {
        println(t)   // popraw
    }
}`,
        solution: `fun main() {
    for (t in listOf("21", "x", "5")) {
        println(t.toIntOrNull()?.times(2) ?: "błąd")
    }
}`
    },
    cheats: [
        { from: "py", src: "None", kt: "null", note: "" },
        { from: "c", src: "NULL", kt: "null", note: "" },
        { from: "c", src: "int *p  (może być NULL)", kt: "val p: Int?", note: "" },
        { from: "c", src: "return -1;  /* brak wyniku */", kt: "return null  // typ wyniku Int?", note: "" },
        { from: "py", src: "if x is not None:", kt: "if (x != null)", note: "" },
        { from: "py", src: "x if x is not None else d", kt: "x ?: d", note: "operator Elvis" },
        { from: "c", src: "p ? p->len : 0", kt: "s?.length ?: 0", note: "" },
        { from: "py", src: "x.y if x is not None else None", kt: "x?.y", note: "bezpieczne wywołanie" },
        { from: "py", src: "int(s)  w try/except", kt: "s.toIntOrNull()", note: "" },
        { from: "py", src: "lst[0] if lst else None", kt: "lst.firstOrNull()", note: "" },
        { from: "py", src: "assert x is not None", kt: "x!!", note: "unikaj" }
    ],
    keywords: "null none nullable puste optional elvis ?: ?. !! smart cast toIntOrNull bezpieczne wywołanie NPE"
});
