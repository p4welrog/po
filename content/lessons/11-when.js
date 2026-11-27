LESSONS.push({
    id: "when",
    title: "when zamiast switch",
    atom: ["when Expressions"],
    intro: "`when` zastępuje `switch` z C i `match` z Pythona, a bez argumentu — łańcuch `if / else if`. Podobnie jak `if` jest wyrażeniem, więc zwraca wartość.",
    c: `#include <stdio.h>

const char *describe(int n) {
    if (n < 0) return "ujemna";
    else if (n == 0) return "zero";
    else if (n % 2 == 0) return "parzysta";
    else return "nieparzysta";
}

const char *dayName(int d) {
    switch (d) {
        case 1: return "pon";
        case 2: return "wt";
        case 3:
        case 4: return "środek tygodnia";
        case 5: case 6: case 7: return "końcówka";
        default: return "?";
    }
}

int main(void) {
    printf("%s\\n", describe(-3));
    printf("%s\\n", describe(8));
    printf("%s\\n", dayName(4));
    printf("%s\\n", dayName(6));
    return 0;
}`,
    py: `def describe(n):
    if n < 0:
        return "ujemna"
    elif n == 0:
        return "zero"
    elif n % 2 == 0:
        return "parzysta"
    return "nieparzysta"

def day_name(d):
    match d:
        case 1: return "pon"
        case 2: return "wt"
        case 3 | 4: return "środek tygodnia"
        case 5 | 6 | 7: return "końcówka"
        case _: return "?"

print(describe(-3))
print(describe(8))
print(day_name(4))
print(day_name(6))
x = "tekst"
match x:
    case int(): print("liczba")
    case str(): print(f"napis o długości {len(x)}")`,
    kt: `// WhenExpressions/When.kt

fun describe(n: Int): String = when {
    n < 0 -> "ujemna"
    n == 0 -> "zero"
    n % 2 == 0 -> "parzysta"
    else -> "nieparzysta"
}

fun dayName(d: Int) = when (d) {
    1 -> "pon"
    2 -> "wt"
    3, 4 -> "środek tygodnia"
    in 5..7 -> "końcówka"
    else -> "?"
}

fun main() {
    println(describe(-3))
    println(describe(8))
    println(dayName(4))
    println(dayName(6))
    val x: Any = "tekst"
    println(when (x) {
        is Int -> "liczba"
        is String -> "napis o długości \${x.length}"
        else -> "coś innego"
    })
}
/* Output:
ujemna
parzysta
środek tygodnia
końcówka
napis o długości 5
*/`,
    changes: [
        "`when (x) { wartość -> wynik }` porównuje `x` z kolejnymi gałęziami. Wykonuje się tylko pierwsza pasująca gałąź.",
        "Kilka wartości oddziela się przecinkiem (`3, 4 ->`), zakres sprawdza się przez `in 5..7`, a typ przez `is String`.",
        "`when` bez argumentu to czytelny zamiennik długiego `if / else if`: każda gałąź to warunek logiczny.",
        "Gdy `when` zwraca wartość, gałąź `else` jest obowiązkowa (chyba że kompilator widzi, że wszystkie przypadki są obsłużone).",
        "Po `is String` zmienna jest w tej gałęzi traktowana jako `String` (inteligentne rzutowanie, smart cast), więc `x.length` działa bez rzutowania."
    ],
    traps: [
        { from: "c", text: "Nie ma przechodzenia do następnego przypadku (fall-through) i nie piszesz `break`. Wspólne przypadki łączysz przecinkiem." },
        { from: "c", text: "Gałęzie nie muszą być stałymi: mogą to być dowolne wyrażenia, zakresy i sprawdzenia typu." },
        { from: "py", text: "`case 3 | 4` to `3, 4 ->`, a `case _` to `else ->`. Nie ma dopasowania struktur (rozpakowywania) jak w `match`." }
    ],
    exercise: {
        task: "Zamień punkty na ocenę: poniżej 50 → 2, poniżej 70 → 3, poniżej 90 → 4, w pozostałych przypadkach 5. Użyj `when`.",
        expected: "4",
        starter: `fun main() {
    val points = 78
    val grade = 0   // użyj when
    println(grade)
}`,
        solution: `fun main() {
    val points = 78
    val grade = when {
        points < 50 -> 2
        points < 70 -> 3
        points < 90 -> 4
        else -> 5
    }
    println(grade)
}`
    },
    cheats: [
        { from: "c", src: "switch (x) { case 1: ...; break; }", kt: "when (x) { 1 -> ... }", note: "bez break" },
        { from: "c", src: "case 3: case 4:", kt: "3, 4 ->", note: "" },
        { from: "c", src: "default:", kt: "else ->", note: "" },
        { from: "py", src: "match x: case 1: ...", kt: "when (x) { 1 -> ... }", note: "" },
        { from: "py", src: "case 3 | 4:", kt: "3, 4 ->", note: "" },
        { from: "py", src: "case _:", kt: "else ->", note: "" },
        { from: "py", src: "if ... elif ... else", kt: "when { warunek -> ...; else -> ... }", note: "" },
        { from: "py", src: "isinstance(x, str)", kt: "x is String", note: "" },
        { from: "c", src: "if (x >= 5 && x <= 7) w switch", kt: "in 5..7 ->", note: "" }
    ],
    keywords: "when switch case match default break fall-through elif wybór gałąź isinstance is typ"
});
