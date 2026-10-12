LESSONS.push({
    id: "in-keyword",
    title: "Słowo kluczowe in",
    atom: ["The in Keyword"],
    intro: "Poza pętlą `for` słowo `in` sprawdza przynależność: czy liczba leży w zakresie, czy znak lub fragment występuje w napisie, czy element jest w kolekcji. Działa jak `in` w Pythonie.",
    c: `#include <stdio.h>
#include <string.h>

int isDigit(char c) { return c >= '0' && c <= '9'; }

int main(void) {
    int x = 42;
    printf("%d\\n", x >= 1 && x <= 100);
    printf("%d\\n", !(x >= 1 && x <= 10));
    printf("%d\\n", isDigit('7'));
    printf("%d\\n", strchr("Kotlin", 'k') != NULL);
    printf("%d\\n", strstr("Kotlin", "lin") != NULL);
    int primes[] = {2, 3, 5, 7};
    int found = 0;
    for (int i = 0; i < 4; i++) if (primes[i] == 5) found = 1;
    printf("%d\\n", found);
    return 0;
}`,
    py: `def is_digit(c):
    return "0" <= c <= "9"

x = 42
print(1 <= x <= 100)
print(x not in range(1, 11))
print(is_digit("7"))
print("k" in "Kotlin")
print("lin" in "Kotlin")
primes = [2, 3, 5, 7]
print(5 in primes)
print(1.0 <= 1.5 <= 2.0)`,
    kt: `// TheInKeyword/In.kt

fun isDigit(c: Char) = c in '0'..'9'

fun main() {
    val x = 42
    println(x in 1..100)
    println(x !in 1..10)
    println(isDigit('7'))
    println('k' in "Kotlin")
    println("lin" in "Kotlin")
    val primes = listOf(2, 3, 5, 7)
    println(5 in primes)
    println(1.5 in 1.0..2.0)
}
/* Output:
true
true
true
false
true
true
true
*/`,
    changes: [
        "`x in a..b` sprawdza, czy `a <= x <= b`. Działa dla liczb, znaków (`'a'..'z'`) i liczb zmiennoprzecinkowych.",
        "`!in` to zaprzeczenie, odpowiednik `not in`.",
        "Na napisie `in` sprawdza znak (`'k' in s`) albo fragment (`\"lin\" in s`).",
        "Na kolekcji `in` sprawdza, czy element w niej jest."
    ],
    traps: [
        { from: "py", text: "`x in 1..10` obejmuje 10, a `x in range(1, 10)` nie. Odpowiednik to `x in 1 until 10`." },
        { from: "py", text: "`not in` pisze się `!in`, bez spacji." },
        { from: "c", text: "Zakres `1.0..2.0` służy tylko do sprawdzania przynależności — po zakresie liczb zmiennoprzecinkowych nie da się iterować pętlą `for`." }
    ],
    exercise: {
        task: "Sprawdź jednym wyrażeniem z `in`, czy znak `c` jest samogłoską (a, e, i, o, u, y).",
        expected: "true",
        starter: `fun main() {
    val c = 'e'
    println(false)   // popraw
}`,
        solution: `fun main() {
    val c = 'e'
    println(c in "aeiouy")
}`
    },
    cheats: [
        { from: "py", src: "x in lst", kt: "x in lst", note: "" },
        { from: "py", src: "x not in lst", kt: "x !in lst", note: "" },
        { from: "py", src: "1 <= x <= 10", kt: "x in 1..10", note: "" },
        { from: "c", src: "x >= 1 && x <= 10", kt: "x in 1..10", note: "" },
        { from: "c", src: "c >= 'a' && c <= 'z'", kt: "c in 'a'..'z'", note: "albo c.isLowerCase()" },
        { from: "c", src: "strchr(s, c) != NULL", kt: "c in s", note: "" },
        { from: "c", src: "strstr(s, t) != NULL", kt: "t in s", note: "" },
        { from: "py", src: "sub in s", kt: "sub in s", note: "" },
        { from: "c", src: "isdigit(c)", kt: "c.isDigit()", note: "albo c in '0'..'9'" },
        { from: "py", src: "c.isalpha()", kt: "c.isLetter()", note: "" }
    ],
    keywords: "in not in przynależność zawiera contains zakres range strchr strstr znak cyfra"
});
