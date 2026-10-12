LESSONS.push({
    id: "input",
    title: "Wczytywanie danych",
    atom: [],
    runnable: false,
    intro: "Linię tekstu ze standardowego wejścia wczytuje `readln()` — odpowiednik `input()` z Pythona. Zawsze dostajesz `String`, który zamieniasz na liczbę przez `toInt()` lub bezpieczniej `toIntOrNull()`. Uwaga: przeglądarkowy edytor nie obsługuje wejścia, więc ten kod uruchom w IntelliJ IDEA.",
    c: `#include <stdio.h>

int main(void) {
    char name[64];
    int age;
    printf("Podaj imię: ");
    scanf("%63s", name);
    printf("Podaj wiek: ");
    scanf("%d", &age);
    printf("Cześć, %s! Za rok będziesz mieć %d lat.\\n", name, age + 1);

    int a, b, c;
    printf("Podaj trzy liczby: ");
    scanf("%d %d %d", &a, &b, &c);
    printf("Suma: %d\\n", a + b + c);

    int n;
    printf("Podaj liczbę: ");
    if (scanf("%d", &n) == 1) printf("Kwadrat: %d\\n", n * n);
    else printf("To nie liczba\\n");
    return 0;
}`,
    py: `name = input("Podaj imię: ")
age = int(input("Podaj wiek: "))
print(f"Cześć, {name}! Za rok będziesz mieć {age + 1} lat.")

nums = list(map(int, input("Podaj liczby: ").split()))
print(f"Suma: {sum(nums)}")

text = input("Podaj liczbę: ")
try:
    n = int(text)
    print(f"Kwadrat: {n * n}")
except ValueError:
    print("To nie liczba")`,
    kt: `// Input/Input.kt

fun main() {
    print("Podaj imię: ")
    val name = readln()
    print("Podaj wiek: ")
    val age = readln().toInt()
    println("Cześć, $name! Za rok będziesz mieć \${age + 1} lat.")

    print("Podaj liczby: ")
    val nums = readln().split(" ").map { it.toInt() }
    println("Suma: \${nums.sum()}")

    print("Podaj liczbę: ")
    val n = readln().toIntOrNull()
    println(if (n == null) "To nie liczba" else "Kwadrat: \${n * n}")
}`,
    changes: [
        "`readln()` zwraca całą linię jako `String` (bez znaku nowej linii). Na końcu danych rzuca wyjątek; `readlnOrNull()` zwraca wtedy `null`.",
        "`readln()` nie wyświetla zachęty jak `input(\"...\")` — najpierw `print(\"...\")`, potem `readln()`.",
        "Konwersja: `toInt()`, `toDouble()` rzucają `NumberFormatException` dla złych danych; `toIntOrNull()` zwraca `null`.",
        "Kilka liczb w jednej linii: `readln().split(\" \").map { it.toInt() }`."
    ],
    traps: [
        { from: "c", text: "Nie ma odpowiednika `scanf` z formatem. Wczytuje się całą linię i dzieli ją `split`, a potem konwertuje." },
        { from: "py", text: "`split(\" \")` z argumentem dzieli po każdej spacji, więc podwójna spacja daje pusty element i `toInt()` się wysypie. Bezpieczniej: `readln().trim().split(Regex(\"\\\\s+\"))`." },
        { from: "py", text: "W starszych materiałach (i części książek) spotkasz `readLine()!!`. To ta sama operacja; nowy kod pisze się z `readln()`." }
    ],
    exercise: null,
    cheats: [
        { from: "py", src: "input()", kt: "readln()", note: "" },
        { from: "py", src: "input(\"Imię: \")", kt: "print(\"Imię: \"); val s = readln()", note: "" },
        { from: "py", src: "int(input())", kt: "readln().toInt()", note: "" },
        { from: "c", src: "scanf(\"%d\", &x);", kt: "val x = readln().toInt()", note: "" },
        { from: "c", src: "scanf(\"%lf\", &d);", kt: "val d = readln().toDouble()", note: "" },
        { from: "py", src: "list(map(int, input().split()))", kt: "readln().split(\" \").map { it.toInt() }", note: "" },
        { from: "c", src: "scanf(\"%d %d\", &a, &b);", kt: "val (a, b) = readln().split(\" \").map { it.toInt() }", note: "rozpakowanie" },
        { from: "c", src: "if (scanf(...) == 1)", kt: "readln().toIntOrNull() ?: ...", note: "" },
        { from: "c", src: "while (fgets(...) != NULL)", kt: "while (true) { val line = readlnOrNull() ?: break }", note: "do końca danych" },
        { from: "py", src: "for line in sys.stdin:", kt: "generateSequence(::readlnOrNull).forEach { ... }", note: "" }
    ],
    keywords: "wejście input readln readLine scanf wczytywanie stdin klawiatura konsola toInt split"
});
