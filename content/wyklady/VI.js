// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "VI",
    title: "Narzędzia języka i synteza kursu",
    examples: [
        { n: 1, section: "Funkcje zakresu", slide: "Problem: powtarzana nazwa", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class Report(
    var title: String = "",
    val lines: MutableList<String> = mutableListOf(),
) {
    fun render() = (listOf(title) + lines).joinToString("\\n")
}

val report = Report()
report.title = "Raport"
report.lines += "a"
report.lines += "b"
println(report.render())
//sampleEnd
}` },
        { n: 2, section: "Funkcje zakresu", slide: "`apply` i `also` – zwracają obiekt", mode: "wrap", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class Report(
    var title: String = "",
    val lines: MutableList<String> = mutableListOf(),
) {
    fun render() = (listOf(title) + lines).joinToString("\\n")
}

fun main() {
//sampleStart
val r = Report().apply {
    title = "Raport"              // this.title -- odbiorca jako this
    lines += "a"
}

val list = mutableListOf(1, 2).also {
    println("lista: $it")         // obiekt jako it
}
//sampleEnd
}` },
        { n: 3, section: "Funkcje zakresu", slide: "`let`, `run`, `with` – zwracają wynik bloku", mode: "wrap", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class Report(
    var title: String = "",
    val lines: MutableList<String> = mutableListOf(),
) {
    fun render() = (listOf(title) + lines).joinToString("\\n")
}

fun main() {
//sampleStart
val name: String? = "Kawa"
val len = name?.let { it.length } ?: 0                   // 4

val text = Report().run {
    title = "Raport"
    lines += "a"
    render()                      // wynik bloku
}

val s = with(StringBuilder()) {
    append("x"); append("y"); toString()    // "xy"
}
//sampleEnd
}` },
        { n: 4, section: "Funkcje zakresu", slide: "Pułapki", mode: "decl", lesson: null,
          code: `class Order(val id: Int) {
    fun copyTo(other: Order) = other.apply {
        println(id)               // id czyje? -- other.id, nie this.id!
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 5, section: "Funkcje zakresu", slide: "Pytanie kontrolne: funkcje zakresu", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
val x = "abc".also { it.uppercase() }.let { it + "!" }
println(x)
//sampleEnd
}` },
        { n: 6, section: "Delegowanie właściwości", slide: "Idea: właściwość deleguje `get` i `set`", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class NonNegative(private var value: Double) :
        ReadWriteProperty<Any?, Double> {
    init { require(value >= 0) { "wartość ujemna: $value" } }
    override fun getValue(thisRef: Any?, property: KProperty<*>) = value
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Double) {
        require(value >= 0) { "\${property.name} nie może być ujemne: $value" }
        this.value = value
    }
}

//sampleStart
class Employee(salary: Double) {
    var salary by NonNegative(salary)
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 7, section: "Delegowanie właściwości", slide: "Idea: właściwość deleguje `get` i `set`", mode: "frag", lesson: null,
          code: `private val salary$delegate = NonNegative(salary)
var salary: Double
    get() = salary$delegate.getValue(this, ::salary)
    set(v) { salary$delegate.setValue(this, ::salary, v) }` },
        { n: 8, section: "Delegowanie właściwości", slide: "`by lazy` – obliczenie przy pierwszym użyciu", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class Config {
    val settings: Map<String, String> by lazy {
        println("wczytuję konfigurację")
        mapOf("lang" to "pl")
    }
}

val c = Config()
println("utworzono")
println(c.settings["lang"])     // wczytuję konfigurację, pl
println(c.settings["lang"])     // pl -- blok nie wykonuje się drugi raz
//sampleEnd
}` },
        { n: 9, section: "Delegowanie właściwości", slide: "`observable` i `vetoable`", mode: "wrap", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

fun main() {
//sampleStart
class Thermostat {
    var target: Double by Delegates.observable(20.0) { _, old, new ->
        println("temperatura: $old -> $new")
    }
    var limit: Int by Delegates.vetoable(10) { _, _, new -> new in 0..30 }
}

val t = Thermostat()
t.target = 22.5        // temperatura: 20.0 -> 22.5
t.limit = 50           // odrzucone -- limit nadal 10
t.limit = 25           // przyjęte
//sampleEnd
}` },
        { n: 10, section: "Delegowanie właściwości", slide: "Właściwości z mapy", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class User(map: Map<String, Any?>) {
    val name: String by map
    val age: Int by map
}

val u = User(mapOf("name" to "Ala", "age" to 21))
println("\${u.name} \${u.age}")          // Ala 21
//sampleEnd
}` },
        { n: 11, section: "Delegowanie właściwości", slide: "Własny delegat: walidacja w jednym miejscu", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

//sampleStart
class NonNegative(private var value: Double) :
        ReadWriteProperty<Any?, Double> {
    init { require(value >= 0) { "wartość ujemna: $value" } }
    override fun getValue(thisRef: Any?, property: KProperty<*>) = value
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: Double) {
        require(value >= 0) { "\${property.name} nie może być ujemne: $value" }
        this.value = value
    }
}

class Employee(salary: Double, bonus: Double) {
    var salary by NonNegative(salary)
    var bonus by NonNegative(bonus)
}
// Employee(5000.0, 0.0).bonus = -1.0  →  bonus nie może być ujemne: -1.0

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 12, section: "Inicjalizacja: konstruktor, lateinit, lazy", slide: "`lateinit` – sprawdzanie i wyjątek", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class Service {
    lateinit var repo: MutableList<String>
    fun ready() = ::repo.isInitialized
}

val s = Service()
println(s.ready())        // false
s.repo.size               // UninitializedPropertyAccessException:
                          // lateinit property repo has not been initialized
s.repo = mutableListOf()
println(s.ready())        // true
//sampleEnd
}` },
        { n: 13, section: "Konwencje operatorów we własnych typach", slide: "Własny kontener: `get`, `set`, `contains`", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
data class Cell(val row: Int, val col: Int)

class Board(val rows: Int, val cols: Int) {
    private val data = Array(rows) { CharArray(cols) { '.' } }
    operator fun get(r: Int, c: Int) = data[r][c]
    operator fun set(r: Int, c: Int, v: Char) { data[r][c] = v }
    operator fun contains(cell: Cell) =
        cell.row in 0 until rows && cell.col in 0 until cols
}

val b = Board(2, 3)
b[0, 1] = 'X'                 // b.set(0, 1, 'X')
println(b[0, 1])              // X
println(Cell(2, 0) in b)      // false
//sampleEnd
}` },
        { n: 14, section: "Konwencje operatorów we własnych typach", slide: "Pętla `for`: `iterator`", mode: "frag", lesson: null,
          code: `class Board(val rows: Int, val cols: Int) : Iterable<Cell> {
    // ... jak wcześniej
    override operator fun iterator(): Iterator<Cell> = iterator {
        for (r in 0 until rows) for (c in 0 until cols) yield(Cell(r, c))
    }
}

for (cell in b) if (b[cell.row, cell.col] == 'X') println(cell)
// Cell(row=0, col=1)
println(b.count())            // 6 -- Iterable daje count, filter, map...` },
        { n: 15, section: "Konwencje operatorów we własnych typach", slide: "`invoke`: Polecenie wywoływane jak funkcja", mode: "split", lesson: null,
          code: `interface Command { operator fun invoke() }

class Greet(private val name: String) : Command {
    override fun invoke() = println("Cześć, $name!")
}

fun main() {
val cmd: Command = Greet("Ola")
cmd()                         // Cześć, Ola!  -- czyli cmd.invoke()
}` },
        { n: 16, section: "Konwencje operatorów we własnych typach", slide: "`componentN` bez `data class`", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
class Range2(val from: Int, val to: Int) {
    operator fun component1() = from
    operator fun component2() = to
}

val (a, z) = Range2(3, 7)
println("$a..$z")             // 3..7
//sampleEnd
}` },
        { n: 17, section: "Konwencje operatorów we własnych typach", slide: "Pytanie kontrolne: konwencje", mode: "frag", lesson: null,
          code: `val book = library["978-83"]
if (book in library) for (b in library) println(b)` }
    ]
});
