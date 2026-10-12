LESSONS.push({
    id: "types",
    title: "Typy danych i liczby",
    atom: ["Data Types", "Number Types"],
    intro: "Kotlin ma typy statyczne jak C, ale nazwy typów piszemy wielką literą: `Int`, `Long`, `Double`, `Char`, `String`, `Boolean`. Liczby całkowite mają stały rozmiar i mogą się przepełnić — inaczej niż `int` w Pythonie.",
    c: `#include <stdio.h>
#include <limits.h>

int main(void) {
    int i = INT_MAX;
    long long big = 3000000000LL;
    double d = 7.0 / 2;
    char c = 'K';
    const char *s = "Kotlin";
    printf("%d\\n", i);
    printf("%lld\\n", big);
    printf("%d\\n", 7 / 2);
    printf("%d\\n", -7 / 2);
    printf("%d\\n", -7 % 2);
    printf("%.1f\\n", d);
    printf("%d\\n", c);
    printf("%s\\n", s);
    return 0;
}`,
    py: `i = 2_147_483_647
big = 3_000_000_000
d = 7.0 / 2
c = "K"
s = "Kotlin"
print(i + 1)      # Python: bez przepełnienia
print(big)
print(7 // 2)
print(-7 // 2)    # zaokrągla w dół: -4
print(-7 % 2)     # 1
print(d)
print(ord(c))
print(len(s))`,
    kt: `// NumberTypes/Numbers.kt

fun main() {
    val i: Int = 2_147_483_647      // Int.MAX_VALUE
    val big: Long = 3_000_000_000L
    val d = 7.0 / 2                 // Double
    val c: Char = 'K'
    val s: String = "Kotlin"
    println(i + 1)                  // przepełnienie!
    println(big)
    println(7 / 2)
    println(-7 / 2)                 // obcina w stronę zera, jak C
    println(-7 % 2)
    println(d)
    println(c.code)
    println(s.length)
    println(i.toLong() + 1)
}
/* Output:
-2147483648
3000000000
3
-3
-1
3.5
75
6
2147483648
*/`,
    changes: [
        "Podstawowe typy: `Int` (32 bity), `Long` (64 bity, przyrostek `L`), `Double`, `Float` (przyrostek `f`), `Char`, `String`, `Boolean`.",
        "Podkreślenia w literałach (`1_000_000`) działają jak w Pythonie.",
        "Konwersje są zawsze jawne: `toInt()`, `toLong()`, `toDouble()`, `toString()`. Nie ma rzutowania `(double) x`.",
        "`Char` nie jest liczbą: kod znaku daje `c.code`, a znak z kodu `n.toChar()`. Działa natomiast `'A' + 1`, co daje `'B'`."
    ],
    traps: [
        { from: "py", text: "`Int` się przepełnia bez ostrzeżenia: `Int.MAX_VALUE + 1` daje `-2147483648`. Dla dużych wartości używaj `Long`." },
        { from: "py", text: "Dzielenie i reszta dla liczb ujemnych działają jak w C: `-7 / 2` to `-3`, a `-7 % 2` to `-1` (w Pythonie `-4` i `1`). Odpowiednikiem `//` jest `floorDiv`, a `%` z Pythona to `mod`." },
        { from: "c", text: "Brak niejawnego rozszerzania typów: `val l: Long = i` (gdzie `i` to `Int`) się nie skompiluje. Napisz `i.toLong()`." },
        { from: "c", text: "`val x: Int = 'A'` to błąd. Znak nie jest liczbą — użyj `'A'.code`." }
    ],
    exercise: {
        task: "Program liczy sekundy w 100 latach (po 365 dni), ale wypisuje liczbę ujemną. Popraw go tak, żeby wynik był prawidłowy.",
        expected: "3153600000",
        starter: `fun main() {
    val years = 100
    val seconds = years * 365 * 24 * 60 * 60
    println(seconds)
}`,
        solution: `fun main() {
    val years = 100
    val seconds = years.toLong() * 365 * 24 * 60 * 60
    println(seconds)
}`
    },
    cheats: [
        { from: "c", src: "int x = 5;", kt: "val x: Int = 5", note: "albo val x = 5" },
        { from: "c", src: "long long n = 3000000000LL;", kt: "val n = 3_000_000_000L", note: "" },
        { from: "c", src: "double d = 1.5;", kt: "val d = 1.5", note: "Double" },
        { from: "c", src: "float f = 1.5f;", kt: "val f = 1.5f", note: "Float" },
        { from: "c", src: "INT_MAX", kt: "Int.MAX_VALUE", note: "" },
        { from: "c", src: "(int) d", kt: "d.toInt()", note: "obcina część ułamkową" },
        { from: "py", src: "int(x)", kt: "x.toInt()", note: "dla String: toInt() lub toIntOrNull()" },
        { from: "py", src: "float(x)", kt: "x.toDouble()", note: "" },
        { from: "py", src: "str(x)", kt: "x.toString()", note: "" },
        { from: "py", src: "a // b", kt: "a / b", note: "dla Int; dla ujemnych a.floorDiv(b)" },
        { from: "py", src: "a % b  (ujemne a)", kt: "a.mod(b)", note: "% w Kotlinie działa jak w C" },
        { from: "py", src: "ord(c)", kt: "c.code", note: "" },
        { from: "py", src: "chr(n)", kt: "n.toChar()", note: "" },
        { from: "c", src: "(char)(c + 1)", kt: "c + 1", note: "Char + Int daje Char" },
        { from: "py", src: "type(x)", kt: "x::class.simpleName", note: "rzadko potrzebne" }
    ],
    keywords: "typ int long double float char string boolean liczba przepełnienie overflow konwersja rzutowanie cast dzielenie reszta modulo ord chr"
});
