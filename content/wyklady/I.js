// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "I",
    title: "Podstawowe koncepcje",
    examples: [
        { n: 1, section: "Czym jest programowanie obiektowe?", slide: "Pierwszy program – porównanie", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
var accountBalance = 1000.0

fun withdraw(amount: Double) {
    accountBalance -= amount
}

fun deposit(amount: Double) {
    accountBalance += amount
}
//sampleEnd
}` },
        { n: 2, section: "Czym jest programowanie obiektowe?", slide: "Pierwszy program – podejście obiektowe", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class BankAccount(private var balance: Double) {

    fun withdraw(amount: Double) {
        balance -= amount
    }

    fun deposit(amount: Double) {
        balance += amount
    }
}

// Tworzenie obiektów
val account1 = BankAccount(1000.0)
val account2 = BankAccount(500.0)
//sampleEnd
}` },
        { n: 3, section: "Java i Kotlin – charakterystyka języków", slide: "Porównanie – Hello World", mode: "run", lesson: null,
          code: `fun main() {
    println("Hello, World!")
}` },
        { n: 4, section: "Java i Kotlin – charakterystyka języków", slide: "Porównanie – klasy i właściwości (c.d.)", mode: "decl", lesson: null,
          code: `class Person(var name: String, var age: Int)

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 5, section: "Java i Kotlin – charakterystyka języków", slide: "Porównanie – klasy i właściwości (c.d.)", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class Person(var name: String, var age: Int) {
    // gettery i settery generowane automatycznie!
}

val person = Person("Jan", 25)
println(person.name)  // getter
person.age = 26       // setter
//sampleEnd
}` },
        { n: 6, section: "Java i Kotlin – charakterystyka języków", slide: "Porównanie – bezpieczeństwo `null`", mode: "frag", lesson: null,
          code: `var name: String = "Jan"
name = null  // Błąd kompilacji!

var nullableName: String? = "Jan"
nullableName = null  // OK

// println(nullableName.length)  // Błąd kompilacji!
println(nullableName?.length)  // Safe call - OK
println(nullableName?.length ?: 0)  // Elvis operator` },
        { n: 7, section: "Java i Kotlin – charakterystyka języków", slide: "Porównanie – klasy danych (c.d.)", mode: "decl", lesson: null,
          code: `data class Point(val x: Int, val y: Int)

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 8, section: "Java i Kotlin – charakterystyka języków", slide: "Porównanie – klasy danych (c.d.)", mode: "wrap", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
data class Point(val x: Int, val y: Int)

fun main() {
//sampleStart
val p1 = Point(1, 2)
val p2 = Point(1, 2)
println(p1 == p2)  // true (porównanie wartości)
println(p1)        // Point(x=1, y=2)
val p3 = p1.copy(x = 5)  // Point(x=5, y=2)
//sampleEnd
}` },
        { n: 9, section: "Podstawowe konstrukcje składniowe", slide: "Zmienne – Kotlin", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
val name: String = "Jan"
// name = "Anna"  // Błąd kompilacji!
//sampleEnd
}` },
        { n: 10, section: "Podstawowe konstrukcje składniowe", slide: "Zmienne – Kotlin", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
var age: Int = 25
age = 26  // OK
//sampleEnd
}` },
        { n: 11, section: "Podstawowe konstrukcje składniowe", slide: "Zmienne – Kotlin", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
val city = "Warszawa"  // typ String wywnioskowany
var count = 0          // typ Int wywnioskowany
//sampleEnd
}` },
        { n: 12, section: "Podstawowe konstrukcje składniowe", slide: "Funkcje – Kotlin", mode: "decl", lesson: null,
          code: `fun add(a: Int, b: Int): Int {
    return a + b
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 13, section: "Podstawowe konstrukcje składniowe", slide: "Funkcje – Kotlin", mode: "decl", lesson: null,
          code: `fun add(a: Int, b: Int): Int = a + b

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 14, section: "Podstawowe konstrukcje składniowe", slide: "Funkcje – Kotlin", mode: "decl", lesson: null,
          code: `fun add(a: Int, b: Int) = a + b

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 15, section: "Podstawowe konstrukcje składniowe", slide: "Funkcje – Kotlin", mode: "decl", lesson: null,
          code: `fun printSum(a: Int, b: Int) {
    println(a + b)  // zwraca Unit
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 16, section: "Podstawowe konstrukcje składniowe", slide: "Argumenty domyślne i nazwane – Kotlin", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
fun greet(name: String, greeting: String = "Hello") {
    println("$greeting, $name!")
}

greet("Jan")              // "Hello, Jan!"
greet("Anna", "Hi")       // "Hi, Anna!"
//sampleEnd
}` },
        { n: 17, section: "Podstawowe konstrukcje składniowe", slide: "Argumenty domyślne i nazwane – Kotlin", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
fun createUser(name: String, age: Int, city: String) {
    // ...
}

createUser(
    name = "Jan",
    age = 25,
    city = "Warszawa"
)
//sampleEnd
}` },
        { n: 18, section: "Podstawowe konstrukcje składniowe", slide: "Instrukcje warunkowe – if", mode: "frag", lesson: null,
          code: `val max = if (a > b) a else b

