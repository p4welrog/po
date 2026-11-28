// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "IIIa",
    title: "Użyteczne narzędzia języka Kotlin I",
    examples: [
        { n: 1, section: "Funkcje rozszerzające", slide: "Funkcje rozszerzające – definicja", mode: "frag", lesson: null,
          code: `fun ReceiverType.extensionFunction() {
    // ciało funkcji
}` },
        { n: 2, section: "Funkcje rozszerzające", slide: "Przykład podstawowy", mode: "run", lesson: null,
          code: `fun String.singleQuote() = "'$this'"
fun String.doubleQuote() = "\\"$this\\""

fun main() {
    println("Hi".singleQuote())   // 'Hi'
    println("Hi".doubleQuote())   // "Hi"
}` },
        { n: 3, section: "Funkcje rozszerzające", slide: "Import funkcji rozszerzających", mode: "frag", lesson: null,
          code: `package extensionfunctions

fun String.singleQuote() = "'$this'"
fun String.doubleQuote() = "\\"$this\\""` },
        { n: 4, section: "Funkcje rozszerzające", slide: "Import funkcji rozszerzających", mode: "frag", lesson: null,
          code: `package other
import extensionfunctions.doubleQuote
import extensionfunctions.singleQuote

fun main() {
    "Single".singleQuote()  // 'Single'
    "Double".doubleQuote()  // "Double"
}` },
        { n: 5, section: "Funkcje rozszerzające", slide: "Porównanie z Javą – cd.", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
fun String.singleQuote() = "'$this'"
fun String.doubleQuote() = "\\"$this\\""

// Użycie
val result = "Hi".singleQuote()
//sampleEnd
}` },
        { n: 6, section: "Funkcje rozszerzające", slide: "Funkcje najwyższego poziomu widziane z Javy", mode: "frag", lesson: null,
          code: `@file:JvmName("StringFunctions")   // opcjonalnie: własna nazwa klasy
package strings

fun joinToString(items: List<String>) = items.joinToString(", ")
fun String.singleQuote() = "'$this'"` },
        { n: 7, section: "Funkcje rozszerzające", slide: "Funkcje rozszerzające a metody klasy", mode: "run", lesson: null,
          code: `class My {
    fun foo() = 0
}

fun My.foo() = 1        // Nigdy nie zostanie wywołana!
fun My.foo(i: Int) = i + 2  // OK - inna sygnatura

fun main() {
    My().foo()    // 0 -- wywołuje metodę klasy
    My().foo(1)   // 3  - wywołuje extension function
}` },
        { n: 8, section: "Funkcje rozszerzające", slide: "Pytanie kontrolne: rozszerzenia", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class A { fun f() = "member" }
fun A.f() = "ext"
println(A().f())
//sampleEnd
}` },
        { n: 9, section: "Argumenty nazwane i domyślne", slide: "Argumenty nazwane – podstawy", mode: "run", lesson: "functions",
          code: `fun color(red: Int, green: Int, blue: Int) =
    "($red, $green, $blue)"

fun main() {
    // Argumenty pozycyjne
    color(1, 2, 3)

    // Named arguments
    color(
        red = 76,
        green = 89,
        blue = 0
    )  // "(76, 89, 0)"
}` },
        { n: 10, section: "Argumenty nazwane i domyślne", slide: "Zmiana kolejności argumentów", mode: "run", lesson: "functions",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
fun color(red: Int, green: Int, blue: Int) =
    "($red, $green, $blue)"

//sampleStart
fun main() {
    color(
        blue = 0,
        red = 99,
        green = 52
    )  // "(99, 52, 0)"
}
//sampleEnd` },
        { n: 11, section: "Argumenty nazwane i domyślne", slide: "Argumenty domyślne", mode: "run", lesson: "functions",
          code: `fun color(
    red: Int = 0,
    green: Int = 0,
    blue: Int = 0
) = "($red, $green, $blue)"

fun main() {
    color(139)              // "(139, 0, 0)"
    color(blue = 139)       // "(0, 0, 139)"
    color(255, 165)         // "(255, 165, 0)"
    color(red = 128, blue = 128) // "(128, 0, 128)"
}` },
        { n: 12, section: "Argumenty nazwane i domyślne", slide: "Przecinek końcowy (trailing comma)", mode: "decl", lesson: "functions",
          code: `fun color(
    red: Int = 0,
    green: Int = 0,
    blue: Int = 0,  // <- trailing comma
) = "($red, $green, $blue)"

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 13, section: "Argumenty nazwane i domyślne", slide: "Argumenty nazwane i domyślne w konstruktorach", mode: "run", lesson: "functions",
          code: `class Color(
    val red: Int = 0,
    val green: Int = 0,
    val blue: Int = 0,
) {
    override fun toString() = "($red, $green, $blue)"
}

fun main() {
    Color(red = 77)  // (77, 0, 0)
}` },
        { n: 14, section: "Argumenty nazwane i domyślne", slide: "Porównanie z Javą – cd.", mode: "wrap", lesson: "functions",
          code: `fun main() {
//sampleStart
class Color(
    val red: Int = 0,
    val green: Int = 0,
    val blue: Int = 0
)

// Wszystkie te wywołania działają:
Color()
Color(255)
Color(red = 255)
Color(255, 128)
Color(red = 255, blue = 128)
//sampleEnd
}` },
        { n: 15, section: "Argumenty nazwane i domyślne", slide: "Przykład: joinToString()", mode: "run", lesson: "functions",
          code: `fun main() {
    val list = listOf(1, 2, 3)

    list.toString()  // "[1, 2, 3]"

    list.joinToString()  // "1, 2, 3"

    list.joinToString(
        prefix = "(",
        postfix = ")"
    )  // "(1, 2, 3)"

    list.joinToString(separator = ":")  // "1:2:3"
}` },
        { n: 16, section: "Argumenty nazwane i domyślne", slide: "Uwaga: inicjalizacja obiektów", mode: "run", lesson: "functions",
          code: `class DefaultArg

fun h(d: DefaultArg = DefaultArg()) = println(d)

fun main() {
    h()  // DefaultArg@28d93b30
    h()  // DefaultArg@1b6d3586  <- inny obiekt!
}` },
        { n: 17, section: "Przeciążanie funkcji", slide: "Podstawowy przykład", mode: "run", lesson: null,
          code: `class Overloading {
    fun f() = 0
    fun f(n: Int) = n + 2
}

fun main() {
    val o = Overloading()
    o.f()      // 0
    o.f(11)    // 13
}` },
        { n: 18, section: "Przeciążanie funkcji", slide: "Antywzorzec: imitowanie argumentów domyślnych", mode: "run", lesson: null,
          code: `fun f(n: Int) = n + 373
fun f() = f(0)  // Wywołuje pierwszą funkcję

fun main() {
    f()  // 373
}` },
        { n: 19, section: "Przeciążanie funkcji", slide: "Antywzorzec: imitowanie argumentów domyślnych", mode: "run", lesson: null,
          code: `fun f(n: Int = 0) = n + 373

fun main() {
    f()  // 373
}` },
        { n: 20, section: "Przeciążanie funkcji", slide: "Przeciążanie a argumenty domyślne", mode: "run", lesson: null,
          code: `fun foo(n: Int = 99) {
    println("foo-1: $n")
}
fun foo() {
    println("foo-2")
    foo(14)
}

fun main() {
    foo()  // Która wersja zostanie wywołana?
}` },
        { n: 21, section: "Przeciążanie funkcji", slide: "Przykład: funkcje `add`", mode: "run", lesson: null,
          code: `fun addInt(i: Int, j: Int) = i + j
fun addDouble(i: Double, j: Double) = i + j

// Lepiej:
fun add(i: Int, j: Int) = i + j
fun add(i: Double, j: Double) = i + j

fun main() {
    add(5, 6)           // Int version
    add(56.23, 44.77)   // Double version
}` },
        { n: 22, section: "Przeciążanie funkcji", slide: "Przeciążanie operatorów", mode: "run", lesson: null,
          code: `data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point) =
        Point(x + other.x, y + other.y)
}

