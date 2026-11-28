// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "IIIb",
    title: "Użyteczne narzędzia języka Kotlin II",
    examples: [
        { n: 1, section: "Klasy danych (data class)", slide: "Klasa danych – podstawy", mode: "run", lesson: "data-classes",
          code: `data class Simple(
    val arg1: String,
    var arg2: Int
)

fun main() {
    val s1 = Simple("Hi", 29)
    val s2 = Simple("Hi", 29)

    println(s1)      // Simple(arg1=Hi, arg2=29)
    println(s1 == s2)  // true
}` },
        { n: 2, section: "Klasy danych (data class)", slide: "`equals()` – porównanie wartości", mode: "run", lesson: "data-classes",
          code: `data class Person(val name: String, val age: Int)

fun main() {
    val p1 = Person("Alice", 30)
    val p2 = Person("Alice", 30)
    val p3 = p1

    println(p1 == p2)   // true  - te same wartości
    println(p1 === p2)  // false - różne obiekty
    println(p1 === p3)  // true  - ta sama referencja
}` },
        { n: 3, section: "Klasy danych (data class)", slide: "`copy()` – kopiowanie z modyfikacją", mode: "run", lesson: "data-classes",
          code: `data class Person(val name: String, val age: Int)

fun main() {
    val alice = Person("Alice", 30)

    val olderAlice = alice.copy(age = 31)

    println(alice)       // Person(name=Alice, age=30)
    println(olderAlice)  // Person(name=Alice, age=31)
}` },
        { n: 4, section: "Klasy danych (data class)", slide: "Porównanie z Javą – Kotlin", mode: "decl", lesson: "data-classes",
          code: `data class Person(val name: String, val age: Int)

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 5, section: "Klasy danych (data class)", slide: "Klasy danych w kolekcjach", mode: "run", lesson: "data-classes",
          code: `data class Point(val x: Int, val y: Int)

fun main() {
    val points = setOf(
        Point(1, 2),
        Point(1, 2),  // Duplikat!
        Point(3, 4)
    )
    println(points.size)  // 2

    val map = mapOf(
        Point(0, 0) to "origin",
        Point(1, 0) to "right"
    )
    println(map[Point(0, 0)])  // "origin"
}` },
        { n: 6, section: "Klasy danych (data class)", slide: "Ograniczenia klas danych", mode: "decl", lesson: "data-classes",
          code: `// Błąd - brak parametrów
// data class Empty()

// Błąd - parametr bez val/var
// data class Wrong(name: String)

// OK
data class Correct(val name: String)

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 7, section: "Deklaracje destrukturyzujące", slide: "Pair – zwracanie dwóch wartości", mode: "run", lesson: "data-classes",
          code: `fun compute(input: Int): Pair<Int, String> =
    if (input > 5)
        Pair(input * 2, "High")
    else
        Pair(input * 2, "Low")

fun main() {
    val result = compute(7)
    println(result.first)   // 14
    println(result.second)  // "High"
}` },
        { n: 8, section: "Deklaracje destrukturyzujące", slide: "Destrukturyzacja – rozpakowywanie wartości", mode: "run", lesson: "data-classes",
          code: `fun compute(input: Int): Pair<Int, String> =
    if (input > 5)
        Pair(input * 2, "High")
    else
        Pair(input * 2, "Low")

fun main() {
    val (value, description) = compute(7)
    println(value)        // 14
    println(description)  // "High"
}` },
        { n: 9, section: "Deklaracje destrukturyzujące", slide: "Triple – trzy wartości", mode: "run", lesson: "data-classes",
          code: `fun getDate(): Triple<Int, Int, Int> =
    Triple(2024, 10, 24)  // rok, miesiąc, dzień

fun main() {
    val (year, month, day) = getDate()
    println("$year-$month-$day")  // "2024-10-24"
}` },
        { n: 10, section: "Deklaracje destrukturyzujące", slide: "Destrukturyzacja klas danych", mode: "run", lesson: "data-classes",
          code: `data class Computation(
    val data: Int,
    val info: String
)

fun evaluate(input: Int) =
    if (input > 5)
        Computation(input * 2, "High")
    else
        Computation(input * 2, "Low")

fun main() {
    val (value, description) = evaluate(7)
    println("$value: $description")  // "14: High"
}` },
        { n: 11, section: "Deklaracje destrukturyzujące", slide: "Zalety klas danych nad Pair/Triple", mode: "frag", lesson: "data-classes",
          code: `// Pair - niejasne znaczenie
val result: Pair<Int, String> = compute(7)

// Data class - wyraźne znaczenie
val result: Computation = evaluate(7)` },
        { n: 12, section: "Deklaracje destrukturyzujące", slide: "Kolejność ma znaczenie!", mode: "run", lesson: "data-classes",
          code: `data class Tuple(
    val i: Int,
    val d: Double,
    val s: String
)

fun main() {
    val tuple = Tuple(1, 3.14, "Mouse")

    val (i, d, s) = tuple
    println("$i, $d, $s")  // "1, 3.14, Mouse"

    val (number, decimal, text) = tuple
    println("$number, $decimal, $text")  // "1, 3.14, Mouse"
}` },
        { n: 13, section: "Deklaracje destrukturyzujące", slide: "Pomijanie wartości – znak `_`", mode: "run", lesson: "data-classes",
          code: `data class Tuple(
    val i: Int,
    val d: Double,
    val s: String,
    val b: Boolean
)

fun main() {
    val tuple = Tuple(1, 3.14, "Mouse", false)

    // Interesuje nas tylko s
    val (_, _, animal) = tuple
    println(animal)  // "Mouse"

    // Możemy też pominąć końcowe elementy
    val (num, dec) = tuple
    println("$num, $dec")  // "1, 3.14"
}` },
        { n: 14, section: "Deklaracje destrukturyzujące", slide: "Destrukturyzacja w pętlach `for`", mode: "run", lesson: "data-classes",
          code: `fun main() {
    val map = mapOf(1 to "one", 2 to "two")

    for ((key, value) in map) {
        println("$key = $value")
    }
    // 1 = one
    // 2 = two
}` },
        { n: 15, section: "Deklaracje destrukturyzujące", slide: "Destrukturyzacja z `withIndex()`", mode: "run", lesson: "data-classes",
          code: `fun main() {
    val list = listOf('a', 'b', 'c')

    for ((index, value) in list.withIndex()) {
        println("$index: $value")
    }
    // 0: a
    // 1: b
    // 2: c
}` },
        { n: 16, section: "Deklaracje destrukturyzujące", slide: "Destrukturyzacja w lambdach", mode: "run", lesson: "data-classes",
          code: `data class Person(val name: String, val age: Int)

fun main() {
    val people = listOf(
        Person("Alice", 30),
        Person("Bob", 25)
    )

    people.forEach { (name, age) ->
        println("$name is $age years old")
    }
    // Alice is 30 years old
    // Bob is 25 years old
}` },
        { n: 17, section: "Deklaracje destrukturyzujące", slide: "Ograniczenia destrukturyzacji", mode: "decl", lesson: "data-classes",
          code: `class MyClass {
    // Błąd! Destructuring tylko dla lokalnych zmiennych
    // val (a, b) = Pair(1, 2)
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 18, section: "Typy nullable", slide: "Wnioskowanie typów a nullable", mode: "run", lesson: "null-safety",
          code: `fun main() {
    val s1: String = "abc"
    val s2: String? = s1     // OK - non-nullable → nullable

    // val s3: String = s2   // Błąd! nullable → non-nullable

    val s4 = s2  // Type inference: String?
}` },
        { n: 19, section: "Typy nullable", slide: "Jawne sprawdzenie `null`", mode: "run", lesson: "null-safety",
          code: `fun main() {
    val s: String? = "abc"

    if (s != null) {
        println(s.length)  // OK - kompilator wie, że nie jest null
    }
}` },
        { n: 20, section: "Typy nullable", slide: "Nullable w Map", mode: "run", lesson: "null-safety",
          code: `fun main() {
    val map = mapOf(0 to "yes", 1 to "no")

    val first: String? = map[0]
    val second: String? = map[2]  // Klucz nie istnieje

    println(first)   // "yes"
    println(second)  // null
}` },
        { n: 21, section: "Typy nullable", slide: "Porównanie z Javą", mode: "wrap", lesson: "null-safety",
          code: `fun main() {
//sampleStart
var s: String = "abc"
// s = null  // Błąd kompilacji!

fun getLength(s: String): Int = s.length  // Bezpieczne!
//sampleEnd
}` },
        { n: 22, section: "Typy nullable", slide: "`Optional` w Javie a typy nullable", mode: "wrap", lesson: "null-safety",
          code: `fun main() {
//sampleStart
val s: String? = "abc"
val empty: String? = null

val result = s ?: "default"
//sampleEnd
}` },
        { n: 23, section: "Typy nullable", slide: "Typy platformowe: trzy wybory", mode: "frag", lesson: "null-safety",
          code: `// getName() z Javy zwróciło null
val name = person.name          // 1. typ String! -- przechodzi dalej
println(name.length)            //    NPE dopiero tutaj

val sure: String = person.name  // 2. „na pewno nie null”
                                //    NPE od razu tutaj: getName(...) must not be null

val safe: String? = person.name // 3. „może być null”
println(safe?.length)           //    kompilator wymusza ?. -- wypisze null` },
        { n: 24, section: "Typy nullable", slide: "Pytanie kontrolne: typy platformowe", mode: "wrap", lesson: "null-safety",
          code: `fun main() {
//sampleStart
val home = System.getenv("APP_HOME")   // metoda Javy
println(home.length)
//sampleEnd
}` },
        { n: 25, section: "Bezpieczne wywołania i operator Elvis", slide: "Problem: wywołanie metody na nullable", mode: "wrap", lesson: "null-safety",
          code: `fun main() {
//sampleStart
val s: String? = null
// s.length  // Błąd kompilacji!
//sampleEnd
}` },
        { n: 26, section: "Bezpieczne wywołania i operator Elvis", slide: "Operator Safe Call (`?.`)", mode: "run", lesson: "null-safety",
          code: `fun String.echo() {
    println(uppercase())
    println(this)
    println(lowercase())
}

fun main() {
    val s1: String? = "Howdy!"
    s1?.echo()  // Wywołuje echo()

    val s2: String? = null
    s2?.echo()  // Nic się nie dzieje - brak wyjątku!
}` },
        { n: 27, section: "Bezpieczne wywołania i operator Elvis", slide: "Safe Call – zwracanie wartości", mode: "run", lesson: "null-safety",
          code: `fun checkLength(s: String?, expected: Int?) {
    val length1 = if (s != null) s.length else null
    val length2 = s?.length  // To samo, krócej!

    println(length1 == expected)  // true
    println(length2 == expected)  // true
}

fun main() {
    checkLength("abc", 3)
    checkLength(null, null)
}` },
        { n: 28, section: "Bezpieczne wywołania i operator Elvis", slide: "Operator Elvis (`?:`)", mode: "run", lesson: "null-safety",
          code: `fun main() {
    val s1: String? = "abc"
    println(s1 ?: "---")  // "abc"

    val s2: String? = null
    println(s2 ?: "---")  // "---"
}` },
        { n: 29, section: "Bezpieczne wywołania i operator Elvis", slide: "Safe Call + Elvis", mode: "run", lesson: "null-safety",
          code: `fun checkLength(s: String?, expected: Int) {
    val length = s?.length ?: 0
    println(length == expected)
}

fun main() {
    checkLength("abc", 3)  // true
    checkLength(null, 0)   // true
}` },
        { n: 30, section: "Bezpieczne wywołania i operator Elvis", slide: "Łańcuchy bezpiecznych wywołań", mode: "run", lesson: "null-safety",
          code: `class Person(
    val name: String,
    var friend: Person? = null
)

fun main() {
    val alice = Person("Alice")
    println(alice.friend?.friend?.name)  // null

    val bob = Person("Bob")
    val charlie = Person("Charlie", bob)
    bob.friend = charlie
    println(bob.friend?.friend?.name)  // "Bob"
}` },
        { n: 31, section: "Bezpieczne wywołania i operator Elvis", slide: "Elvis z return/throw", mode: "frag", lesson: "null-safety",
          code: `fun processUser(user: User?) {
    val name = user?.name ?: return
    // Jeśli user lub name jest null, funkcja kończy się

    println("Processing $name")
}

fun validateUser(user: User?) {
    val id = user?.id ?: throw IllegalArgumentException(
        "User ID required"
    )
    // Jeśli null, rzuca wyjątek
}` },
        { n: 32, section: "Bezpieczne wywołania i operator Elvis", slide: "`?.let { }` – blok tylko dla wartości non-null", mode: "run", lesson: "null-safety",
          code: `fun sendEmailTo(email: String) { println("Wysyłam do $email") }

fun main() {
    var email: String? = "jan@example.com"
    email?.let { sendEmailTo(it) }    // wywoła się

    email = null
    email?.let { sendEmailTo(it) }    // nic się nie stanie
}` },
        { n: 33, section: "Bezpieczne wywołania i operator Elvis", slide: "Pytanie kontrolne: `?.` i `?:`", mode: "wrap", lesson: "null-safety",
          code: `fun main() {
//sampleStart
val s: String? = null
println(s?.length ?: -1)
println(s!!.length)
//sampleEnd
}` },
        { n: 34, section: "Asercje non-null (!!)", slide: "Asercja non-null (`!!`)", mode: "run", lesson: "null-safety",
          code: `fun main() {
    var x: String? = "abc"
    println(x!!)  // "abc"

    x = null
    // println(x!!)  // NullPointerException!
}` },
        { n: 35, section: "Asercje non-null (!!)", slide: "Kiedy używać !!", mode: "frag", lesson: "null-safety",
          code: `val s: String? = getStringFromJava()
val length = s!!.length  // Tylko jeśli jesteś pewien!` },
        { n: 36, section: "Asercje non-null (!!)", slide: "Lepsza alternatywa: getValue()", mode: "run", lesson: "null-safety",
          code: `fun main() {
    val map = mapOf(1 to "one")

    // Źle - używa !!
    println(map[1]!!.uppercase())  // "ONE"

    // Dobrze - używa getValue()
    println(map.getValue(1).uppercase())  // "ONE"

    // getValue rzuca NoSuchElementException z lepszym komunikatem
    // map[2]!!  // NullPointerException
    // map.getValue(2)  // NoSuchElementException: Key 2 is missing
}` },
        { n: 37, section: "Asercje non-null (!!)", slide: "`lateinit` – inicjalizacja później", mode: "frag", lesson: "null-safety",
          code: `class DatabaseTest {
    lateinit var db: Database        // bez wartości początkowej, bez ?

    @BeforeEach
    fun setup() { db = Database.connect() }

    @Test
    fun test() { db.query("...") }   // bez ?. i bez !!
}` },
        { n: 38, section: "Rozszerzenia dla typów nullable", slide: "Funkcje rozszerzające dla typów nullable", mode: "run", lesson: null,
          code: `fun String?.isNullOrEmpty(): Boolean =
    this == null || isEmpty()

fun main() {
    val s1: String? = null
    s1.isNullOrEmpty()  // true - bez safe call!

    val s2 = ""
    s2.isNullOrEmpty()  // true
}` },
        { n: 39, section: "Rozszerzenia dla typów nullable", slide: "Biblioteka standardowa", mode: "run", lesson: null,
          code: `fun main() {
    val s1: String? = null
    println(s1.isNullOrEmpty())   // true
    println(s1.isNullOrBlank())   // true

    val s2 = ""
    println(s2.isNullOrEmpty())   // true
    println(s2.isNullOrBlank())   // true

    val s3: String = " \\t\\n"
    println(s3.isNullOrEmpty())   // false
    println(s3.isNullOrBlank())   // true
}` },
        { n: 40, section: "Rozszerzenia dla typów nullable", slide: "Jak to działa", mode: "decl", lesson: null,
          code: `fun String?.isNullOrEmpty(): Boolean =
    this == null || isEmpty()

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 41, section: "Wprowadzenie do typów generycznych", slide: "Klasa generyczna", mode: "run", lesson: null,
          code: `data class Automobile(val brand: String)

class GenericHolder<T>(private val value: T) {
    fun getValue(): T = value
}

fun main() {
    val h1 = GenericHolder(Automobile("Ford"))
    val a: Automobile = h1.getValue()

    val h2 = GenericHolder(1)
    val i: Int = h2.getValue()

    val h3 = GenericHolder("Chartreuse")
    val s: String = h3.getValue()
}` },
        { n: 42, section: "Wprowadzenie do typów generycznych", slide: "Funkcje generyczne", mode: "run", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class Dog { fun bark() = "Ruff!" }

//sampleStart
fun <T> identity(arg: T): T = arg

fun main() {
    identity("Yellow")  // String
    identity(1)         // Int

    val d: Dog = identity(Dog())
}
//sampleEnd` },
        { n: 43, section: "Wprowadzenie do typów generycznych", slide: "Generyczne funkcje rozszerzające", mode: "run", lesson: null,
          code: `fun <T> List<T>.first(): T {
    if (isEmpty())
        throw NoSuchElementException("Empty list")
    return this[0]
}

fun <T> List<T>.firstOrNull(): T? =
    if (isEmpty()) null else this[0]

fun main() {
    listOf(1, 2, 3).first()       // 1
    emptyList<Int>().firstOrNull() // null
}` },
        { n: 44, section: "Wprowadzenie do typów generycznych", slide: "`Any` – uniwersalny typ?", mode: "run", lesson: null,
          code: `class AnyHolder(private val value: Any) {
    fun getValue(): Any = value
}

class Dog { fun bark() = "Ruff!" }

fun main() {
    val holder = AnyHolder(Dog())
    val any = holder.getValue()
    // any.bark()  // Błąd - any jest typu Any!
}` },
        { n: 45, section: "Wprowadzenie do typów generycznych", slide: "Generyki zachowują typ (dla kompilatora)", mode: "run", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class Dog { fun bark() = "Ruff!" }

//sampleStart
class GenericHolder<T>(private val value: T) {
    fun getValue(): T = value
}

fun main() {
    val holder = GenericHolder(Dog())
    val dog = holder.getValue()
    println(dog.bark())  // "Ruff!" - działa!
}
//sampleEnd` },
        { n: 46, section: "Wprowadzenie do typów generycznych", slide: "Ograniczenia typu (upper bound)", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
fun <T : Comparable<T>> maxOf3(a: T, b: T, c: T): T {
    var m = a
    if (b > m) m = b                 // > działa, bo T jest Comparable
    if (c > m) m = c
    return m
}

println(maxOf3(3, 7, 5))             // 7
println(maxOf3("kot", "pies", "mysz")) // pies
// maxOf3(Dog(), Dog(), Dog())       // błąd: Dog nie jest Comparable
//sampleEnd
}` },
        { n: 47, section: "Wprowadzenie do typów generycznych", slide: "Wymazywanie typów i `reified`", mode: "frag", lesson: null,
          code: `fun <T> isA(value: Any) = value is T        // błąd: T jest wymazane

inline fun <reified T> isA2(value: Any) = value is T   // OK

println(isA2<String>("abc"))   // true
println(isA2<Int>("abc"))      // false` },
        { n: 48, section: "Właściwości rozszerzające", slide: "Właściwości rozszerzające – definicja", mode: "run", lesson: null,
          code: `val String.indices: IntRange
    get() = 0 until length

fun main() {
    println("abc".indices)  // 0..2
}` },
        { n: 49, section: "Właściwości rozszerzające", slide: "Generyczna właściwość rozszerzająca", mode: "run", lesson: null,
          code: `val <T> List<T>.firstOrNull: T?
    get() = if (isEmpty()) null else this[0]

fun main() {
    listOf(1, 2, 3).firstOrNull  // 1
    emptyList<String>().firstOrNull  // null
}` },
        { n: 50, section: "Właściwości rozszerzające", slide: "Przykład – indices", mode: "run", lesson: null,
          code: `val String.indices: IntRange
    get() = 0 until length

// Alternatywnie jako funkcja:
fun String.indices() = 0 until length

fun main() {
    "abc".indices    // Property
    "abc".indices()  // Function
}` },
        { n: 51, section: "break i continue", slide: "Etykiety", mode: "wrap", lesson: "while",
          code: `fun main() {
//sampleStart
outer@ for (c in 'a'..'e') {
    for (i in 1..9) {
        if (i == 5) continue@outer
        if ("$c$i" == "c3") break@outer
        println("$c$i")
    }
}
//sampleEnd
}` },
        { n: 52, section: "break i continue", slide: "Lepsze alternatywy", mode: "wrap", lesson: "while",
          code: `fun main() {
//sampleStart
// Zamiast break i continue:
for (c in 'a'..'c') {
    for (i in 1..4) {
        val value = "$c$i"
        if (value < "c3") {
            println(value)
        }
    }
}
//sampleEnd
}` },
        { n: 53, section: "Dla chętnych", slide: "`break` – wyjście z pętli", mode: "run", lesson: null,
          code: `fun main() {
    val nums = mutableListOf(0)
    for (i in 4 until 100 step 4) {
        if (i == 8) continue  // Pomiń 8
        if (i == 40) break    // Zakończ przy 40
        nums.add(i)
    }
    println(nums)  // [0, 4, 12, 16, 20, 24, 28, 32, 36]
}` },
        { n: 54, section: "Dla chętnych", slide: "`continue` – pominięcie iteracji", mode: "run", lesson: null,
          code: `fun main() {
    for (i in 1..10) {
        if (i % 2 == 0) continue  // Pomiń parzyste
        println(i)
    }
}
// Wynik: 1, 3, 5, 7, 9` },
        { n: 55, section: "Dla chętnych", slide: "`break` i `continue`: porównanie z Javą", mode: "frag", lesson: null,
          code: `readData@ while (...) {
    for (...) {
        if (n < 0)
            break@readData
    }
}` }
    ]
});
