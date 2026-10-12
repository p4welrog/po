LESSONS.push({
    id: "if-expression",
    title: "if jako wyrażenie",
    atom: ["if Expressions"],
    intro: "W Kotlinie `if` zwraca wartość. Dzięki temu zastępuje zarówno instrukcję warunkową, jak i operator trójargumentowy z C i wyrażenie warunkowe z Pythona.",
    c: `#include <stdio.h>

int main(void) {
    int temp = 28;
    const char *label = (temp > 25) ? "gorąco" : "ok";
    printf("%s\\n", label);

    const char *grade;
    if (temp < 0) {
        printf("mróz!\\n");
        grade = "zimno";
    } else {
        grade = "ciepło";
    }
    printf("%s\\n", grade);
    return 0;
}`,
    py: `temp = 28
label = "gorąco" if temp > 25 else "ok"
print(label)

if temp < 0:
    print("mróz!")
    grade = "zimno"
else:
    grade = "ciepło"
print(grade)`,
    kt: `// IfExpressions/Label.kt

fun main() {
    val temp = 28
    val label = if (temp > 25) "gorąco" else "ok"
    println(label)

    val grade = if (temp < 0) {
        println("mróz!")
        "zimno"          // ostatnie wyrażenie bloku to wynik
    } else {
        "ciepło"
    }
    println(grade)
}
/* Output:
gorąco
ciepło
*/`,
    changes: [
      "Warunek w nawiasach jak w C, bloki w klamrach. Wcięcia nie mają znaczenia składniowego.",
      "Wynikiem bloku `{ ... }` w `if` jest jego ostatnie wyrażenie. Dzięki temu `grade` może być `val`, a nie zmienną przypisywaną w gałęziach.",
      "Operatory logiczne jak w C: `&&`, `||`, `!` (nie `and`, `or`, `not`)."
    ],
    traps: [
      { from: "c", text: "Nie ma operatora `warunek ? a : b`. W Kotlinie `?:` istnieje, ale to operator Elvis do obsługi `null`, a nie warunek." },
      { from: "py", text: "Gdy używasz `if` jako wyrażenia, gałąź `else` jest obowiązkowa: `val x = if (a > b) a` się nie skompiluje." },
      { from: "c", text: "Warunek musi być typu `Boolean`. `if (n)` dla liczby `n` to błąd; pisz `if (n != 0)`." }
    ],
    exercise: {
      task: "Używając `if` jako wyrażenia, przypisz do `bigger` większą z liczb `a` i `b`.",
      expected: "większa: 12",
      starter: `fun main() {
    val a = 7
    val b = 12
    // użyj if jako wyrażenia
    val bigger = 0
    println("większa: $bigger")
}`,
      solution: `fun main() {
    val a = 7
    val b = 12
    val bigger = if (a > b) a else b
    println("większa: $bigger")
}`
    },
    cheats: [
      { from: "c", src: "x = c ? a : b;", kt: "val x = if (c) a else b", note: "?: w Kotlinie to Elvis, nie warunek" },
      { from: "py", src: "x = a if c else b", kt: "val x = if (c) a else b", note: "" },
      { from: "py", src: "and / or / not", kt: "&& / || / !", note: "" },
      { from: "c", src: "if (n) { ... }", kt: "if (n != 0) { ... }", note: "warunek musi być Boolean" },
      { from: "py", src: "elif", kt: "else if", note: "" }
    ],
    keywords: "warunek if else elif ternary trójargumentowy operator logiczny and or not boolean"
});