val result = if (score >= 50) {
    "Zdany"
} else {
    "Niezaliczony"
}` },
        { n: 19, section: "Podstawowe konstrukcje składniowe", slide: "Instrukcja when – Kotlin", mode: "frag", lesson: null,
          code: `when (x) {
    1 -> println("Jeden")
    2, 3 -> println("Dwa lub trzy")
    in 4..10 -> println("Od czterech do dziesięciu")
    is String -> println("To jest String")
    else -> println("Inne")
}` },
        { n: 20, section: "Podstawowe konstrukcje składniowe", slide: "Instrukcja when – Kotlin", mode: "frag", lesson: null,
          code: `val description = when (x) {
    1 -> "Jeden"
    2 -> "Dwa"
    else -> "Inne"
}` },
        { n: 21, section: "Podstawowe konstrukcje składniowe", slide: "Pętle – for", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
// Zakres liczb
for (i in 1..5) {
    println(i)  // 1, 2, 3, 4, 5
}

// Kolekcja
val names = listOf("Jan", "Anna", "Piotr")
for (name in names) {
    println(name)
}

// Z indeksem
for ((index, name) in names.withIndex()) {
    println("$index: $name")
}
//sampleEnd
}` },
        { n: 22, section: "Podstawowe konstrukcje składniowe", slide: "Pętle – while", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
// while
var i = 1
while (i <= 5) {
    println(i)
    i++
}

// do-while
var j = 1
do {
    println(j)
    j++
} while (j <= 5)
//sampleEnd
}` },
        { n: 23, section: "Podstawowe konstrukcje składniowe", slide: "Zakresy (Ranges) – Kotlin", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
// Zakres domknięty [1, 10]
val range1 = 1..10

// Zakres otwarty [1, 10)
val range2 = 1 until 10

// Z krokiem
for (i in 1..10 step 2) {
    println(i)  // 1, 3, 5, 7, 9
}

// Malejący
for (i in 10 downTo 1 step 2) {
    println(i)  // 10, 8, 6, 4, 2
}

// Sprawdzanie przynależności
if (5 in 1..10) {
    println("5 jest w zakresie")
}
//sampleEnd
}` },
        { n: 24, section: "Podstawowe konstrukcje składniowe", slide: "String templates – Kotlin", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
val name = "Jan"
val age = 25

// Proste wyrażenie
println("Nazywam się $name")

// Złożone wyrażenie
println("Za rok będę miał \${age + 1} lat")

// Bez interpolacji (dla porównania)
println("Nazywam się " + name)
//sampleEnd
}` },
        { n: 25, section: "Podstawowe konstrukcje składniowe", slide: "Kolekcje – podstawy", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
// Lista tylko do odczytu
val names = listOf("Jan", "Anna", "Piotr")

// Lista modyfikowalna
val numbers = mutableListOf(1, 2, 3)
numbers.add(4)

// Zbiór (Set)
val uniqueNumbers = setOf(1, 2, 2, 3)  // [1, 2, 3]

// Mapa (Dictionary)
val ages = mapOf("Jan" to 25, "Anna" to 30)
println(ages["Jan"])  // 25
//sampleEnd
}` },
        { n: 26, section: "Podstawowe konstrukcje składniowe", slide: "Pytanie kontrolne: składnia", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
val x = 5
val s = when {
    x < 3 -> "mało"
    x in 3..6 -> "średnio"
    else -> "dużo"
}
println("Wynik: $s")
//sampleEnd
}` }
    ]
});
