// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "IVb",
    title: "Tajniki programowania obiektowego w Kotlinie II",
    examples: [
        { n: 1, section: "Dziedziczenie i rozszerzenia", slide: "Przypadek użycia: HVAC System", mode: "decl", lesson: null,
          code: `open class Heater {
    fun heat(temperature: Int) =
        "heating to $temperature"
}

// Zamiast dziedziczenia możemy użyć rozszerzeń
fun Heater.cool(temperature: Int) =
    "cooling to $temperature"

// Funkcje działają na wszystkich Heaterach
fun adjust(heater: Heater) {
    heater.heat(70)
    // Ale cool() nie jest dostępne przez polimorfizm
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 2, section: "Dziedziczenie i rozszerzenia", slide: "Wzorzec Adapter – Kontekst", mode: "decl", lesson: null,
          code: `interface LibType {
    fun f1()
    fun f2()
}
fun utility1(lt: LibType) {
    lt.f1()
    lt.f2()
}
fun utility2(lt: LibType) {
    lt.f2()
    lt.f1()
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 3, section: "Dziedziczenie i rozszerzenia", slide: "Adapter przez kompozycję – Implementacja", mode: "frag", lesson: null,
          code: `// MyClass -- klasa final z metodami g() i h()
class MyClassAdaptedForLib : LibType {
    val field = MyClass()  // Kompozycja!

    override fun f1() = field.h()
    override fun f2() = field.g()
}

fun main() {
    val mc = MyClassAdaptedForLib()

    utility1(mc)          // h() g()
    utility2(mc)          // g() h()
    useMyClass(mc.field)  // Dostęp przez pole!
    // Wypisze kolejno: h() g() g() h() g() h()
}` },
        { n: 4, section: "Delegacja klas", slide: "Delegacja bez wsparcia języka", mode: "decl", lesson: null,
          code: `interface Controls {
    fun forward(velocity: Int): String
    fun back(velocity: Int): String
    // ... więcej metod
}

class SpaceShipControls : Controls {
    override fun forward(velocity: Int) =
        "forward $velocity"
    override fun back(velocity: Int) =
        "back $velocity"
}

// Ręczna delegacja - dużo kodu!
class ManualDelegation : Controls {
    private val controls = SpaceShipControls()
    override fun forward(v: Int) = controls.forward(v)
    override fun back(v: Int) = controls.back(v)
    // ... delegacja wszystkich metod
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 5, section: "Delegacja klas", slide: "Delegacja ze słowem kluczowym `by`", mode: "decl", lesson: null,
          code: `interface Controls {
    fun forward(velocity: Int): String
    fun back(velocity: Int): String
    fun turboBoost(): String
}

class SpaceShipControls : Controls {
    override fun forward(v: Int) = "forward $v"
    override fun back(v: Int) = "back $v"
    override fun turboBoost() = "turbo boost"
}

// Automatyczna delegacja!
class DelegatedControls(
    private val controls: SpaceShipControls =
        SpaceShipControls()
): Controls by controls {
    // Możemy nadpisać wybrane metody
    override fun turboBoost() =
        "\${controls.turboBoost()}... boooooost!"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 6, section: "Delegacja klas", slide: "Przykład: Button z wieloma cechami", mode: "decl", lesson: null,
          code: `interface Rectangle {
    fun paint(): String
}

interface MouseManager {
    fun clicked(): Boolean
    fun hovering(): Boolean
}

class ButtonImage(val width: Int, val height: Int)
    : Rectangle {
    override fun paint() =
        "painting ButtonImage($width, $height)"
}

class UserInput : MouseManager {
    override fun clicked() = true
    override fun hovering() = true
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 7, section: "Delegacja klas", slide: "Button – delegacja do dwóch interfejsów", mode: "run", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Rectangle {
    fun paint(): String
}
interface MouseManager {
    fun clicked(): Boolean
    fun hovering(): Boolean
}
class ButtonImage(val width: Int, val height: Int)
    : Rectangle {
    override fun paint() =
        "painting ButtonImage($width, $height)"
}
class UserInput : MouseManager {
    override fun clicked() = true
    override fun hovering() = true
}

//sampleStart
class Button(
    val width: Int,
    val height: Int,
    var image: Rectangle = ButtonImage(width, height),
    private var input: MouseManager = UserInput()
): Rectangle by image, MouseManager by input

fun main() {
    val button = Button(10, 5)
    button.paint()      // z Rectangle
    button.clicked()    // z MouseManager
    button.hovering()   // z MouseManager

    // Można rzutować w górę na oba typy
    val rect: Rectangle = button
    val mouse: MouseManager = button
}
//sampleEnd` },
        { n: 8, section: "Rzutowanie w dół (Downcasting)", slide: "Problem: wąski interfejs bazowy", mode: "run", lesson: "sealed",
          code: `interface Base {
    fun f()
}

class Derived1 : Base {
    override fun f() {}
    fun g() {}  // Dodatkowa funkcja
}

class Derived2 : Base {
    override fun f() {}
    fun h() {}  // Inna dodatkowa funkcja
}

fun main() {
    val b1: Base = Derived1()  // rzutowanie w górę
    b1.f()    // OK
    // b1.g() // BŁĄD! g() nie jest w Base
}` },
        { n: 9, section: "Rzutowanie w dół (Downcasting)", slide: "Inteligentne rzutowanie – przykład", mode: "run", lesson: "sealed",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Base {
    fun f()
}
class Derived1 : Base {
    override fun f() {}
    fun g() {}  // Dodatkowa funkcja
}
class Derived2 : Base {
    override fun f() {}
    fun h() {}  // Inna dodatkowa funkcja
}

//sampleStart
fun main() {
    val b1: Base = Derived1()

    if (b1 is Derived1) {
        b1.g()  // Kompilator wie, że to Derived1
    }

    val b2: Base = Derived2()

    if (b2 is Derived2) {
        b2.h()  // rzutowanie do Derived2
    }
}
//sampleEnd` },
        { n: 10, section: "Rzutowanie w dół (Downcasting)", slide: "Inteligentne rzutowanie w `when`", mode: "run", lesson: "sealed",
          code: `interface Creature

class Human : Creature {
    fun greeting() = "I'm Human"
}

class Dog : Creature {
    fun bark() = "Yip!"
}

fun what(c: Creature): String =
    when (c) {
        is Human -> c.greeting()  // inteligentne rzutowanie
        is Dog -> c.bark()        // inteligentne rzutowanie
        else -> "Something else"
    }

fun main() {
    println(what(Human()))  // "I'm Human"
    println(what(Dog()))    // "Yip!"
}` },
        { n: 11, section: "Rzutowanie w dół (Downcasting)", slide: "Ograniczenia inteligentnego rzutowania", mode: "frag", lesson: "sealed",
          code: `class Box(var item: Any)
fun show(b: Box) {
    if (b.item is String) println(b.item.length)   // błąd: b.item to var
    val i = b.item                                 // rozwiązanie: lokalna kopia
    if (i is String) println(i.length)             // OK
}` },
        { n: 12, section: "Rzutowanie w dół (Downcasting)", slide: "Operator `as` – niebezpieczne rzutowanie", mode: "run", lesson: "sealed",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Creature
class Human : Creature {
    fun greeting() = "I'm Human"
}
class Dog : Creature {
    fun bark() = "Yip!"
}

//sampleStart
fun dogBarkUnsafe(c: Creature) =
    (c as Dog).bark()

fun main() {
    println(dogBarkUnsafe(Dog()))  // OK: "Yip!"

    try {
        dogBarkUnsafe(Human())  // ClassCastException!
    } catch (e: ClassCastException) {
        println("Błąd rzutowania!")
    }
}
//sampleEnd` },
        { n: 13, section: "Rzutowanie w dół (Downcasting)", slide: "Operator `as?` – bezpieczne rzutowanie", mode: "run", lesson: "sealed",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Creature
class Human : Creature {
    fun greeting() = "I'm Human"
}
class Dog : Creature {
    fun bark() = "Yip!"
}

//sampleStart
fun dogBarkSafe(c: Creature) =
    (c as? Dog)?.bark() ?: "Not a Dog"

fun main() {
    println(dogBarkSafe(Dog()))    // "Yip!"
    println(dogBarkSafe(Human()))  // "Not a Dog"
}
//sampleEnd` },
        { n: 14, section: "Rzutowanie w dół (Downcasting)", slide: "Znajdowanie typów w listach", mode: "wrap", lesson: "sealed",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Creature
class Human : Creature {
    fun greeting() = "I'm Human"
}
class Dog : Creature {
    fun bark() = "Yip!"
}

fun main() {
//sampleStart
val creatures = listOf(
    Human(), Human(), Dog(), Dog()
)

// find() z rzutowaniem
val dog = creatures.find { it is Dog } as Dog?
dog?.bark()

// Lepsze rozwiązanie: filterIsInstance()
val humans: List<Human> =
    creatures.filterIsInstance<Human>()

val dogs: List<Dog> =
    creatures.filterIsInstance<Dog>()

println(humans.size)  // 2
println(dogs.size)    // 2
//sampleEnd
}` },
        { n: 15, section: "Rzutowanie w dół (Downcasting)", slide: "Pytanie kontrolne: rzutowanie", mode: "wrap", lesson: "sealed",
          code: `fun main() {
//sampleStart
val x: Any = "abc"
println((x as? Int) ?: 0)
println(x as Int)
//sampleEnd
}` },
        { n: 16, section: "Klasy zapieczętowane (Sealed Classes)", slide: "Problem: otwarta hierarchia", mode: "decl", lesson: "sealed",
          code: `// Klasa otwarta - możliwe nieznane podklasy
open class Transport

data class Train(val line: String) : Transport()
data class Bus(val number: String,
               val capacity: Int) : Transport()

fun travel(transport: Transport) =
    when (transport) {
        is Train -> "Train \${transport.line}"
        is Bus -> "Bus \${transport.number}"
        // Wymagana klauzula else!
        else -> "$transport is in limbo!"
    }

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 17, section: "Klasy zapieczętowane (Sealed Classes)", slide: "Rozwiązanie: `sealed class`", mode: "decl", lesson: "sealed",
          code: `// Zapieczętowana hierarchia
sealed class Transport

data class Train(val line: String) : Transport()
data class Bus(val number: String,
               val capacity: Int) : Transport()

// Teraz when jest wyczerpujący bez else!
fun travel(transport: Transport) =
    when (transport) {
        is Train -> "Train \${transport.line}"
        is Bus -> "Bus \${transport.number}"
        // Brak else - kompilator wie, że to wszystkie typy
    }

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 18, section: "Klasy zapieczętowane (Sealed Classes)", slide: "`sealed interface`", mode: "decl", lesson: "sealed",
          code: `sealed interface Payment { val amount: Double }

data class Cash(override val amount: Double) : Payment
data class Card(override val amount: Double, val last4: String) : Payment

fun fee(p: Payment): Double = when (p) {      // bez else
    is Cash -> 0.0
    is Card -> p.amount * 0.015               // inteligentne rzutowanie: p.last4
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 19, section: "Klasy zapieczętowane (Sealed Classes)", slide: "Klasy zapieczętowane z różnymi danymi", mode: "run", lesson: "sealed",
          code: `sealed class Result<out T>

data class Success<T>(val value: T) : Result<T>()
data class Error(val message: String) : Result<Nothing>()
object Loading : Result<Nothing>()

fun <T> handleResult(result: Result<T>) {
    when (result) {
        is Success -> println("Sukces: \${result.value}")
        is Error -> println("Błąd: \${result.message}")
        is Loading -> println("Ładowanie...")
    }
}

fun main() {
    handleResult(Success(42))
    handleResult(Error("Not found"))
    handleResult(Loading)
}` },
        { n: 20, section: "Klasy zapieczętowane (Sealed Classes)", slide: "Klasy zapieczętowane w DSL", mode: "run", lesson: "sealed",
          code: `sealed class Expr
data class Num(val value: Int) : Expr()
data class Add(val left: Expr, val right: Expr) : Expr()
data class Mul(val left: Expr, val right: Expr) : Expr()

fun eval(expr: Expr): Int = when (expr) {
    is Num -> expr.value
    is Add -> eval(expr.left) + eval(expr.right)
    is Mul -> eval(expr.left) * eval(expr.right)
}

fun main() {
    // (2 + 3) * 4
    val expr = Mul(Add(Num(2), Num(3)), Num(4))
    println(eval(expr))  // 20
}` },
        { n: 21, section: "Klasy zapieczętowane (Sealed Classes)", slide: "Pytanie kontrolne: klasy zapieczętowane", mode: "decl", lesson: "sealed",
          code: `sealed interface Shape
class Circle(val r: Double) : Shape
class Square(val a: Double) : Shape

fun area(s: Shape) = when (s) {
    is Circle -> 3.14 * s.r * s.r
    is Square -> s.a * s.a
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 22, section: "Sprawdzanie typów", slide: "Przykład: owady nielotne", mode: "decl", lesson: "sealed",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
val Any.name
    get() = this::class.simpleName

//sampleStart
interface Insect {
    fun walk() = "$name: walk"
    fun fly() = "$name: fly"
}

class HouseFly : Insect
class Flea : Insect {
    override fun fly() =
        throw Exception("Flea cannot fly")
    fun crawl() = "Flea: crawl"
}

// Funkcja pomocnicza sprawdzająca typ
fun Insect.basic() =
    walk() + " " +
    if (this is Flea)
        crawl()
    else
        fly()

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 23, section: "Sprawdzanie typów", slide: "Sprawdzanie wielu typów", mode: "decl", lesson: "sealed",
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface Insect {
    fun walk() = "$name: walk"
    fun fly() = "$name: fly"
}
val Any.name
    get() = this::class.simpleName

//sampleStart
interface SwimmingInsect: Insect {
    fun swim() = "$name: swim"
}

interface WaterWalker: Insect {
    fun walkWater() = "$name: walk on water"
}

class WaterBeetle : SwimmingInsect
class WaterStrider : WaterWalker

fun Insect.water() =
    when(this) {
        is SwimmingInsect -> swim()
        is WaterWalker -> walkWater()
        else -> "$name: drown"
    }

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 24, section: "Sprawdzanie typów", slide: "Funkcje pomocnicze a metody", mode: "frag", lesson: "sealed",
          code: `interface BeverageContainer {
    fun open(): String
    fun pour(): String
}

class Can : BeverageContainer {
    override fun open() = "Pop Top"
    override fun pour() = "Can: Pour"
}
open class Bottle : BeverageContainer {
    override fun open() = "Remove Cap"
    override fun pour() = "Bottle: Pour"
}
// Recykling jako funkcja pomocnicza
fun BeverageContainer.recycle() =
    when(this) {
        is Can -> "Recycle Can"
        is GlassBottle -> "Recycle Glass"
        else -> "Landfill"
    }` },
        { n: 25, section: "Sprawdzanie typów", slide: "Właściwość pomocnicza: `name`", mode: "frag", lesson: "sealed",
          code: `// Rozszerzenie dla Any
val Any.name
    get() = this::class.simpleName

fun main() {
    val shape: Shape = Circle()
    println(shape.name)  // "Circle"

    val number = 42
    println(number.name)  // "Int"

    val text = "Hello"
    println(text.name)  // "String"
}` },
        { n: 26, section: "Klasy zagnieżdżone", slide: "Podstawowy przykład", mode: "run", lesson: null,
          code: `class Airport(private val code: String) {
    open class Plane {
        fun contact(airport: Airport) =
            "Contacting \${airport.code}"
    }

    private class PrivatePlane : Plane()

    fun privatePlane(): Plane = PrivatePlane()
}

fun main() {
    val nycAirport = Airport("NYC")
    val plane = Airport.Plane()  // Dostęp do zagnieżdżonej

    plane.contact(nycAirport)

    // Nie możemy dostać się do PrivatePlane:
    // val privatePlane = Airport.PrivatePlane() // BŁĄD
}` },
        { n: 27, section: "Klasy zagnieżdżone", slide: "Porównanie Kotlin vs Java", mode: "decl", lesson: null,
          code: `class Outer {
    class Nested {
        // Brak dostępu do Outer
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 28, section: "Klasy zagnieżdżone", slide: "Zagnieżdżone obiekty", mode: "run", lesson: null,
          code: `object Outer {
    object Nested {
        val a = "Outer.Nested.a"
    }
}

class HasObject {
    object Nested {
        val a = "HasObject.Nested.a"
    }
}

fun main() {
    println(Outer.Nested.a)
    println(HasObject.Nested.a)
}` },
        { n: 29, section: "Obiekty (Objects)", slide: "Podstawowy przykład", mode: "run", lesson: "objects",
          code: `object JustOne {
    val n = 2
    fun f() = n * 10
    fun g() = this.n * 20
}

fun main() {
    // val x = JustOne()  // BŁĄD! Nie można utworzyć

    println(JustOne.n)      // 2
    println(JustOne.f())    // 20
    println(JustOne.g())    // 40

    // 'this' w obiekcie odnosi się do tej jednej instancji
}` },
        { n: 30, section: "Obiekty (Objects)", slide: "Kotlin – prosty singleton", mode: "split", lesson: "objects",
          code: `object MySingleton {
    fun doSomething() { /* ... */ }
}

fun main() {
MySingleton.doSomething()
}` },
        { n: 31, section: "Obiekty (Objects)", slide: "`object` dziedziczący", mode: "run", lesson: "objects",
          code: `open class Paint(val color: String) {
    open fun apply() = "Applying $color"
}

object Acrylic: Paint("Blue") {
    override fun apply() = "Acrylic, \${super.apply()}"
}

interface PaintPreparation {
    fun prepare(): String
}

object Prepare: PaintPreparation {
    override fun prepare() = "Scrape"
}

fun main() {
    println(Prepare.prepare())  // "Scrape"
    println(Acrylic.apply())    // "Acrylic, Applying Blue"
}` },
        { n: 32, section: "Obiekty (Objects)", slide: "Wyrażenie `object` – przykład", mode: "run", lesson: "objects",
          code: `interface MouseListener {
    fun onClick()
    fun onHover()
}

fun main() {
    val listener = object : MouseListener {
        override fun onClick() {
            println("Clicked!")
        }
        override fun onHover() {
            println("Hovering...")
        }
    }

    listener.onClick()   // "Clicked!"
    listener.onHover()   // "Hovering..."
}` },
        { n: 33, section: "Klasy wewnętrzne (Inner Classes)", slide: "Podstawowy przykład", mode: "run", lesson: null,
          code: `class Hotel(private val reception: String) {
    open inner class Room(val id: Int = 0) {
        // Dostęp do reception z klasy zewnętrznej!
        fun callReception() =
            "Room $id Calling $reception"
    }

    private inner class Closet : Room()

    fun closet(): Room = Closet()
}

fun main() {
    val hotel = Hotel("311")
    val room = hotel.Room(319)
    println(room.callReception())
    // "Room 319 Calling 311"
}` },
        { n: 34, section: "Klasy wewnętrzne (Inner Classes)", slide: "Porównanie składni", mode: "decl", lesson: null,
          code: `class Outer {
    // Nested - bez dostępu
    class Nested { }

    // Inner - z dostępem
    inner class Inner {
        fun access() =
            this@Outer
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 35, section: "Klasy wewnętrzne (Inner Classes)", slide: "Kwalifikowane `this`", mode: "decl", lesson: null,
          code: `class Fruit {
    fun changeColor(color: String) = "Fruit $color"

    inner class Seed {
        fun changeColor(color: String) = "Seed $color"

        fun whichThis() {
            this.changeColor("Red")  // Seed.changeColor
            this@Seed.changeColor("Blue")  // Seed
            this@Fruit.changeColor("Green") // Fruit
        }
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 36, section: "Obiekty towarzyszące (Companion Objects)", slide: "Podstawowy przykład", mode: "run", lesson: "objects",
          code: `class WithCompanion {
    companion object {
        val i = 3
        fun f() = i * 3
    }

    fun g() = i + f()  // Dostęp bez kwalifikacji
}

fun main() {
    val wc = WithCompanion()
    println(wc.g())              // 12

    println(WithCompanion.i)     // 3
    println(WithCompanion.f())   // 9
}` },
        { n: 37, section: "Obiekty towarzyszące (Companion Objects)", slide: "Porównanie z Javą", mode: "split", lesson: "objects",
          code: `class MyClass {
    companion object {
        val constant = 42
        fun create() = MyClass()
    }
}

fun main() {
MyClass.constant
MyClass.create()
}` },
        { n: 38, section: "Obiekty towarzyszące (Companion Objects)", slide: "`companion` a `static` w Javie", mode: "frag", lesson: "objects",
          code: `class MyClass {
    companion object {
        const val CONSTANT = 42          // stała czasu kompilacji
        @JvmField val config = Config()  // zwykłe pole statyczne
        @JvmStatic fun create() = MyClass()  // metoda statyczna
    }
}` },
        { n: 39, section: "Obiekty towarzyszące (Companion Objects)", slide: "Współdzielony stan", mode: "run", lesson: "objects",
          code: `class WithObjectProperty {
    companion object {
        private var n: Int = 0
    }

    fun increment() = ++n
}

fun main() {
    val a = WithObjectProperty()
    val b = WithObjectProperty()

    println(a.increment())  // 1
    println(b.increment())  // 2
    println(a.increment())  // 3
}` },
        { n: 40, section: "Obiekty towarzyszące (Companion Objects)", slide: "Wzorzec Metoda wytwórcza", mode: "run", lesson: "objects",
          code: `class Numbered2
private constructor(private val id: Int) {
    override fun toString() = "#$id"

    companion object Factory {
        fun create(size: Int) =
            List(size) { Numbered2(it) }
    }
}

fun main() {
    // Nie można utworzyć bezpośrednio
    // val x = Numbered2(1)  // BŁĄD - prywatny

    // Tylko przez factory
    val list = Numbered2.create(5)
    println(list)  // [#0, #1, #2, #3, #4]
}` },
        { n: 41, section: "Obiekty towarzyszące (Companion Objects)", slide: "Licznik obiektów – implementacja", mode: "run", lesson: "objects",
          code: `class Counted {
    companion object {
        private var count = 0
    }

    private val id = count++

    override fun toString() = "#$id"
}

fun main() {
    val list = List(4) { Counted() }
    println(list)  // [#0, #1, #2, #3]
}` },
        { n: 42, section: "Obiekty towarzyszące (Companion Objects)", slide: "Pytanie kontrolne: obiekt towarzyszący", mode: "split", lesson: "objects",
          code: `class Counter {
    companion object { var n = 0 }
    init { n++ }
}

fun main() {
Counter(); Counter()
println(Counter.n)
}` },
        { n: 43, section: "Klasy wartościowe (value class)", slide: "Problem: „gołe” typy proste", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
fun transfer(fromAccount: Long, toAccount: Long, amountCents: Long) { }

transfer(5000, 12, 34)   // kompiluje się -- ale co jest czym?
//sampleEnd
}` },
        { n: 44, section: "Klasy wartościowe (value class)", slide: "`value class` – typ bez narzutu", mode: "split", lesson: null,
          code: `@JvmInline value class AccountId(val id: Long)

@JvmInline value class Cents(val amount: Long)

fun transfer(from: AccountId, to: AccountId, amount: Cents) { /* ... */ }

fun main() {
transfer(AccountId(5000), AccountId(12), Cents(34))   // czytelne
}` },
        { n: 45, section: "Dla chętnych", slide: "Adapter przez dziedziczenie", mode: "decl", lesson: null,
          code: `open class MyClass {
    fun g() = println("g()")
    fun h() = println("h()")
}

fun useMyClass(mc: MyClass) {
    mc.g()
    mc.h()
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 46, section: "Dla chętnych", slide: "Adapter przez dziedziczenie – Implementacja", mode: "run", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface LibType {
    fun f1()
    fun f2()
}
fun utility1(lt: LibType) {
    lt.f1()
    lt.f2()
}
fun utility2(lt: LibType) {
    lt.f2()
    lt.f1()
}
open class MyClass {
    fun g() = println("g()")
    fun h() = println("h()")
}
fun useMyClass(mc: MyClass) {
    mc.g()
    mc.h()
}

//sampleStart
class MyClassAdaptedForLib :
    MyClass(), LibType {
    override fun f1() = h()
    override fun f2() = g()
}

fun main() {
    val mc = MyClassAdaptedForLib()

    utility1(mc)     // h() g()
    utility2(mc)     // g() h()
    useMyClass(mc)   // g() h()
    // Wypisze kolejno: h() g() g() h() g() h()
}
//sampleEnd` },
        { n: 47, section: "Dla chętnych", slide: "Adapter przez kompozycję – gdy klasa nie jest `open`", mode: "decl", lesson: null,
          code: `class MyClass {  // Not open!
    fun g() = println("g()")
    fun h() = println("h()")
}

fun useMyClass(mc: MyClass) {
    mc.g()
    mc.h()
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 48, section: "Dla chętnych", slide: "Adapter: dlaczego nie funkcje rozszerzające?", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class MyClass {  // Not open!
    fun g() = println("g()")
    fun h() = println("h()")
}

//sampleStart
fun MyClass.f1() = h()
fun MyClass.f2() = g()
// MyClass nadal NIE jest
// typem interfejsu

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 49, section: "Dla chętnych", slide: "Wielopoziomowe zagnieżdżenie", mode: "frag", lesson: null,
          code: `abstract class Cleanable(val id: String) {
    open val parts: List<Cleanable> = listOf()
    fun clean(): String { /* ... */ }
}

class House : Cleanable("House") {
    override val parts =
        listOf(Bedroom("Master"), Bedroom("Guest"))

    class Bedroom(id: String) : Cleanable(id) {
        override val parts =
            listOf(Closet(), Bathroom())

        class Closet : Cleanable("Closet")
        class Bathroom : Cleanable("Bathroom")
    }
}` },
        { n: 50, section: "Dla chętnych", slide: "Klasy zagnieżdżone w interfejsach", mode: "run", lesson: null,
          code: `interface Item {
    val type: Type
    data class Type(val type: String)
}

class Bolt(type: String) : Item {
    override val type = Item.Type(type)
}

fun main() {
    val items = listOf(
        Bolt("Slotted"),
        Bolt("Hex")
    )
    // [Type(type=Slotted), Type(type=Hex)]
}` },
        { n: 51, section: "Dla chętnych", slide: "Zagnieżdżone wyliczenia", mode: "decl", lesson: null,
          code: `class Ticket(
    val name: String,
    val seat: Seat = Seat.Coach
) {
    enum class Seat {
        Coach,
        Premium,
        Business,
        First
    }

    fun upgrade(): Ticket {
        val newSeat = Seat.entries[
            (seat.ordinal + 1)
                .coerceAtMost(Seat.First.ordinal)
        ]
        return Ticket(name, newSeat)
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 52, section: "Dla chętnych", slide: "Klasy lokalne", mode: "run", lesson: null,
          code: `fun localClasses() {
    open class Amphibian
    class Frog : Amphibian()
    val amphibian: Amphibian = Frog()
}

// Aby zwrócić obiekt klasy lokalnej,
// trzeba go rzutować w górę
interface Amphibian

fun createAmphibian(): Amphibian {
    class Frog : Amphibian
    return Frog()
}

fun main() {
    val amphibian = createAmphibian()
    // Nie możemy rzutować z powrotem do Frog
}` },
        { n: 53, section: "Dla chętnych", slide: "`object`: przykład współdzielenia", mode: "frag", lesson: null,
          code: `// Plik 1: Definicja
package objectsharing

object Shared {
    var i: Int = 0
}

// Plik 2: Użycie
package objectshare1
import objectsharing.Shared

fun f() { Shared.i += 5 }

// Plik 3: Kolejne użycie
package objectshare2
import objectsharing.Shared

fun g() { Shared.i += 7 }

// Wszyscy operują na tym samym stanie!` },
        { n: 54, section: "Dla chętnych", slide: "Wyrażenie `object` a zmienne z otoczenia", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
interface MouseListener {
    fun onClick()
    fun onHover()
}

//sampleStart
fun countClicks() {
    var clickCount = 0

    val listener = object : MouseListener {
        override fun onClick() {
            clickCount++  // Dostęp do zmiennej!
            println("Clicks: $clickCount")
        }
        override fun onHover() {}
    }

    listener.onClick()  // "Clicks: 1"
    listener.onClick()  // "Clicks: 2"
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 55, section: "Dla chętnych", slide: "Wielopoziomowe klasy wewnętrzne", mode: "decl", lesson: null,
          code: `class Fruit {
    inner class Seed {
        inner class DNA {
            fun changeColor(color: String) {
                // Dostęp do wszystkich poziomów!
                this@Seed.changeColor(color)
                this@Fruit.changeColor(color)
            }
            fun plant() {
                // Wywołanie z Seed
                germinate()
                // Wywołanie z Fruit
                absorbWater(10)
            }
        }
        fun germinate() {}
        fun changeColor(color: String) {}
    }
    fun absorbWater(amount: Int) {}
    fun changeColor(color: String) {}
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 56, section: "Dla chętnych", slide: "Rozszerzenia a klasy wewnętrzne", mode: "decl", lesson: null,
          code: `class Fruit {
    inner class Seed {
        inner class DNA {
            // Funkcja rozszerzająca dla Int
            fun Int.grow() {
                // this odnosi się do Int
                this.toString()
                // Dostęp do DNA
                this@DNA
                // Dostęp do Seed
                this@Seed
                // Dostęp do Fruit
                this@Fruit
            }
        }
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 57, section: "Dla chętnych", slide: "Klasy danych jako klasy wewnętrzne", mode: "decl", lesson: null,
          code: `class Container {
    // BŁĄD! Data classes nie mogą być inner
    // inner data class Item(val value: Int)

    // To działa - zwykła inner class
    inner class Item(val value: Int) {
        fun access() = this@Container
    }

    // To też działa - data class jako nested
    data class Data(val value: Int)
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 58, section: "Dla chętnych", slide: "Obiekt towarzyszący: przykład z nazwą", mode: "run", lesson: null,
          code: `class WithNamed {
    companion object Named {
        fun s() = "from Named"
    }
}

class WithDefault {
    companion object {
        fun s() = "from Default"
    }
}

fun main() {
    WithNamed.s()                // OK
    WithNamed.Named.s()          // OK

    WithDefault.s()              // OK
    WithDefault.Companion.s()    // OK - domyślna nazwa
}` },
        { n: 59, section: "Dla chętnych", slide: "Rozszerzenia obiektów towarzyszących", mode: "run", lesson: null,
          code: `class WithCompanion {
    companion object {
        val i = 3
        fun f() = i * 3
    }
}

// Rozszerzenie companion object!
fun WithCompanion.Companion.h() = f() * i

fun main() {
    println(WithCompanion.h())  // 27
}` },
        { n: 60, section: "Dla chętnych", slide: "Obiekt towarzyszący implementujący interfejs (cd.)", mode: "run", lesson: null,
          code: `interface Factory<T> {
    fun create(): T
}

class Product {
    companion object : Factory<Product> {
        override fun create() = Product()
    }
}

fun <T> useFactory(factory: Factory<T>): T {
    return factory.create()
}

fun main() {
    val product = useFactory(Product)
    // Product.companion jest typu Factory<Product>
}` },
        { n: 61, section: "Dla chętnych", slide: "Inicjalizacja obiektu towarzyszącego", mode: "run", lesson: null,
          code: `class CompanionInit {
    companion object {
        init {
            println("Companion Constructor")
        }
    }
}

fun main() {
    println("Before")
    CompanionInit()
    println("After 1")
    CompanionInit()
    println("After 2")
}
// Wynik:
// Before
// Companion Constructor
// After 1
// After 2` },
        { n: 62, section: "Dla chętnych", slide: "Delegacja w obiektach towarzyszących", mode: "run", lesson: null,
          code: `interface ZI {
    fun f(): String
    fun g(): String
}

class ZIClosed : ZI {
    override fun f() = "ZIClosed.f()"
    override fun g() = "ZIClosed.g()"
}

class ZIDelegation {
    companion object: ZI by ZIClosed()
    fun u() = println("\${f()} \${g()}")
}

fun main() {
    println(ZIDelegation.f())  // ZIClosed.f()
    ZIDelegation().u()  // ZIClosed.f() ZIClosed.g()
}` }
    ]
});
