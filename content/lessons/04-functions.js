LESSONS.push({
    id: "functions",
    title: "Funkcje",
    atom: ["Functions", "Named & Default Arguments"],
    intro: "Funkcję deklaruje się słowem `fun`. Typy parametrów są obowiązkowe jak w C, a argumenty domyślne i nazwane działają prawie jak w Pythonie.",
    c: `#include <stdio.h>

int square(int x) {
    return x * x;
}

int cube(int x) { return x * x * x; }

void greet(const char *name, const char *greeting) {
    printf("%s, %s!\\n", greeting, name);
}

int main(void) {
    printf("%d\\n", square(7));
    printf("%d\\n", cube(3));
    greet("Ada", "Cześć");      /* brak argumentów domyślnych */
    greet("Linus", "Hej");
    return 0;
}`,
    py: `def square(x: int) -> int:
    return x * x

def cube(x):
    return x * x * x

def greet(name, greeting="Cześć"):
    print(f"{greeting}, {name}!")

print(square(7))
print(cube(3))
greet("Ada")
greet("Linus", greeting="Hej")`,
    kt: `// Functions/Functions.kt

fun square(x: Int): Int {
    return x * x
}

fun cube(x: Int) = x * x * x        // ciało-wyrażenie

fun greet(name: String, greeting: String = "Cześć") {
    println("$greeting, $name!")
}

fun main() {
    println(square(7))
    println(cube(3))
    greet("Ada")
    greet("Linus", greeting = "Hej")
}
/* Output:
49
27
Cześć, Ada!
Hej, Linus!
*/`,
    changes: [
        "Składnia: `fun nazwa(parametr: Typ): TypWyniku { ... }`. Typ wyniku stoi po nawiasie, nie przed nazwą.",
        "Funkcję z jednym wyrażeniem można zapisać krótko: `fun cube(x: Int) = x * x * x`. Typ wyniku wnioskuje kompilator.",
        "Funkcja, która nic nie zwraca, ma typ `Unit` (odpowiednik `void`) i typu nie trzeba pisać.",
        "Argumenty domyślne `greeting: String = \"Cześć\"` i nazwane `greet(\"Linus\", greeting = \"Hej\")` jak w Pythonie. Wartość domyślna może korzystać z wcześniejszych parametrów.",
        "Kolejność definicji nie ma znaczenia — nie potrzeba prototypów jak w C."
    ],
    traps: [
        { from: "c", text: "Parametry są tylko do odczytu (`val`): `x = x + 1` wewnątrz funkcji się nie skompiluje. Utwórz zmienną lokalną: `var y = x`." },
        { from: "py", text: "Typy parametrów są obowiązkowe: `fun square(x)` to błąd. Adnotacje typów nie są tu opcjonalną wskazówką jak w Pythonie." },
        { from: "py", text: "Funkcja z ciałem w klamrach i bez `: Typ` zwraca `Unit`, więc `return x` w niej to błąd. Wnioskowanie typu wyniku działa tylko dla wersji z `=`." }
    ],
    exercise: {
        task: "Napisz funkcję `area(width: Double, height: Double)`, w której `height` domyślnie równa się `width` (kwadrat). Odkomentuj wywołania w `main`.",
        expected: "9.0\n6.0",
        starter: `// tutaj napisz funkcję area

fun main() {
    // println(area(3.0))
    // println(area(3.0, 2.0))
}`,
        solution: `fun area(width: Double, height: Double = width) = width * height

fun main() {
    println(area(3.0))
    println(area(3.0, 2.0))
}`
    },
    cheats: [
        { from: "c", src: "int f(int x) { return x * 2; }", kt: "fun f(x: Int): Int { return x * 2 }", note: "" },
        { from: "py", src: "def f(x): return x * 2", kt: "fun f(x: Int) = x * 2", note: "typ parametru obowiązkowy" },
        { from: "c", src: "void f(void) { ... }", kt: "fun f() { ... }", note: "zwraca Unit" },
        { from: "py", src: "def f(x, y=1):", kt: "fun f(x: Int, y: Int = 1)", note: "" },
        { from: "py", src: "f(y=2, x=1)", kt: "f(y = 2, x = 1)", note: "" },
        { from: "py", src: "def f(*args):", kt: "fun f(vararg args: Int)", note: "" },
        { from: "c", src: "int f(int x);  /* prototyp */", kt: "(niepotrzebny)", note: "" },
        { from: "py", src: "def f() -> None:", kt: "fun f()", note: "None jako wynik to Unit" }
    ],
    keywords: "funkcja def fun return void unit parametr argument domyślny nazwany prototyp vararg args wyrażenie"
});