fun main() {
    val p1 = Point(10, 20)
    val p2 = Point(30, 40)
    val p3 = p1 + p2  // Point(x=40, y=60)
}` },
        { n: 23, section: "Przeciążanie funkcji", slide: "Operatory: jednoargumentowe i z typem po lewej", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
data class Money(val cents: Long) {
    operator fun plus(other: Money) = Money(cents + other.cents)
    operator fun times(k: Int) = Money(cents * k)
    operator fun unaryMinus() = Money(-cents)          // -m
}

operator fun Int.times(m: Money) = m * this            // 3 * m

val m = Money(250)
println(-m)          // Money(cents=-250)
println(m * 3)       // Money(cents=750)
println(3 * m)       // Money(cents=750) -- funkcja rozszerzająca na Int
//sampleEnd
}` },
        { n: 24, section: "Przeciążanie funkcji", slide: "`+=` bez `plusAssign`", mode: "wrap", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
data class Money(val cents: Long) {
    operator fun plus(other: Money) = Money(cents + other.cents)
    operator fun times(k: Int) = Money(cents * k)
    operator fun unaryMinus() = Money(-cents)          // -m
}
operator fun Int.times(m: Money) = m * this            // 3 * m

fun main() {
//sampleStart
var total = Money(100)
total += Money(50)       // działa, choć Money nie ma plusAssign
//sampleEnd
}` },
        { n: 25, section: "Przeciążanie funkcji", slide: "Porównania: `Comparable`", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
data class Version(val major: Int, val minor: Int) : Comparable<Version> {
    override fun compareTo(other: Version) =
        compareValuesBy(this, other, { it.major }, { it.minor })
}

val v = Version(1, 9)
println(v < Version(2, 0))                                   // true
val vs = listOf(Version(2, 0), Version(1, 9))
println(vs.sorted())       // [Version(major=1, minor=9), Version(major=2, minor=0)]
println(vs.maxOrNull())    // Version(major=2, minor=0)
//sampleEnd
}` },
        { n: 26, section: "Wyrażenia when", slide: "`when` – podstawy", mode: "frag", lesson: "when",
          code: `fun ordinal(i: Int): String = when (i) {
    1 -> "erste"        // pierwszy
    3 -> "dritte"       // trzeci
    7 -> "siebte"       // siódmy
    8 -> "achte"        // ósmy
    20 -> "zwanzigste"  // dwudziesty
    else -> numbers.getValue(i) + "te"
}

fun main() {
    ordinal(2)   // "zweite"
    ordinal(11)  // "elfte"
}` },
        { n: 27, section: "Wyrażenia when", slide: "when jako wyrażenie", mode: "frag", lesson: "when",
          code: `val result = when (x) {
    1 -> "one"
    2 -> "two"
    else -> "many"
}` },
        { n: 28, section: "Wyrażenia when", slide: "when jako instrukcja", mode: "decl", lesson: "when",
          code: `fun react(command: String) {
    when (command) {
        "start" -> println("Start!")
        "stop" -> println("Stop!")
        // else nie jest wymagane
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 29, section: "Wyrażenia when", slide: "Wiele wartości w jednej gałęzi", mode: "frag", lesson: "when",
          code: `fun processInput(input: String) {
    when (input) {
        "up", "u" -> coordinates.y--
        "down", "d" -> coordinates.y++
        "left", "l" -> coordinates.x--
        "right", "r" -> {
            println("Moving right")
            coordinates.x++
        }
        "quit", "q" -> return
        else -> println("Bad input: $input")
    }
}` },
        { n: 30, section: "Wyrażenia when", slide: "when z blokami kodu", mode: "frag", lesson: "when",
          code: `when (input) {
    "complex" -> {
        println("Processing complex input")
        val result = complexCalculation()
        storeResult(result)
    }
    "simple" -> simpleAction()
}` },
        { n: 31, section: "Wyrażenia when", slide: "when bez argumentu", mode: "decl", lesson: "when",
          code: `fun temperature(t: Int) = when {
    t < 0 -> "freezing"
    t < 10 -> "cold"
    t < 20 -> "cool"
    t < 30 -> "warm"
    else -> "hot"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 32, section: "Wyrażenia when", slide: "`when` z `is` (sprawdzanie typu)", mode: "decl", lesson: "when",
          code: `fun describe(obj: Any): String = when (obj) {
    1 -> "One"
    "Hello" -> "Greeting"
    is Long -> "Long number"
    !is String -> "Not a string"
    else -> "Unknown"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 33, section: "Wyrażenia when", slide: "when z zakresami", mode: "run", lesson: "when",
          code: `fun grade(score: Int) = when (score) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    in 70..79 -> "C"
    in 60..69 -> "D"
    else -> "F"
}

fun main() {
    grade(95)  // "A"
    grade(72)  // "C"
}` },
        { n: 34, section: "Wyrażenia when", slide: "`when` z kolekcjami", mode: "wrap", lesson: "when",
          code: `fun main() {
//sampleStart
val validNumbers = setOf(1, 3, 5, 7, 9)

fun checkNumber(n: Int) = when (n) {
    in validNumbers -> "Valid"
    !in validNumbers -> "Invalid"
    else -> "Unknown"
}
//sampleEnd
}` },
        { n: 35, section: "Wyrażenia when", slide: "Porównanie ze `switch` w Javie – cd.", mode: "frag", lesson: "when",
          code: `val result = when (x) {
    1 -> "one"
    2 -> "two"
    else -> "many"
}` },
        { n: 36, section: "Wyrażenia when", slide: "Pytanie kontrolne: `when`", mode: "frag", lesson: "when",
          code: `enum class Light { RED, YELLOW, GREEN }
fun action(l: Light) = when (l) {
    Light.RED -> "stop"
    Light.GREEN -> "jedź"
}` },
        { n: 37, section: "Wyliczenia (enum)", slide: "Podstawowa definicja enum", mode: "run", lesson: "enums",
          code: `enum class Level {
    Overflow, High, Medium, Low, Empty
}

fun main() {
    println(Level.Medium)  // Medium
}` },
        { n: 38, section: "Wyliczenia (enum)", slide: "Import wartości enum", mode: "frag", lesson: "enums",
          code: `import enumerations.Level.*

fun main() {
    // Nie trzeba pisać Level.
    println(Overflow)  // Overflow
    println(High)      // High
}` },
        { n: 39, section: "Wyliczenia (enum)", slide: "Właściwości wbudowane", mode: "run", lesson: "enums",
          code: `enum class Size {
    Tiny, Small, Medium, Large, Huge, Gigantic
}

fun main() {
    // entries - wszystkie wartości (od Kotlina 1.9)
    Size.entries.forEach { println(it) }

    // ordinal - pozycja (od 0)
    println(Size.Tiny.ordinal)      // 0
    println(Size.Huge.ordinal)      // 4

    // name - nazwa jako String
    println(Size.Medium.name)       // "Medium"
}` },
        { n: 40, section: "Wyliczenia (enum)", slide: "Enum z właściwościami", mode: "decl", lesson: "enums",
          code: `enum class Direction(val notation: String) {
    North("N"),
    South("S"),
    East("E"),
    West("W");  // Średnik wymagany!

    val opposite: Direction
        get() = when (this) {
            North -> South
            South -> North
            West -> East
            East -> West
        }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 41, section: "Wyliczenia (enum)", slide: "Enum z właściwościami – użycie", mode: "run", lesson: "enums",
          code: `import Direction.*
import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
enum class Direction(val notation: String) {
    North("N"),
    South("S"),
    East("E"),
    West("W");  // Średnik wymagany!

    val opposite: Direction
        get() = when (this) {
            North -> South
            South -> North
            West -> East
            East -> West
        }
}

//sampleStart
fun main() {
    println(North.notation)           // "N"
    println(North.opposite)           // South
    println(West.opposite.opposite)   // West
    println(North.opposite.notation)  // "S"
}
//sampleEnd` },
        { n: 42, section: "Wyliczenia (enum)", slide: "`when` z enum – wyczerpywalność", mode: "decl", lesson: "enums",
          code: `enum class TrafficLight { RED, YELLOW, GREEN }

fun action(light: TrafficLight) = when (light) {
    TrafficLight.RED -> "Stop"
    TrafficLight.YELLOW -> "Caution"
    TrafficLight.GREEN -> "Go"
    // else nie jest potrzebne!
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 43, section: "Wyliczenia (enum)", slide: "Enum z metodami", mode: "run", lesson: "enums",
          code: `enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF);

    fun containsRed() = (rgb and 0xFF0000 != 0)
}

fun main() {
    println(Color.RED.containsRed())    // true
    println(Color.GREEN.containsRed())  // false
}` },
        { n: 44, section: "Wyliczenia (enum)", slide: "Porównanie z Javą – cd.", mode: "decl", lesson: "enums",
          code: `enum class Direction(val notation: String) {
    North("N"),
    South("S"),
    East("E"),
    West("W")
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 45, section: "Wyliczenia (enum)", slide: "`entries` i `valueOf()`", mode: "run", lesson: "enums",
          code: `enum class Color { RED, GREEN, BLUE }

fun main() {
    println(Color.entries)                 // [RED, GREEN, BLUE]
    println(Color.valueOf("RED"))          // RED
    println(Color.entries.first { it.name.startsWith("G") })   // GREEN
    println(Color.entries.size)            // 3
}` },
        { n: 46, section: "Wyliczenia (enum)", slide: "Enum w `when` użytym jako instrukcja", mode: "decl", lesson: "enums",
          code: `enum class Level {
    Overflow, High, Medium, Low, Empty
}

fun checkLevel(level: Level) {
    when (level) {
        Level.Overflow -> println(">>> Overflow!")
        Level.Empty -> println("Alert: Empty")
        else -> println("Level $level OK")
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` }
    ]
});
