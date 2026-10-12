LESSONS.push({
    id: "hello",
    title: "Pierwszy program",
    atom: ["Hello, World!"],
    intro: "Program w Kotlinie zaczyna się od funkcji `main`, tak jak w C. Nie potrzebujesz jednak `#include`, typu zwracanego ani `return 0`, a `println` jest dostępne od razu.",
    c: `#include <stdio.h>

int main(void) {
    printf("Witaj, Kotlinie!\\n");
    printf("Bez nowej linii... ");
    printf("i dalej.\\n");
    return 0;
}`,
    py: `def main():
    print("Witaj, Kotlinie!")
    print("Bez nowej linii... ", end="")
    print("i dalej.")

if __name__ == "__main__":
    main()`,
    kt: `// HelloWorld/HelloWorld.kt

fun main() {
    println("Witaj, Kotlinie!")
    print("Bez nowej linii... ")
    println("i dalej.")
}
/* Output:
Witaj, Kotlinie!
Bez nowej linii... i dalej.
*/`,
    changes: [
        "Punkt wejścia to `fun main()`. Nie ma `int` przed nazwą ani `return 0` na końcu.",
        "`println` wypisuje i przechodzi do nowej linii, `print` nie dodaje nowej linii (odpowiednik `end=\"\"` z Pythona).",
        "Średniki na końcu wierszy nie są potrzebne. Bloki ograniczają klamry jak w C, a wcięcia nie mają znaczenia składniowego.",
        "Komentarze jak w C: `//` do końca linii i `/* ... */` dla bloku."
    ],
    traps: [
        { from: "c", text: "`return 0` w `main` to błąd kompilacji, bo `main` nic nie zwraca (typ `Unit`). Kod wyjścia ustawia się przez `exitProcess(1)` z `kotlin.system`." },
        { from: "py", text: "Komentarz zaczyna się od `//`, nie od `#`. Znak `#` w kodzie Kotlina to błąd składni." },
        { from: "py", text: "Wcięcia nie tworzą bloków. Ciało funkcji, pętli i warunku musi być w klamrach `{ }`." }
    ],
    exercise: {
        task: "Używając jednego `print` i jednego `println`, wypisz w jednej linii tekst `Kotlin na start`.",
        expected: "Kotlin na start",
        starter: `fun main() {
    // użyj print i println
}`,
        solution: `fun main() {
    print("Kotlin ")
    println("na start")
}`
    },
    cheats: [
        { from: "c", src: "int main(void) { ... return 0; }", kt: "fun main() { ... }", note: "bez typu zwracanego i return" },
        { from: "py", src: "if __name__ == \"__main__\": main()", kt: "fun main() { ... }", note: "main to automatycznie punkt wejścia" },
        { from: "c", src: "printf(\"tekst\\n\");", kt: "println(\"tekst\")", note: "" },
        { from: "py", src: "print(\"tekst\")", kt: "println(\"tekst\")", note: "" },
        { from: "py", src: "print(x, end=\"\")", kt: "print(x)", note: "bez nowej linii" },
        { from: "py", src: "# komentarz", kt: "// komentarz", note: "" },
        { from: "c", src: "#include <stdio.h>", kt: "(niepotrzebne)", note: "println jest dostępne zawsze" },
        { from: "c", src: "exit(1);", kt: "exitProcess(1)", note: "import kotlin.system.exitProcess" }
    ],
    keywords: "hello world main start program print println printf wypisz komentarz średnik include"
});
