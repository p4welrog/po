// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "IIa",
    title: "Wprowadzenie do obiektów I",
    examples: [
        { n: 1, section: "Wprowadzenie", slide: "Przykład: IntRange w Kotlinie", mode: "run", lesson: null,
          code: `fun main() {
    val r1 = IntRange(0, 10)
    val r2 = IntRange(5, 7)
    println(r1)  // 0..10
    println(r2)  // 5..7
}` },
        { n: 2, section: "Wprowadzenie", slide: "Operacje na obiektach", mode: "run", lesson: null,
          code: `fun main() {
    val range = IntRange(1, 10)

    println(range.sum())        // 55
    println(range.count())      // 10
    println(5 in range)         // true
    println(range.contains(15)) // false
}` },
        { n: 3, section: "Wprowadzenie", slide: "Przykład: String jako obiekt", mode: "run", lesson: null,
          code: `fun main() {
    val s = "AbcD"

    println(s.reversed())      // DcbA
    println(s.lowercase())     // abcd
    println(s.length)          // 4
    println(s[0])              // A
}` },
        { n: 4, section: "Wprowadzenie", slide: "Wspólny korzeń: `Any`", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
val things: List<Any> =
    listOf(1, "dwa", 3.0)

fun log(msg: String): Unit {
    println(msg)
}  // ": Unit" zwykle pomijamy
//sampleEnd
}` },
        { n: 5, section: "Wprowadzenie", slide: "Kolekcje – kontenery obiektów", mode: "run", lesson: null,
          code: `fun main() {
    val lst = listOf(19.2, 88.3, 22.1)

    println(lst[1])              // 88.3
    println(lst.reversed())      // [22.1, 88.3, 19.2]
    println(lst.sorted())        // [19.2, 22.1, 88.3]
    println(lst.sum())           // 129.6
}` },
        { n: 6, section: "Tworzenie klas", slide: "Najprostsza klasa w Kotlinie", mode: "decl", lesson: "classes",
          code: `class Giraffe
class Bear
class Hippo

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 7, section: "Tworzenie klas", slide: "Najprostsza klasa w Kotlinie", mode: "run", lesson: "classes",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class Giraffe
class Bear
class Hippo

//sampleStart
fun main() {
    val g1 = Giraffe()
    val g2 = Giraffe()
    val b = Bear()
    val h = Hippo()
}
//sampleEnd` },
        { n: 8, section: "Tworzenie klas", slide: "Java vs Kotlin: Tworzenie obiektów", mode: "frag", lesson: "classes",
          code: `class Animal
// lub
class Animal {}

// Tworzenie obiektu
val a = Animal()` },
        { n: 9, section: "Tworzenie klas", slide: "Wyświetlanie obiektów", mode: "run", lesson: "classes",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class Giraffe

//sampleStart
fun main() {
    val g1 = Giraffe()
    val g2 = Giraffe()

    println(g1)  // Giraffe@28d93b30
    println(g2)  // Giraffe@1b6d3586
}
//sampleEnd` },
        { n: 10, section: "Tworzenie klas", slide: "Klasa z ciałem – metody", mode: "run", lesson: "classes",
          code: `class Dog {
    fun bark() {
        println("Woof!")
    }
}

fun main() {
    val dog = Dog()
    dog.bark()  // Woof!
}` },
        { n: 11, section: "Tworzenie klas", slide: "Przykład klasy z metodą", mode: "run", lesson: "classes",
          code: `class Cat {
    fun meow() = "Miau!"
}

fun main() {
    val cat = Cat()
    println(cat.meow())  // Miau!

    // Można zapisać wynik
    val sound = cat.meow()
    println(sound)  // Miau!
}` },
        { n: 12, section: "Tworzenie klas", slide: "Klasa z wieloma metodami", mode: "run", lesson: "classes",
          code: `class Hamster {
    fun speak() = "Squeak!"

    fun exercise() {
        println("Running on wheel")
    }
}

fun main() {
    val h = Hamster()
    println(h.speak())  // Squeak!
    h.exercise()        // Running on wheel
}` },
        { n: 13, section: "Tworzenie klas", slide: "Przykład: Zoo Management", mode: "run", lesson: "classes",
          code: `class Lion {
    fun roar() = println("ROAR!")
    fun sleep() = println("Zzz...")
}

class Elephant {
    fun trumpet() = println("Trumpet!")
    fun spray() = println("Spraying water!")
}

fun main() {
    val simba = Lion()
    val dumbo = Elephant()

    simba.roar()     // ROAR!
    simba.sleep()    // Zzz...
    dumbo.trumpet()  // Trumpet!
    dumbo.spray()    // Spraying water!
}` },
        { n: 14, section: "Właściwości", slide: "Podstawowy przykład", mode: "run", lesson: "constructors",
          code: `class Cup {
    var percentFull = 0
}

fun main() {
    val c1 = Cup()
    c1.percentFull = 50

    val c2 = Cup()
    c2.percentFull = 100

    println(c1.percentFull)  // 50
    println(c2.percentFull)  // 100
}` },
        { n: 15, section: "Właściwości", slide: "Metody używające właściwości", mode: "run", lesson: "constructors",
          code: `class Cup2 {
    var percentFull = 0
    fun fill() {
        percentFull = 100
    }
    fun drain() {
        percentFull = 0
    }
}

fun main() {
    val cup = Cup2()
    cup.fill(); println(cup.percentFull)  // 100
    cup.drain(); println(cup.percentFull)  // 0
}` },
        { n: 16, section: "Właściwości", slide: "Właściwości z typami jawnie określonymi", mode: "run", lesson: "constructors",
          code: `class Student {
    var name: String = ""
    var age: Int = 0
    var gpa: Double = 0.0
}

fun main() {
    val student = Student()
    student.name = "Anna Kowalska"
    student.age = 20
    student.gpa = 4.5

    println("\${student.name}, \${student.age} lat")
}` },
        { n: 17, section: "Właściwości", slide: "Przykład: Klasa Rectangle", mode: "run", lesson: "constructors",
          code: `class Rectangle {
    var width: Int = 0; var height: Int = 0
    fun area(): Int {
        return width * height
    }
    fun perimeter(): Int {
        return 2 * (width + height)
    }
}

fun main() {
    val rect = Rectangle()
    rect.width = 5; rect.height = 3
    println("Pole: \${rect.area()}")       // Pole: 15
    println("Obwód: \${rect.perimeter()}")  // Obwód: 16
}` },
        { n: 18, section: "Właściwości", slide: "Wiele właściwości w klasie", mode: "decl", lesson: "constructors",
          code: `class Book {
    var title: String = ""
    var author: String = ""
    var pages: Int = 0
    var currentPage: Int = 0

    fun read(pagesRead: Int) {
        currentPage += pagesRead
        if (currentPage > pages) {
            currentPage = pages
        }
    }

    fun isFinished(): Boolean {
        return currentPage >= pages
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 19, section: "Właściwości", slide: "Wiele właściwości w klasie", mode: "run", lesson: "constructors",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class Book {
    var title: String = ""
    var author: String = ""
    var pages: Int = 0
    var currentPage: Int = 0

    fun read(pagesRead: Int) {
        currentPage += pagesRead
        if (currentPage > pages) {
            currentPage = pages
        }
    }

    fun isFinished(): Boolean {
        return currentPage >= pages
    }
}

//sampleStart
fun main() {
    val book = Book()
    book.title = "Atomic Kotlin"
    book.author = "Bruce Eckel"
    book.pages = 500
    book.read(250)
    println(book.currentPage)  // 250
    println(book.isFinished()) // false
}
//sampleEnd` },
        { n: 20, section: "Konstruktory", slide: "Najprostszy konstruktor", mode: "run", lesson: "constructors",
          code: `class Wombat

fun main() {
    val wombat = Wombat()
}` },
        { n: 21, section: "Konstruktory", slide: "Konstruktor z parametrami", mode: "run", lesson: "constructors",
          code: `class Alien(name: String) {
    val greeting = "Poor $name!"
}

fun main() {
    val alien = Alien("Mr. Meeseeks")
    println(alien.greeting)  // Poor Mr. Meeseeks!

    // alien.name // BŁĄD -- name nie jest dostępne
}` },
        { n: 22, section: "Konstruktory", slide: "Parametry jako właściwości", mode: "run", lesson: "constructors",
          code: `class MutableNameAlien(var name: String)
class FixedNameAlien(val name: String)

fun main() {
    val alien1 = MutableNameAlien("Reverse Giraffe")
    val alien2 = FixedNameAlien("Krombopolis Michael")

    alien1.name = "Parasite"  // OK
    // alien2.name = "Parasite" // BŁĄD -- val

    println(alien1.name)  // Parasite
    println(alien2.name)  // Krombopolis Michael
}` },
        { n: 23, section: "Konstruktory", slide: "var vs val w parametrach konstruktora", mode: "wrap", lesson: "constructors",
          code: `fun main() {
//sampleStart
class Person(var name: String)
val p = Person("Jan")
p.name = "Anna"  // OK
//sampleEnd
}` },
        { n: 24, section: "Konstruktory", slide: "var vs val w parametrach konstruktora", mode: "wrap", lesson: "constructors",
          code: `fun main() {
//sampleStart
class Person(val name: String)
val p = Person("Jan")
// p.name = "Anna" // BŁĄD
//sampleEnd
}` },
        { n: 25, section: "Konstruktory", slide: "var vs val w parametrach konstruktora", mode: "decl", lesson: "constructors",
          code: `class Person(name: String) {
    // name dostępne tylko w konstruktorze
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 26, section: "Konstruktory", slide: "Wiele parametrów konstruktora", mode: "run", lesson: "constructors",
          code: `class AlienSpecies(
    val name: String,
    val eyes: Int,
    val hands: Int,
    val legs: Int
) {
    fun describe() = "$name with $eyes eyes, $hands hands and $legs legs"
}

fun main() {
    val kevin = AlienSpecies("Zigerion", 2, 2, 2)
    val mortyJr = AlienSpecies("Gazorpian", 2, 6, 2)

    println(kevin.describe())
    println(mortyJr.describe())
}` },
        { n: 27, section: "Konstruktory", slide: "Formatowanie wielu parametrów", mode: "frag", lesson: "constructors",
          code: `class MyClass(
    val param1: Type1,
    val param2: Type2,
    val param3: Type3
) {
    // Ciało klasy
}` },
        { n: 28, section: "Konstruktory", slide: "toString() – reprezentacja tekstowa", mode: "run", lesson: "constructors",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class AlienSpecies(
    val name: String,
    val eyes: Int,
    val hands: Int,
    val legs: Int
) {
    fun describe() = "$name with $eyes eyes, $hands hands and $legs legs"
}

//sampleStart
fun main() {
    val krombopulos = AlienSpecies("Gromflomite", 2, 2, 2)
    println(krombopulos)
    // AlienSpecies@4d7e1886
}
//sampleEnd` },
        { n: 29, section: "Konstruktory", slide: "toString() – reprezentacja tekstowa", mode: "run", lesson: "constructors",
          code: `class Scientist(val name: String) {
    override fun toString(): String {
        return "Scientist('$name')"
    }
}

fun main() {
    val zeep = Scientist("Zeep Xanflorp"); println(zeep)
}` },
        { n: 30, section: "Konstruktory", slide: "Ciało konstruktora", mode: "run", lesson: "constructors",
          code: `class Badger(id: String, years: Int) {
    val name = id
    val age = years
    init { // Kod wykonywany przy tworzeniu obiektu
        println("Tworzę borsuka: $name, wiek $age")
    }
    override fun toString(): String {
        return "Badger: $name, age: $age"
    }
}

fun main() {
    val bob = Badger("Bob", 11) // Tworzę borsuka: Bob, wiek 11
    println(bob)  // Badger: Bob, age: 11
}` },
        { n: 31, section: "Konstruktory", slide: "Błędne dane w konstruktorze: `throw`", mode: "run", lesson: "constructors",
          code: `class Temperature(val kelvin: Double) {
    init {
        if (kelvin < 0.0)
            throw IllegalArgumentException("Poniżej zera bezwzględnego: $kelvin")
    }
}

fun main() {
    println(Temperature(300.0).kelvin)   // 300.0
    Temperature(-5.0)
    // IllegalArgumentException: Poniżej zera bezwzględnego: -5.0
}` },
        { n: 32, section: "Konstruktory", slide: "Przykład: Klasa Person", mode: "run", lesson: "constructors",
          code: `class Person(val firstName: String, val lastName: String, var age: Int) {
    fun fullName() = "$firstName $lastName"
    fun haveBirthday() {
        age++
        println("$firstName ma teraz $age lat")
    }
    override fun toString() =
        "Person($firstName $lastName, $age)"
}

fun main() {
    val person = Person("Anna", "Kowalska", 25)
    println(person.fullName())  // Anna Kowalska
    person.haveBirthday()       // Anna ma teraz 26 lat
    println(person)             // Person(Anna Kowalska, 26)
}` },
        { n: 33, section: "Równość obiektów", slide: "Równość obiektów: `==` i `===`", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class Point(val x: Int, val y: Int)

val p1 = Point(1, 2)
val p2 = Point(1, 2)
println(p1 == p2)    // false -- domyślne equals porównuje tożsamość
println(p1 === p2)   // false -- to dwa różne obiekty
println(p1 === p1)   // true
//sampleEnd
}` },
        { n: 34, section: "Równość obiektów", slide: "Zwykła klasa: `equals` bez `hashCode`", mode: "run", lesson: null,
          code: `class Point(val x: Int, val y: Int) {
    override fun equals(other: Any?) =
        other is Point && x == other.x && y == other.y
    // brak hashCode()!
}

fun main() {
    println(Point(1, 2) == Point(1, 2))               // true
    println(hashSetOf(Point(1, 2)).contains(Point(1, 2))) // false (zwykle)
}` },
        { n: 35, section: "Równość obiektów", slide: "Pytanie kontrolne: równość obiektów", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class Point(val x: Int, val y: Int)
println(Point(1, 2) == Point(1, 2))
//sampleEnd
}` },
        { n: 36, section: "Ograniczanie widoczności", slide: "private w klasie", mode: "decl", lesson: "visibility",
          code: `class JetPack {
    private var fuel = 0.0  // [1]
    private var warning = false  // [1]

    private fun burn() {  // [2]
        if (fuel > 0) {
            fuel--
            println("Spalanie paliwa")
        }
    }

    fun fly() {  // [3]
        burn()
    }

    fun check() {  // [4]
        if (fuel < 0.2) {
            warning = true
        }
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 37, section: "Ograniczanie widoczności", slide: "Enkapsulacja", mode: "run", lesson: "visibility",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class JetPack {
    private var fuel = 0.0  // [1]
    private var warning = false  // [1]

    private fun burn() {  // [2]
        if (fuel > 0) {
            fuel--
            println("Spalanie paliwa")
        }
    }

    fun fly() {  // [3]
        burn()
    }

    fun check() {  // [4]
        if (fuel < 0.2) {
            warning = true
        }
    }
}

//sampleStart
fun main() {
    val jetPack = JetPack()

    jetPack.fly()      // OK
    jetPack.check()    // OK

    // jetPack.fuel    // BŁĄD -- private
    // jetPack.burn()  // BŁĄD -- private
}
//sampleEnd` },
        { n: 38, section: "Ograniczanie widoczności", slide: "private na poziomie pliku", mode: "frag", lesson: "visibility",
          code: `// File: Boxes.kt
package summary2
private var count = 0  // [1]
private class Box(val dimension: Int) {  // [2]
    fun volume() = dimension * dimension * dimension
    override fun toString() = "Box($dimension)"
}

private fun incrementCount() {  // [3]
    count++
}

fun main() {
    incrementCount()  // OK - w tym samym pliku
    val box = Box(5)  // OK
    println(box.volume())
}` },
        { n: 39, section: "Ograniczanie widoczności", slide: "internal – widoczność w module", mode: "frag", lesson: "visibility",
          code: `// W module A
internal class InternalClass {
    internal fun internalMethod() {
        println("Dostępne w module")
    }
}

internal val internalValue = 42

// W module B
// val x = InternalClass()  // BŁĄD` },
        { n: 40, section: "Pakiety", slide: "Deklaracja pakietu", mode: "frag", lesson: null,
          code: `// File: ALibrary.kt
package com.yoururl.libraryname

fun f() = "result"` },
        { n: 41, section: "Pakiety", slide: "Import pakietów", mode: "frag", lesson: null,
          code: `// File: UseALibrary.kt
import com.yoururl.libraryname.*

fun main() {
    val x = f()
}` },
        { n: 42, section: "Pakiety", slide: "Importy specyficzne", mode: "run", lesson: null,
          code: `import kotlin.math.*

//sampleStart
// Import całego pakietu

fun main() {
    println(PI)
    println(cos(PI))
}
//sampleEnd` },
        { n: 43, section: "Pakiety", slide: "Importy specyficzne", mode: "run", lesson: null,
          code: `import kotlin.math.PI
import kotlin.math.cos

//sampleStart
// Import konkretnych elementów

fun main() {
    println(PI)
    println(cos(PI))
}
//sampleEnd` },
        { n: 44, section: "Pakiety", slide: "Alias dla importów", mode: "run", lesson: null,
          code: `import kotlin.math.PI as circleRatio
import kotlin.math.cos as cosine

//sampleStart
fun main() {
    println(circleRatio)       // 3.141592...
    println(cosine(circleRatio))  // -1.0
}
//sampleEnd` },
        { n: 45, section: "Pakiety", slide: "Pełne kwalifikowanie", mode: "run", lesson: null,
          code: `fun main() {
    println(kotlin.math.PI)
    println(kotlin.math.cos(kotlin.math.PI))
}` },
        { n: 46, section: "Diagramy klas UML", slide: "Kotlin → UML", mode: "decl", lesson: null,
          code: `class Student(
    val id: String,
    var firstName: String,
) {
    var grade: Int = 2
        private set
    fun describe(): String = "..."
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` }
    ]
});
