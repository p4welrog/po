// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "IIb",
    title: "Wprowadzenie do obiektów II",
    examples: [
        { n: 1, section: "Akcesory właściwości", slide: "Automatyczne akcesory", mode: "run", lesson: "visibility",
          code: `class Person {
    var name: String = ""  // Automatyczny getter i setter
    val age: Int = 0       // Automatyczny getter
}

fun main() {
    val person = Person()
    person.name = "Anna"  // Wywołuje setter
    println(person.name)  // Wywołuje getter
}` },
        { n: 2, section: "Akcesory właściwości", slide: "Własne akcesory", mode: "decl", lesson: "visibility",
          code: `class Rectangle {
    var width: Int = 0
    var height: Int = 0

    val area: Int
        get() = width * height

    var perimeter: Int
        get() = 2 * (width + height)
        set(value) {
            // Można dodać logikę
            val avg = value / 4
            width = avg
            height = avg
        }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 3, section: "Akcesory właściwości", slide: "Właściwości obliczane", mode: "frag", lesson: "visibility",
          code: `class Cage(private val maxCapacity: Int) {
    private val hamsters = mutableListOf<Hamster>()

    val capacity: Int
        get() = maxCapacity - hamsters.size

    val isFull: Boolean
        get() = hamsters.size == maxCapacity

    fun put(hamster: Hamster) {
        if (!isFull) {
            hamsters += hamster
        }
    }
}

fun main() {
    val cage = Cage(2)
    println(cage.capacity)  // 2
    println(cage.isFull)    // false
}` },
        { n: 4, section: "Akcesory właściwości", slide: "Pole przechowujące (backing field)", mode: "run", lesson: "visibility",
          code: `class Person {
    var name: String = ""
        get() = field.uppercase()
        set(value) {
            field = value.trim()
        }
}

fun main() {
    val p = Person()
    p.name = "  anna  "
    println(p.name)  // ANNA
}` },
        { n: 5, section: "Akcesory właściwości", slide: "Widoczność akcesora: `private set`", mode: "run", lesson: "visibility",
          code: `class Counter {
    var count = 0
        private set           // zapis tylko wewnątrz klasy

    fun increment() { count++ }
}

fun main() {
    val c = Counter()
    c.increment()
    println(c.count)          // 1
    // c.count = 10           // błąd kompilacji
}` },
        { n: 6, section: "Testowanie", slide: "Test bez frameworka", mode: "frag", lesson: null,
          code: `fun test(name: String, expected: Any?, actual: Any?) {
    val status = if (expected == actual) "OK  " else "BŁĄD"
    println("$status $name: oczekiwano $expected, jest $actual")
}

fun main() {
    test("2 + 3", 5, Calculator().add(2, 3))
    test("3 - 2", 1, Calculator().subtract(3, 2))
}
/* Wynik:
OK   2 + 3: oczekiwano 5, jest 5
OK   3 - 2: oczekiwano 1, jest 1
*/` },
        { n: 7, section: "Wyjątki", slide: "Przykład wyjątku", mode: "run", lesson: "exceptions",
          code: `fun main() {
    val i = "$1.9".toDouble()  // BŁĄD!
}` },
        { n: 8, section: "Wyjątki", slide: "Rzucanie wyjątków", mode: "frag", lesson: "exceptions",
          code: `fun quadraticZeroes(
    a: Double,
    b: Double,
    c: Double
): Roots {
    if (a == 0.0)
        throw IllegalArgumentException("a is zero")

    val underRadical = b * b - 4 * a * c
    if (underRadical < 0)
        throw IllegalArgumentException(
            "Negative underRadical: $underRadical")

    // ... obliczenia ...
}` },
        { n: 9, section: "Wyjątki", slide: "Obsługa wyjątków – try/catch", mode: "run", lesson: "exceptions",
          code: `fun main() {
    try {
        val result = "$1.9".toDouble()
        println(result)
    } catch (e: NumberFormatException) {
        println("Błąd konwersji: \${e.message}")
    }
}
// Output: Błąd konwersji: For input string: "$1.9"` },
        { n: 10, section: "Wyjątki", slide: "Wiele bloków catch", mode: "run", lesson: "exceptions",
          code: `fun main() {
    try {
        // Ryzykowny kod
        val number = readLine()!!.toInt()
        val result = 100 / number
        println("Wynik: $result")
    } catch (e: NumberFormatException) {
        println("To nie jest liczba")
    } catch (e: ArithmeticException) {
        println("Dzielenie przez zero!")
    } catch (e: Exception) {
        println("Inny błąd: \${e.message}")
    }
}` },
        { n: 11, section: "Wyjątki", slide: "Blok finally", mode: "run", lesson: "exceptions",
          code: `fun main() {
    try {
        // Ryzykowny kod
        val result = 10 / 0
    } catch (e: ArithmeticException) {
        println("Błąd: \${e.message}")
    } finally {
        println("Sprzątanie zasobów")
    }
}
/* Output:
Błąd: / by zero
Sprzątanie zasobów
*/` },
        { n: 12, section: "Wyjątki", slide: "Własna klasa wyjątku", mode: "run", lesson: "exceptions",
          code: `class ZeroDenominatorException(message: String) : ArithmeticException(message)

class Fraction(num: Long, den: Long) {
    init {
        if (den == 0L) throw ZeroDenominatorException("Mianownik nie może być zerem")
    }
}

fun main() {
    try {
        Fraction(1, 0)
    } catch (e: ZeroDenominatorException) {
        println("Błąd: \${e.message}")
    }
}` },
        { n: 13, section: "Wyjątki", slide: "Dokumentowanie wyjątków: KDoc", mode: "frag", lesson: "exceptions",
          code: `/**
 * Dzieli ten ułamek przez [other].
 *
 * @param other dzielnik
 * @return nowy ułamek -- wynik dzielenia
 * @throws ZeroDenominatorException gdy [other] jest równy zero
 */
fun div(other: Fraction): Fraction { /* ... */ }` },
        { n: 14, section: "Listy", slide: "Tworzenie list", mode: "run", lesson: "lists",
          code: `fun main() {
    val ints = listOf(99, 3, 5, 7, 11, 13)
    println(ints)  // [99, 3, 5, 7, 11, 13]

    val strings = listOf("a", "b", "c")
    println(strings)  // [a, b, c]

    val mixed = listOf(1, "two", 3.0)
    println(mixed)  // [1, two, 3.0]
}` },
        { n: 15, section: "Listy", slide: "Indeksowanie list", mode: "run", lesson: "lists",
          code: `fun main() {
    val ints = listOf(99, 3, 5, 7, 11, 13)

    println(ints[0])   // 99
    println(ints[4])   // 11
    println(ints[5])   // 13
    // println(ints[6])  // IndexOutOfBoundsException
}` },
        { n: 16, section: "Listy", slide: "Iteracja po liście", mode: "run", lesson: "lists",
          code: `fun main() {
    val ints = listOf(99, 3, 5, 7, 11, 13)

    var result = ""
    for (i in ints) {
        result += "$i "
    }
    println(result)  // 99 3 5 7 11 13
}` },
        { n: 17, section: "Listy", slide: "Operacje na listach", mode: "run", lesson: "lists",
          code: `fun main() {
    val lst = listOf(19.2, 88.3, 22.1)

    println(lst.reversed())  // [22.1, 88.3, 19.2]
    println(lst.sorted())    // [19.2, 22.1, 88.3]
    println(lst.sum())       // 129.6
    println(lst.size)        // 3
    println(lst.first())     // 19.2
    println(lst.last())      // 22.1
}` },
        { n: 18, section: "Listy", slide: "MutableList – listy modyfikowalne", mode: "run", lesson: "lists",
          code: `fun main() {
    val mutable = mutableListOf(1, 2, 3)
    println(mutable)  // [1, 2, 3]

    mutable.add(4)
    mutable += 5
    println(mutable)  // [1, 2, 3, 4, 5]

    mutable.remove(2)
    mutable -= 3
    println(mutable)  // [1, 4, 5]
}` },
        { n: 19, section: "Listy", slide: "Tylko do odczytu ≠ niemutowalna", mode: "wrap", lesson: "lists",
          code: `fun main() {
//sampleStart
val mutable = mutableListOf(1, 2, 3)
val readOnly: List<Int> = mutable   // ten sam obiekt!

mutable.add(4)
println(readOnly)                   // [1, 2, 3, 4]
//sampleEnd
}` },
        { n: 20, section: "Listy", slide: "Kolekcje Kotlina a kolekcje Javy", mode: "wrap", lesson: "lists",
          code: `fun main() {
//sampleStart
println(mutableListOf(1, 2).javaClass)  // class java.util.ArrayList
//sampleEnd
}` },
        { n: 21, section: "Listy", slide: "Pytanie kontrolne: listy", mode: "wrap", lesson: "lists",
          code: `fun main() {
//sampleStart
val a = mutableListOf(1, 2)
val b: List<Int> = a
a.add(3)
println(b.size)
//sampleEnd
}` },
        { n: 22, section: "Listy argumentów zmiennej długości", slide: "Definicja funkcji z vararg", mode: "run", lesson: null,
          code: `fun sum(vararg numbers: Int): Int {
    var total = 0
    for (n in numbers) {
        total += n
    }
    return total
}

fun main() {
    println(sum(1, 2, 3))        // 6
    println(sum(1, 2, 3, 4, 5))  // 15
    println(sum())               // 0
}` },
        { n: 23, section: "Listy argumentów zmiennej długości", slide: "vararg z innymi parametrami", mode: "run", lesson: null,
          code: `fun varargs(s: String, vararg ints: Int) {
    for (i in ints) {
        print("$i ")
    }
    println(s)
}

fun main() {
    varargs("primes", 5, 7, 11, 13, 17, 19, 23)
    // 5 7 11 13 17 19 23 primes
}` },
        { n: 24, section: "Listy argumentów zmiennej długości", slide: "Operator rozwinięcia `*` (spread)", mode: "run", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
fun varargs(s: String, vararg ints: Int) {
    for (i in ints) {
        print("$i ")
    }
    println(s)
}

//sampleStart
fun main() {
    val array = intArrayOf(4, 5, 6)

    varargs("x", 1, 2, 3, *array, 7)
    // 1 2 3 4 5 6 7 x

    val list = listOf(9, 10, 11)
    varargs("y", *list.toIntArray())
    // 9 10 11 y
}
//sampleEnd` },
        { n: 25, section: "Zbiory (Sets)", slide: "Tworzenie zbiorów", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val set = setOf(1, 2, 3, 2, 1)
    println(set)  // [1, 2, 3]

    val colors = setOf("Red", "Green", "Blue")
    println(colors)  // [Red, Green, Blue]

    println(set.size)  // 3
}` },
        { n: 26, section: "Zbiory (Sets)", slide: "Sprawdzanie przynależności", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val set = setOf(1, 2, 3)

    println(1 in set)         // true
    println(4 in set)         // false
    println(set.contains(2))  // true
}` },
        { n: 27, section: "Zbiory (Sets)", slide: "Operacje na zbiorach", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val set1 = setOf(1, 2, 3, 4)
    val set2 = setOf(3, 4, 5, 6)

    println(set1 union set2)      // [1, 2, 3, 4, 5, 6]
    println(set1 intersect set2)  // [3, 4]
    println(set1 subtract set2)   // [1, 2]
    println(set1 - set2)          // [1, 2] (różnica)
}` },
        { n: 28, section: "Zbiory (Sets)", slide: "Konwersja List → Set", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val list = listOf(3, 3, 2, 1, 2)

    val set = list.toSet()
    println(set)  // [3, 2, 1]

    val distinct = list.distinct()
    println(distinct)  // [3, 2, 1]

    val charSet = "abbcc".toSet()
    println(charSet)  // [a, b, c]
}` },
        { n: 29, section: "Zbiory (Sets)", slide: "MutableSet", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val mutableSet = mutableSetOf<Int>()

    mutableSet += 42
    mutableSet += 42  // Duplikat - nie zostanie dodany
    println(mutableSet)  // [42]

    mutableSet -= 42
    println(mutableSet)  // []
}` },
        { n: 30, section: "Mapy (Maps)", slide: "Tworzenie map", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val ascii = mapOf(
        "A" to 65,
        "B" to 66,
        "C" to 67,
        "I" to 73,
        "J" to 74
    )

    println(ascii)
    // {A=65, B=66, C=67, I=73, J=74}
}` },
        { n: 31, section: "Mapy (Maps)", slide: "Dostęp do wartości", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val ascii = mapOf(
        "A" to 65,
        "B" to 66,
        "C" to 67
    )

    println(ascii["A"])  // 65
    println(ascii["B"])  // 66
    println(ascii["Z"])  // null

    println(ascii.get("A"))  // 65
}` },
        { n: 32, section: "Mapy (Maps)", slide: "getValue i getOrDefault", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val map = mapOf("a" to "attempt")

    println(map["b"])  // null

    // map.getValue("b")  // NoSuchElementException

    println(map.getOrDefault("a", "??"))  // attempt
    println(map.getOrDefault("b", "??"))  // ??
}` },
        { n: 33, section: "Mapy (Maps)", slide: "Obiekty jako wartości", mode: "run", lesson: "maps-sets",
          code: `class Contact(
    val name: String,
    val phone: String
) {
    override fun toString() =
        "Contact('$name', '$phone')"
}

fun main() {
    val miffy = Contact("Miffy", "1-234-567890")
    val cleo = Contact("Cleo", "098-765-4321")

    val contacts = mapOf(
        miffy.phone to miffy,
        cleo.phone to cleo
    )

    println(contacts["1-234-567890"])  // Contact('Miffy', ...)
    println(contacts["1-111-111111"])  // null
}` },
        { n: 34, section: "Mapy (Maps)", slide: "MutableMap", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val mutableMap = mutableMapOf<String, Int>()

    mutableMap["one"] = 1
    mutableMap["two"] = 2
    mutableMap += "three" to 3
    println(mutableMap)
    // {one=1, two=2, three=3}

    mutableMap -= "two"
    println(mutableMap)  // {one=1, three=3}
}` },
        { n: 35, section: "Mapy (Maps)", slide: "Iteracja po mapie", mode: "run", lesson: "maps-sets",
          code: `fun main() {
    val map = mapOf(
        "A" to 65,
        "B" to 66,
        "C" to 67
    )

    for ((key, value) in map) {
        println("$key -> $value")
    }
    // A -> 65
    // B -> 66
    // C -> 67
}` },
        { n: 36, section: "Typy nullable – podstawy", slide: "Typy non-null", mode: "run", lesson: "null-safety",
          code: `fun main() {
    val s1: String = "abc"
    // val s2: String = null  // Błąd kompilacji!

    println(s1.length)  // OK - s1 na pewno nie jest null
}` },
        { n: 37, section: "Typy nullable – podstawy", slide: "Typy nullable: znak `?`", mode: "run", lesson: "null-safety",
          code: `fun main() {
    val s1: String? = null     // OK
    val s2: String? = "abc"    // OK - nullable może zawierać wartość

    // Na nullable nie wywołamy metody!
    // s1.length  // Błąd kompilacji
}` },
        { n: 38, section: "Typy nullable – podstawy", slide: "Skąd biorą się wartości `null`?", mode: "wrap", lesson: "null-safety",
          code: `fun main() {
//sampleStart
val ascii = mapOf("A" to 65, "B" to 66)
val code: Int? = ascii["Z"]           // brak klucza → null

class Group(private val grades: List<Int>) {
    val average: Double?               // brak ocen → null
        get() = if (grades.isEmpty()) null else grades.average()
}
//sampleEnd
}` },
        { n: 39, section: "Typy nullable – podstawy", slide: "Pytanie kontrolne: typy nullable", mode: "wrap", lesson: "null-safety",
          code: `fun main() {
//sampleStart
val m = mapOf("a" to 1)
val v = m["b"]
//sampleEnd
}` }
    ]
});
