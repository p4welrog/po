// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "IVa",
    title: "Tajniki programowania obiektowego w Kotlinie I",
    examples: [
        { n: 1, section: "Interfejsy", slide: "Podstawowy przykład interfejsu", mode: "decl", lesson: "interfaces",
          code: `interface Computer {
    fun prompt(): String
    fun calculateAnswer(): Int
}

class Desktop : Computer {
    override fun prompt() = "Hello!"
    override fun calculateAnswer() = 11
}

class DeepThought : Computer {
    override fun prompt() = "Thinking..."
    override fun calculateAnswer() = 42
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 2, section: "Interfejsy", slide: "Właściwości w interfejsach", mode: "decl", lesson: "interfaces",
          code: `interface Player {
    val symbol: Char
}

class Food : Player {
    override val symbol = '.'
}

class Robot : Player {
    override val symbol get() = 'R'
}

class Wall(override val symbol: Char) : Player

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 3, section: "Interfejsy", slide: "Domyślne implementacje w interfejsach", mode: "decl", lesson: "interfaces",
          code: `interface Device {
    val model: String
    val productionYear: Int

    fun overpriced() = model.startsWith("i")
    fun outdated() = productionYear < 2050
}

class MyDevice(
    override val model: String,
    override val productionYear: Int
): Device

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 4, section: "Interfejsy", slide: "Wielodziedziczenie interfejsów", mode: "decl", lesson: "interfaces",
          code: `interface Animal
interface Mammal: Animal
interface AquaticAnimal: Animal

class Dolphin : Mammal, AquaticAnimal

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 5, section: "Interfejsy", slide: "Kolizje sygnatur", mode: "decl", lesson: "interfaces",
          code: `interface A {
    fun f() = 1
    fun g() = "A.g"
}

interface B {
    fun f() = 2
    fun g() = "B.g"
}

class C : A, B {
    override fun f() = 0
    override fun g() = super<A>.g()
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 6, section: "Interfejsy", slide: "Lambdy w pigułce", mode: "wrap", lesson: "interfaces",
          code: `fun main() {
//sampleStart
val square: (Int) -> Int = { x -> x * x }
println(square(4))                       // 16

val names = listOf("Ala", "Ola", "Ewa")
names.forEach { println(it) }            // it -- domyślna nazwa jedynego parametru
println(names.filter { it.startsWith("A") })   // [Ala]
//sampleEnd
}` },
        { n: 7, section: "Interfejsy", slide: "SAM (Single Abstract Method) interfejsy", mode: "run", lesson: "interfaces",
          code: `fun interface Action {
    fun act()
}

fun delayAction(action: Action) {
    println("Delaying...")
    action.act()
}

fun main() {
    delayAction { println("Hey!") }  // SAM conversion
}` },
        { n: 8, section: "Konstruktory", slide: "Konstruktory wtórne", mode: "decl", lesson: "constructors",
          code: `class WithSecondary(i: Int) {
    init {
        println("Primary: $i")
    }

    constructor(c: Char) : this(c - 'A') {
        println("Secondary: '$c'")
    }

    constructor(s: String) : this(s.first()) {
        println("Secondary: \\"$s\\"")
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 9, section: "Konstruktory", slide: "Przykład z wieloma konstruktorami", mode: "decl", lesson: "constructors",
          code: `enum class Material { Ceramic, Metal, Plastic }

class GardenItem(val name: String) {
    var material: Material = Material.Plastic

    constructor(name: String, material: Material)
        : this(name) {
        this.material = material
    }

    constructor(material: Material)
        : this("Strange Thing", material)
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 10, section: "Konstruktory", slide: "Domyślne argumenty zamiast przeciążania", mode: "run", lesson: "constructors",
          code: `class Point(val x: Int = 0, val y: Int = 0)

fun main() {
    val p1 = Point()           // x = 0, y = 0
    val p2 = Point(5)          // x = 5, y = 0
    val p3 = Point(5, 10)      // x = 5, y = 10
    val p4 = Point(y = 10)     // x = 0, y = 10
}` },
        { n: 11, section: "Konstruktory", slide: "Argumenty domyślne widziane z Javy: `@JvmOverloads`", mode: "decl", lesson: "constructors",
          code: `class Point @JvmOverloads constructor(val x: Int = 0, val y: Int = 0)

@JvmOverloads
fun greet(name: String, greeting: String = "Cześć") = "$greeting, $name!"

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 12, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Podstawowa składnia dziedziczenia", mode: "decl", lesson: "inheritance",
          code: `open class Base

class Derived : Base()

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 13, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Porównanie: Java vs Kotlin", mode: "decl", lesson: "inheritance",
          code: `open class Animal  // musi być open

class Dog : Animal()  // domyślnie final

// class Puppy : Dog()  // BŁĄD! Dog nie jest open

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 14, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Przykład: hierarchia naczelnych", mode: "run", lesson: "inheritance",
          code: `open class GreatApe {
    val weight = 100.0
    val age = 12
}

open class Bonobo : GreatApe()
class Chimpanzee : GreatApe()
class BonoboB : Bonobo()

fun GreatApe.info() = "wt: $weight age: $age"

fun main() {
    Bonobo().info()      // "wt: 100.0 age: 12"
    Chimpanzee().info()  // "wt: 100.0 age: 12"
}` },
        { n: 15, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Nadpisywanie metod", mode: "decl", lesson: "inheritance",
          code: `open class GreatApe {
    protected var energy = 0
    open fun call() = "Hoo!"
    open fun eat() { energy += 10 }
}

class Bonobo : GreatApe() {
    override fun call() = "Eep!"
    override fun eat() {
        energy += 10
        super.eat()  // wywołanie wersji z klasy bazowej
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 16, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Kolejność inicjalizacji", mode: "decl", lesson: "inheritance",
          code: `class Member(n: String) { init { println("Member $n") } }

open class Base {
    val a = Member("w Base")
    init { println("init Base") }
}
class Derived : Base() {
    val b = Member("w Derived")
    init { println("init Derived") }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 17, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Pułapka: metoda `open` w konstruktorze bazy", mode: "run", lesson: "inheritance",
          code: `open class Base {
    init { println("init Base: \${describe()}") }
    open fun describe() = "Base"
}
class Derived(val dept: String) : Base() {
    val bonus = 1500.0
    override fun describe() = "Derived(dept=$dept, bonus=$bonus)"
}

fun main() { Derived("IT") }   // init Base: Derived(dept=null, bonus=0.0)` },
        { n: 18, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Przekazywanie argumentów do konstruktora bazowego", mode: "run", lesson: "inheritance",
          code: `open class GreatApe(val weight: Double, val age: Int)

class Bonobo(weight: Double, age: Int)
    : GreatApe(weight, age)

class Chimpanzee(weight: Double, age: Int)
    : GreatApe(weight, age)

fun main() {
    val bonobo = Bonobo(110.0, 13)
    println("\${bonobo.weight} \${bonobo.age}")
}` },
        { n: 19, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Wywoływanie konstruktorów wtórnych", mode: "frag", lesson: "inheritance",
          code: `open class House(
    val address: String,
    val state: String,
    val zip: String
) {
    constructor(fullAddress: String)
        : this(/* przetwórz fullAddress */)
}

class VacationHouse(
    address: String, state: String, zip: String,
    val startMonth: String, val endMonth: String
) : House(address, state, zip)` },
        { n: 20, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Konstruktory wtórne w klasie pochodnej", mode: "run", lesson: "inheritance",
          code: `open class Base(val i: Int)

class Derived : Base {
    constructor(i: Int) : super(i)  // wywołanie Base
    constructor() : this(9)         // wywołanie Derived
}

fun main() {
    val d1 = Derived(11)  // d1.i == 11
    val d2 = Derived()    // d2.i == 9
}` },
        { n: 21, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Zasada podstawienia Liskov (LSP)", mode: "decl", lesson: "inheritance",
          code: `open class Rectangle(open var width: Int, open var height: Int) {
    fun area() = width * height
}

class Square(side: Int) : Rectangle(side, side) {
    private var side = side                  // kwadrat musi zostać kwadratem
    override var width: Int
        get() = side
        set(v) { side = v }
    override var height: Int
        get() = side
        set(v) { side = v }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 22, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "LSP – dlaczego `Square : Rectangle` łamie zasadę", mode: "wrap", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
open class Rectangle(open var width: Int, open var height: Int) {
    fun area() = width * height
}
class Square(side: Int) : Rectangle(side, side) {
    private var side = side                  // kwadrat musi zostać kwadratem
    override var width: Int
        get() = side
        set(v) { side = v }
    override var height: Int
        get() = side
        set(v) { side = v }
}

fun main() {
//sampleStart
fun stretch(r: Rectangle) {
    r.width = 10
    r.height = 2
    check(r.area() == 20)   // dla Rectangle: OK
}

stretch(Rectangle(1, 1))    // OK
stretch(Square(1))          // area() == 4 → IllegalStateException!
//sampleEnd
}` },
        { n: 23, section: "Dziedziczenie i inicjalizacja klasy bazowej", slide: "Pytanie kontrolne: dziedziczenie", mode: "wrap", lesson: "inheritance",
          code: `fun main() {
//sampleStart
open class A { open fun f() = "A" }
class B : A() { override fun f() = "B" }

val a: A = B()
println(a.f())
//sampleEnd
}` },
        { n: 24, section: "Klasy abstrakcyjne", slide: "Podstawowa składnia", mode: "decl", lesson: "inheritance",
          code: `abstract class WithProperty {
    abstract val x: Int
}

abstract class WithFunctions {
    abstract fun f(): Int
    abstract fun g(n: Double)
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 25, section: "Klasy abstrakcyjne", slide: "Implementacja klasy abstrakcyjnej", mode: "decl", lesson: "inheritance",
          code: `abstract class Animal {
    abstract val name: String
    abstract fun makeSound(): String

    fun describe() = "$name says: \${makeSound()}"
}

class Dog(override val name: String) : Animal() {
    override fun makeSound() = "Woof!"
}

class Cat(override val name: String) : Animal() {
    override fun makeSound() = "Meow"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 26, section: "Klasy abstrakcyjne", slide: "Klasy abstrakcyjne z konkretnymi metodami", mode: "run", lesson: "inheritance",
          code: `abstract class Character(val name: String) {
    abstract fun play(): String

    // Konkretna metoda
    fun introduce() = "I am $name"
}

class Warrior : Character("Warrior") {
    override fun play() = "Fight!"
}

fun main() {
    val warrior = Warrior()
    println(warrior.introduce())  // "I am Warrior"
    println(warrior.play())        // "Fight!"
}` },
        { n: 27, section: "Klasy abstrakcyjne", slide: "Porównanie: Java vs Kotlin", mode: "decl", lesson: "inheritance",
          code: `abstract class Person(val name: String) {
    abstract fun getDescription(): String
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 28, section: "Klasy abstrakcyjne", slide: "Stan w klasach abstrakcyjnych", mode: "decl", lesson: "inheritance",
          code: `abstract class BeverageContainer(val name: String) {
    protected var quantity: Int = 100

    abstract fun open(): String
    abstract fun recycle(): String

    fun drink(amount: Int) {
        quantity -= amount
        println("Pozostało: $quantity")
    }
}

class SteelCan(name: String) : BeverageContainer(name) {
    override fun open() = "Pop Top"
    override fun recycle() = "Recycle Steel"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 29, section: "Klasy abstrakcyjne", slide: "Hierarchia klas abstrakcyjnych", mode: "decl", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
abstract class BeverageContainer(val name: String) {
    protected var quantity: Int = 100

    abstract fun open(): String
    abstract fun recycle(): String

    fun drink(amount: Int) {
        quantity -= amount
        println("Pozostało: $quantity")
    }
}

//sampleStart
abstract class Bottle : BeverageContainer("Bottle") {
    override fun open() = "Remove Cap"
}

class GlassBottle : Bottle() {
    override fun recycle() = "Recycle Glass"
}

abstract class PlasticBottle : Bottle()

class PETBottle : PlasticBottle() {
    override fun recycle() = "Recycle PET"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 30, section: "Klasy abstrakcyjne", slide: "Metody z implementacją wywołujące abstrakcyjne", mode: "split", lesson: "inheritance",
          code: `interface Parent {
    val ch: Char
    fun f(): Int
    fun g() = "ch = $ch; f() = \${f()}"
}

class Actual(override val ch: Char) : Parent {
    override fun f() = 17
}

fun main() {
Actual('A').g()  // "ch = A; f() = 17"
}` },
        { n: 31, section: "Klasy abstrakcyjne", slide: "Wzorzec Metoda szablonowa (Template Method)", mode: "decl", lesson: "inheritance",
          code: `abstract class Exporter {
    // metoda szablonowa (domyślnie final)
    fun export(rows: List<List<String>>): String =
        header() + rows.joinToString("") { row(it) } + footer()

    protected abstract fun row(cells: List<String>): String  // krok obowiązkowy
    protected open fun header() = ""                         // haki: kroki
    protected open fun footer() = ""                         // opcjonalne
}

class CsvExporter : Exporter() {
    override fun row(cells: List<String>) = cells.joinToString(";") + "\\n"
}

class HtmlExporter : Exporter() {
    override fun header() = "<table>\\n"
    override fun row(cells: List<String>) =
        cells.joinToString("", "<tr>", "</tr>\\n") { "<td>$it</td>" }
    override fun footer() = "</table>"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 32, section: "Klasy abstrakcyjne", slide: "Metoda szablonowa – po co?", mode: "wrap", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
abstract class Exporter {
    // metoda szablonowa (domyślnie final)
    fun export(rows: List<List<String>>): String =
        header() + rows.joinToString("") { row(it) } + footer()

    protected abstract fun row(cells: List<String>): String  // krok obowiązkowy
    protected open fun header() = ""                         // haki: kroki
    protected open fun footer() = ""                         // opcjonalne
}
class CsvExporter : Exporter() {
    override fun row(cells: List<String>) = cells.joinToString(";") + "\\n"
}
class HtmlExporter : Exporter() {
    override fun header() = "<table>\\n"
    override fun row(cells: List<String>) =
        cells.joinToString("", "<tr>", "</tr>\\n") { "<td>$it</td>" }
    override fun footer() = "</table>"
}

fun main() {
//sampleStart
val rows = listOf(listOf("Kawa", "12.50"), listOf("Herbata", "9.00"))
println(CsvExporter().export(rows))    // Kawa;12.50 / Herbata;9.00
println(HtmlExporter().export(rows))   // <table> <tr><td>Kawa</td>... </table>
//sampleEnd
}` },
        { n: 33, section: "Rzutowanie w górę (upcasting)", slide: "Podstawowy przykład rzutowania w górę", mode: "decl", lesson: "inheritance",
          code: `interface Shape {
    fun draw(): String
    fun erase(): String
}

class Circle : Shape {
    override fun draw() = "Circle.draw"
    override fun erase() = "Circle.erase"
}

class Square : Shape {
    override fun draw() = "Square.draw"
    override fun erase() = "Square.erase"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 34, section: "Rzutowanie w górę (upcasting)", slide: "Wykorzystanie rzutowania w górę", mode: "run", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Shape {
    fun draw(): String
    fun erase(): String
}
class Circle : Shape {
    override fun draw() = "Circle.draw"
    override fun erase() = "Circle.erase"
}
class Square : Shape {
    override fun draw() = "Square.draw"
    override fun erase() = "Square.erase"
}
class Triangle : Shape {
    override fun draw() = "Triangle.draw"
    override fun erase() = "Triangle.erase"
}

//sampleStart
fun show(shape: Shape) {
    println("Show: \${shape.draw()}")
}

fun main() {
    val shapes = listOf(Circle(), Square(), Triangle())
    shapes.forEach(::show)
    // Show: Circle.draw
    // Show: Square.draw
    // Show: Triangle.draw
}
//sampleEnd` },
        { n: 35, section: "Rzutowanie w górę (upcasting)", slide: "Utrata informacji przy rzutowaniu w górę", mode: "run", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Shape {
    fun draw(): String
    fun erase(): String
}

//sampleStart
class Circle : Shape {
    override fun draw() = "Circle.draw"
    override fun erase() = "Circle.erase"
    fun radius() = 5.0  // specyficzna dla Circle
}

fun processShape(shape: Shape) {
    shape.draw()  // OK
    // shape.radius()  // BŁĄD! Shape nie ma radius()
}

fun main() {
    val circle = Circle()
    circle.radius()  // OK - widzimy typ Circle
    processShape(circle)  // rzutowanie w górę do Shape
}
//sampleEnd` },
        { n: 36, section: "Rzutowanie w górę (upcasting)", slide: "Rzutowanie w górę w kolekcjach", mode: "run", lesson: "inheritance",
          code: `interface Pet {
    fun speak(): String
}

class Dog : Pet {
    override fun speak() = "Woof!"
    fun wagTail() = "Wagging..."
}

class Cat : Pet {
    override fun speak() = "Meow"
}

fun main() {
    val pets: List<Pet> = listOf(Dog(), Cat(), Dog())
    pets.forEach { println(it.speak()) }
    // Woof!
    // Meow
    // Woof!
}` },
        { n: 37, section: "Rzutowanie w górę (upcasting)", slide: "Wariancja: czy `List<Circle>` to `List<Shape>`?", mode: "wrap", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Shape {
    fun draw(): String
    fun erase(): String
}
class Square : Shape {
    override fun draw() = "Square.draw"
    override fun erase() = "Square.erase"
}
class Circle : Shape {
    override fun draw() = "Circle.draw"
    override fun erase() = "Circle.erase"
    fun radius() = 5.0  // specyficzna dla Circle
}

fun main() {
//sampleStart
val circles: List<Circle> = listOf(Circle(), Circle())
val shapes: List<Shape> = circles              // OK

val mCircles: MutableList<Circle> = mutableListOf(Circle())
// val mShapes: MutableList<Shape> = mCircles  // błąd kompilacji!
// mShapes.add(Square())                       // ...bo to by zepsuło listę kół
//sampleEnd
}` },
        { n: 38, section: "Rzutowanie w górę (upcasting)", slide: "Wariancja: `out` i `in`", mode: "decl", lesson: "inheritance",
          code: `interface Producer<out T> { fun produce(): T }        // T tylko na wyjściu
interface Consumer<in T>  { fun consume(item: T) }    // T tylko na wejściu

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 39, section: "Rzutowanie w górę (upcasting)", slide: "Porównanie z Javą: jawne vs niejawne", mode: "wrap", lesson: "inheritance",
          code: `fun main() {
//sampleStart
open class Animal
class Dog : Animal()

fun process(animal: Animal) { }

val dog = Dog()
process(dog)  // niejawne rzutowanie w górę
val animal: Animal = dog  // niejawne rzutowanie w górę
//sampleEnd
}` },
        { n: 40, section: "Rzutowanie w górę (upcasting)", slide: "Rzutowanie w górę a funkcje rozszerzające", mode: "decl", lesson: "inheritance",
          code: `open class Animal
class Dog : Animal()
class Cat : Animal()

fun Dog.sound() = "Woof!"
fun Cat.sound() = "Meow"

fun makeSound(animal: Animal) {
    // animal.sound()  // BŁĄD! Funkcje rozszerzające
                       // nie są polimorficzne
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 41, section: "Rzutowanie w górę (upcasting)", slide: "Kiedy stosować rzutowanie w górę?", mode: "decl", lesson: "inheritance",
          code: `interface Drawable {
    fun draw()
}

fun render(items: List<Drawable>) {
    items.forEach { it.draw() }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 42, section: "Rzutowanie w górę (upcasting)", slide: "Pytanie kontrolne: wariancja", mode: "frag", lesson: "inheritance",
          code: `val a: List<Shape> = listOf<Circle>()
val b: MutableList<Shape> = mutableListOf<Circle>()` },
        { n: 43, section: "Polimorfizm", slide: "Podstawowy przykład polimorfizmu", mode: "run", lesson: "inheritance",
          code: `open class Pet {
    open fun speak() = "Pet"
}

class Dog : Pet() {
    override fun speak() = "Bark!"
}

class Cat : Pet() {
    override fun speak() = "Meow"
}

fun talk(pet: Pet) = pet.speak()

fun main() {
    println(talk(Dog()))  // "Bark!"
    println(talk(Cat()))  // "Meow"
}` },
        { n: 44, section: "Polimorfizm", slide: "Złożony przykład: gra fantasy (1)", mode: "decl", lesson: "inheritance",
          code: `abstract class Character(val name: String) {
    abstract fun play(): String
}

interface Fighter {
    fun fight() = "Fight!"
}

interface Magician {
    fun doMagic() = "Magic!"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 45, section: "Polimorfizm", slide: "Złożony przykład: gra fantasy (2)", mode: "decl", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
abstract class Character(val name: String) {
    abstract fun play(): String
}
interface Fighter {
    fun fight() = "Fight!"
}
interface Magician {
    fun doMagic() = "Magic!"
}

//sampleStart
class Warrior : Character("Warrior"), Fighter {
    override fun play() = fight()
}

open class Elf : Character("Elf"), Magician {
    override fun play() = doMagic()
}

class FightingElf : Elf(), Fighter {
    override fun play() = super.play() + fight()
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 46, section: "Polimorfizm", slide: "Polimorficzne wywołania", mode: "run", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
abstract class Character(val name: String) {
    abstract fun play(): String
}
interface Fighter {
    fun fight() = "Fight!"
}
interface Magician {
    fun doMagic() = "Magic!"
}
class Warrior : Character("Warrior"), Fighter {
    override fun play() = fight()
}
open class Elf : Character("Elf"), Magician {
    override fun play() = doMagic()
}
class FightingElf : Elf(), Fighter {
    override fun play() = super.play() + fight()
}

//sampleStart
fun Character.playTurn() =
    println("$name: \${play()}")

fun main() {
    val characters: List<Character> = listOf(
        Warrior(), Elf(), FightingElf()
    )

    characters.forEach { it.playTurn() }
    // Warrior: Fight!
    // Elf: Magic!
    // FightingElf: Magic!Fight!
}
//sampleEnd` },
        { n: 47, section: "Polimorfizm", slide: "Problem: sprawdzanie typów zamiast polimorfizmu", mode: "decl", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Shape {
    fun draw(): String
    fun erase(): String
}
class Square : Shape {
    override fun draw() = "Square.draw"
    override fun erase() = "Square.erase"
}
class Circle : Shape {
    override fun draw() = "Circle.draw"
    override fun erase() = "Circle.erase"
    fun radius() = 5.0  // specyficzna dla Circle
}

//sampleStart
fun turn(shape: Shape): String = when(shape) {
    is Circle -> "Circle: Rotate"
    is Square -> "Square: Rotate"
    else -> ""
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 48, section: "Polimorfizm", slide: "Problem: sprawdzanie typów zamiast polimorfizmu", mode: "decl", lesson: "inheritance",
          code: `interface Shape {
    fun turn(): String
}

class Circle : Shape { override fun turn() = "Circle: Rotate" }
class Square : Shape { override fun turn() = "Square: Rotate" }

fun turn(shape: Shape) = shape.turn()

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 49, section: "Polimorfizm", slide: "Polimorfizm a rozszerzalność", mode: "run", lesson: "inheritance",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Shape {
    fun turn(): String
}
class Circle : Shape { override fun turn() = "Circle: Rotate" }
class Square : Shape { override fun turn() = "Square: Rotate" }
fun turn(shape: Shape) = shape.turn()

//sampleStart
class Triangle : Shape {
    override fun turn() = "Triangle: Rotate"
}

fun main() {
    val shapes = listOf(Circle(), Square(), Triangle())
    shapes.forEach { println(it.turn()) }
    // automatycznie działa dla Triangle!
}
//sampleEnd` },
        { n: 50, section: "Polimorfizm", slide: "Polimorfizm w praktyce", mode: "decl", lesson: "inheritance",
          code: `interface Renderer {
    fun render(text: String)
}

class ConsoleRenderer : Renderer {
    override fun render(text: String) =
        println("Console: $text")
}

class HTMLRenderer : Renderer {
    override fun render(text: String) =
        println("<p>$text</p>")
}

fun display(renderer: Renderer, message: String) {
    renderer.render(message)
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 51, section: "Polimorfizm", slide: "Przeciążanie a nadpisywanie", mode: "wrap", lesson: "inheritance",
          code: `fun main() {
//sampleStart
open class Animal { open fun sound() = "..." }
class Dog : Animal() { override fun sound() = "Hau" }

fun label(a: Animal) = "zwierzę"
fun label(d: Dog) = "pies"

val a: Animal = Dog()
println(label(a))     // zwierzę -- przeciążenie
println(a.sound())    // Hau     -- nadpisanie
//sampleEnd
}` },
        { n: 52, section: "Polimorfizm", slide: "Koszt polimorfizmu", mode: "decl", lesson: "inheritance",
          code: `open class Base {
    open fun method() { }
}

class Derived : Base() {              // klasy są domyślnie final
    override fun method() { }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 53, section: "Kompozycja", slide: "Podstawowy przykład kompozycji", mode: "decl", lesson: null,
          code: `interface Building
interface Kitchen

interface House : Building {
    val kitchen: Kitchen
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 54, section: "Kompozycja", slide: "Podstawowy przykład kompozycji", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Building
interface Kitchen

//sampleStart
interface House : Building {
    val kitchens: List<Kitchen>  // wiele kuchni
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 55, section: "Kompozycja", slide: "Kompozycja w praktyce: samochód", mode: "decl", lesson: null,
          code: `class Engine {
    fun start() = println("Engine start")
    fun stop() = println("Engine stop")
}

class Wheel {
    fun inflate(psi: Int) = println("Inflate($psi)")
}

class Window(val side: String) {
    fun rollUp() = println("$side window up")
}

class Door(val side: String) {
    val window = Window(side)
    fun open() = println("$side door open")
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 56, section: "Kompozycja", slide: "Samochód jako kompozycja", mode: "run", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class Engine {
    fun start() = println("Engine start")
    fun stop() = println("Engine stop")
}
class Wheel {
    fun inflate(psi: Int) = println("Inflate($psi)")
}
class Window(val side: String) {
    fun rollUp() = println("$side window up")
}
class Door(val side: String) {
    val window = Window(side)
    fun open() = println("$side door open")
}

//sampleStart
class Car {
    val engine = Engine()
    val wheels = List(4) { Wheel() }
    val leftDoor = Door("left")
    val rightDoor = Door("right")
}

fun main() {
    val car = Car()
    car.leftDoor.open()
    car.rightDoor.window.rollUp()
    car.wheels[0].inflate(72)
    car.engine.start()
}
//sampleEnd` },
        { n: 57, section: "Kompozycja", slide: "Ukrywanie implementacji przez kompozycję", mode: "decl", lesson: null,
          code: `class Features {
    fun f1() = "feature1"
    fun f2() = "feature2"
}

class Form {
    private val features = Features()

    fun operation1() = features.f2() + features.f1()
    fun operation2() = features.f1() + features.f2()
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 58, section: "Kompozycja", slide: "Zapowiedź: delegacja klas", mode: "frag", lesson: null,
          code: `class ExplicitControls : Controls {
    private val controls = SpaceShipControls()
    override fun forward(velocity: Int) = controls.forward(velocity)
    override fun back(velocity: Int) = controls.back(velocity)
    // ... i tak dla każdej metody interfejsu
}` },
        { n: 59, section: "Kompozycja", slide: "Wzorzec Strategia: komponowanie zachowań", mode: "run", lesson: null,
          code: `interface Logger {
    fun log(msg: String)
}

class ConsoleLogger : Logger {
    override fun log(msg: String) = println(msg)
}

class Service(private val logger: Logger) {
    fun process(data: String) {
        logger.log("Processing: $data")
        // ...
    }
}

fun main() {
    val service = Service(ConsoleLogger())
    service.process("data")
}` },
        { n: 60, section: "Kompozycja", slide: "Strategia z lambdą", mode: "run", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
fun process(animal: Animal) { }
fun Cat.sound() = "Meow"
open class Pet {
    open fun speak() = "Pet"
}
class Cat : Pet() {
    override fun speak() = "Meow"
}
open class Animal { open fun sound() = "..." }

//sampleStart
class Service(private val log: (String) -> Unit) {
    fun process(data: String) {
        log("Processing: $data")
    }
}

fun main() {
    Service { println(it) }.process("a")            // na konsolę
    Service { File("log.txt").appendText(it) }.process("b")  // do pliku
}
//sampleEnd` },
        { n: 61, section: "Kompozycja", slide: "Wzorzec Polecenie (Command)", mode: "frag", lesson: null,
          code: `interface Command {
    val label: String
    fun execute()
}

class AddProductCommand(private val service: ProductService) : Command {
    override val label = "Dodaj produkt"
    override fun execute() { /* wczytaj dane, service.add(...) */ }
}

class ListProductsCommand(private val service: ProductService) : Command {
    override val label = "Pokaż produkty"
    override fun execute() = service.all().forEach(::println)
}` },
        { n: 62, section: "Kompozycja", slide: "Polecenie: menu z obiektów", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
fun Cat.sound() = "Meow"
open class Pet {
    open fun speak() = "Pet"
}
class Cat : Pet() {
    override fun speak() = "Meow"
}
open class Animal { open fun sound() = "..." }
class Dog : Animal() { override fun sound() = "Hau" }
fun label(d: Dog) = "pies"
interface Command {
    val label: String
    fun execute()
}

//sampleStart
class Menu(private val commands: List<Command>) {
    fun run() {
        while (true) {
            commands.forEachIndexed { i, c -> println("\${i + 1}. \${c.label}") }
            println("0. Wyjście")
            val choice = readLine()?.toIntOrNull() ?: continue
            if (choice == 0) return
            commands.getOrNull(choice - 1)?.execute() ?: println("Nieznana opcja")
        }
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 63, section: "Kompozycja", slide: "Polecenie z lambdą", mode: "frag", lesson: null,
          code: `data class MenuItem(val label: String, val action: () -> Unit)

val items = listOf(
    MenuItem("Pokaż produkty") { service.all().forEach(::println) },
    MenuItem("Wyczyść ekran") { repeat(30) { println() } },
)
items[0].action()      // wykonanie polecenia` },
        { n: 64, section: "Kompozycja", slide: "Wzorzec Repozytorium (Repository)", mode: "decl", lesson: null,
          code: `data class Product(val id: Int, val name: String)

interface ProductRepository {        // „kolekcja” obiektów domenowych
    fun findById(id: Int): Product?
    fun findAll(): List<Product>
    fun save(p: Product): Product
    fun delete(id: Int): Boolean
}

class InMemoryProductRepository : ProductRepository {
    private val items = mutableMapOf<Int, Product>()
    override fun findById(id: Int) = items[id]
    override fun findAll() = items.values.toList()
    override fun save(p: Product): Product { items[p.id] = p; return p }
    override fun delete(id: Int) = items.remove(id) != null
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 65, section: "Kompozycja", slide: "Repozytorium: warstwy aplikacji", mode: "wrap", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
data class Product(val id: Int, val name: String)
interface ProductRepository {        // „kolekcja” obiektów domenowych
    fun findById(id: Int): Product?
    fun findAll(): List<Product>
    fun save(p: Product): Product
    fun delete(id: Int): Boolean
}
class InMemoryProductRepository : ProductRepository {
    private val items = mutableMapOf<Int, Product>()
    override fun findById(id: Int) = items[id]
    override fun findAll() = items.values.toList()
    override fun save(p: Product): Product { items[p.id] = p; return p }
    override fun delete(id: Int) = items.remove(id) != null
}

fun main() {
//sampleStart
class ProductService(private val repo: ProductRepository) {
    fun all() = repo.findAll()
    fun add(p: Product) = repo.save(p)
    fun rename(id: Int, newName: String): Product {
        require(newName.isNotBlank()) { "Pusta nazwa" }
        val p = repo.findById(id)
            ?: throw NoSuchElementException("Brak produktu $id")
        return repo.save(p.copy(name = newName))
    }
}
val service = ProductService(InMemoryProductRepository())  // lub plik, baza...
//sampleEnd
}` },
        { n: 66, section: "Dla chętnych", slide: "Abstrakcja w interfejsach: `abstract` jest zbędne", mode: "decl", lesson: null,
          code: `interface Redundant {
    abstract val x: Int        // redundant
    abstract fun f(): Int      // redundant
    abstract fun g(n: Double)  // redundant
}

interface Removed {
    val x: Int        // to samo co wyżej
    fun f(): Int
    fun g(n: Double)
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` }
    ]
});
