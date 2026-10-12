LESSONS.push({
    id: "strings",
    title: "Napisy i szablony",
    atom: ["String Templates"],
    intro: "`String` w Kotlinie jest niemutowalny jak w Pythonie i ma podobny zestaw metod. Zamiast `printf` czy f-stringów używa się szablonów: `\"$x\"` i `\"${a + b}\"`.",
    c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main(void) {
    const char *name = "Ada";
    int year = 1815;
    printf("%s urodziła się w %d roku\\n", name, year);
    printf("Za 10 lat: %d\\n", year + 10);
    printf("Długość: %zu\\n", strlen(name));
    const char *s = "Kotlin";
    printf("%c\\n", s[0]);
    printf("%.2s\\n", s + 1);
    for (const char *p = s; *p; p++) putchar(toupper((unsigned char) *p));
    putchar('\\n');
    printf("%d\\n", strcmp(s, "Kotlin") == 0);
    return 0;
}`,
    py: `name = "Ada"
year = 1815
print(f"{name} urodziła się w {year} roku")
print(f"Za 10 lat: {year + 10}")
print(f"Długość: {len(name)}")
s = "Kotlin"
print(s[0])
print(s[1:3])
print(s.upper())
print(s == "Kotlin")
print(s + "!" + str(2))
print("a,b,c".split(","))
multi = """Linia 1
Linia 2"""
print(multi)`,
    kt: `// StringTemplates/Strings.kt

fun main() {
    val name = "Ada"
    val year = 1815
    println("$name urodziła się w $year roku")
    println("Za 10 lat: \${year + 10}")
    println("Długość: \${name.length}")
    val s = "Kotlin"
    println(s[0])
    println(s.substring(1, 3))
    println(s.uppercase())
    println(s == "Kotlin")
    println(s + "!" + 2)
    println("a,b,c".split(","))
    val multi = """
        Linia 1
        Linia 2
    """.trimIndent()
    println(multi)
}
/* Output:
Ada urodziła się w 1815 roku
Za 10 lat: 1825
Długość: 3
K
ot
KOTLIN
true
Kotlin!2
[a, b, c]
Linia 1
Linia 2
*/`,
    changes: [
        "`$nazwa` wstawia wartość zmiennej, `${wyrażenie}` wstawia wynik wyrażenia, np. `${x.length}`.",
        "`s[i]` zwraca `Char`, a `s.substring(od, do)` działa jak wycinek `s[od:do]` w Pythonie.",
        "`==` porównuje zawartość napisów — bez `strcmp`. Operatory `<` i `>` porównują leksykograficznie.",
        "`+` łączy napisy i zamienia na tekst prawy operand, jeśli lewy jest `String`: `\"a\" + 2` daje `\"a2\"`.",
        "Potrójny cudzysłów `\"\"\"...\"\"\"` daje napis wielowierszowy. `trimIndent()` usuwa wspólne wcięcie."
    ],
    traps: [
        { from: "py", text: "Nie ma ujemnych indeksów ani wycinków: `s[-1]` rzuca wyjątek. Użyj `s.last()`, `s.takeLast(3)` lub `s.substring(1, 3)`." },
        { from: "c", text: "`s[0]` to `Char`, a `\"K\"` to `String`. `s[0] == \"K\"` się nie skompiluje — pisz `s[0] == 'K'`." },
        { from: "py", text: "`\"ab\" * 3` nie działa. Użyj `\"ab\".repeat(3)`." },
        { from: "py", text: "Lista wypisuje się jako `[a, b, c]`, bez cudzysłowów — łatwo pomylić z Pythonowym `['a', 'b', 'c']`." }
    ],
    exercise: {
        task: "Używając jednego szablonu napisu, wypisz nazwisko, inicjał imienia i długość nazwiska w formacie pokazanym poniżej.",
        expected: "Lovelace, A. (8 liter)",
        starter: `fun main() {
    val first = "Ada"
    val last = "Lovelace"
    println("")
}`,
        solution: `fun main() {
    val first = "Ada"
    val last = "Lovelace"
    println("$last, \${first[0]}. (\${last.length} liter)")
}`
    },
    cheats: [
        { from: "py", src: "f\"{x}\"", kt: "\"$x\"", note: "" },
        { from: "py", src: "f\"{a + b}\"", kt: "\"${a + b}\"", note: "" },
        { from: "c", src: "printf(\"%s: %d\\n\", s, n);", kt: "println(\"$s: $n\")", note: "" },
        { from: "c", src: "printf(\"%.2f\", x);", kt: "println(\"%.2f\".format(x))", note: "formatowanie jak w printf" },
        { from: "py", src: "f\"{x:.2f}\"", kt: "\"%.2f\".format(x)", note: "" },
        { from: "py", src: "len(s)", kt: "s.length", note: "" },
        { from: "c", src: "strlen(s)", kt: "s.length", note: "" },
        { from: "py", src: "s[1:3]", kt: "s.substring(1, 3)", note: "" },
        { from: "py", src: "s[-1]", kt: "s.last()", note: "" },
        { from: "c", src: "strcmp(a, b) == 0", kt: "a == b", note: "" },
        { from: "py", src: "s.upper() / s.lower()", kt: "s.uppercase() / s.lowercase()", note: "" },
        { from: "py", src: "s.strip()", kt: "s.trim()", note: "" },
        { from: "py", src: "s.split(\",\")", kt: "s.split(\",\")", note: "zwraca List<String>" },
        { from: "py", src: "\", \".join(lst)", kt: "lst.joinToString(\", \")", note: "" },
        { from: "py", src: "\"ab\" * 3", kt: "\"ab\".repeat(3)", note: "" },
        { from: "py", src: "s.startswith(\"x\")", kt: "s.startsWith(\"x\")", note: "" },
        { from: "c", src: "strcat / strcpy", kt: "a + b", note: "napisy są niemutowalne" },
        { from: "py", src: "s[::-1]", kt: "s.reversed()", note: "" }
    ],
    keywords: "napis string tekst szablon template f-string printf format strlen substring wycinek slice upper lower split join strcmp znak char"
});
