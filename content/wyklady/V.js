// Wygenerowane przez PO_W/przyklady_strona.py – nie edytować ręcznie.
WYKLADY.push({
    id: "V",
    title: "Zapobieganie awariom",
    examples: [
        { n: 1, section: "Obsługa wyjątków", slide: "Hierarchia własnych wyjątków", mode: "decl", lesson: "exceptions",
          code: `open class OrderException(
    message: String
) : Exception(message)

class InvalidQuantityException(
    val quantity: Int
) : OrderException("Nieprawidłowa ilość: $quantity")

class OutOfStockException(
    val product: String
) : OrderException("Brak towaru: $product")

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 2, section: "Obsługa wyjątków", slide: "Łapanie własnych wyjątków", mode: "frag", lesson: "exceptions",
          code: `try {
    placeOrder(product, quantity)
} catch (e: InvalidQuantityException) {  // podklasa -- musi być wcześniej
    println("Popraw ilość: \${e.quantity}")
} catch (e: OrderException) {            // pozostałe błędy zamówienia
    println(e.message)
}` },
        { n: 3, section: "Obsługa wyjątków", slide: "`try` i `throw` jako wyrażenia", mode: "frag", lesson: "exceptions",
          code: `fun parseOrNull(s: String): Int? =
    try {
        s.toInt()
    } catch (e: NumberFormatException) {
        null
    }

val percentage =
    if (number in 0..100) number
    else throw IllegalArgumentException("Out of range: $number")` },
        { n: 4, section: "Obsługa wyjątków", slide: "`Result` i `runCatching`", mode: "wrap", lesson: "exceptions",
          code: `fun main() {
//sampleStart
fun parse(s: String): Result<Int> = runCatching { s.toInt() }

val r = parse("42x")
r.isFailure                 // true
r.getOrNull()               // null
r.getOrElse { 0 }           // 0
r.onFailure { println("Błąd: \${it.message}") }
//sampleEnd
}` },
        { n: 5, section: "Obsługa wyjątków", slide: "Pytanie kontrolne: `try` jako wyrażenie", mode: "wrap", lesson: "exceptions",
          code: `fun main() {
//sampleStart
fun f(): Int =
    try { "12x".toInt() }
    catch (e: NumberFormatException) { -1 }
    finally { println("finally") }

println(f())
//sampleEnd
}` },
        { n: 6, section: "Instrukcje sprawdzające", slide: "`require()` – warunki wstępne", mode: "decl", lesson: null,
          code: `data class Month(val monthNumber: Int) {
    init {
        require(monthNumber in 1..12) {
            "Month out of range: $monthNumber"
        }
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 7, section: "Instrukcje sprawdzające", slide: "`require()` – przykład użycia", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

//sampleStart
fun getTrace(fileName: String): String {
    require(fileName.isNotEmpty()) {
        "File name cannot be empty"
    }
    val file = File(fileName)
    require(file.exists()) { "$fileName doesn't exist" }
    require(file.length() > 0) { "$fileName is empty" }
    return file.readText()
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 8, section: "Instrukcje sprawdzające", slide: "`requireNotNull()` – sprawdzanie null", mode: "decl", lesson: null,
          code: `fun notNull(n: Int?): Int {
    requireNotNull(n) {
        "Argument cannot be null"
    }
    return n * 9  // n jest teraz non-nullable
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 9, section: "Instrukcje sprawdzające", slide: "`check()` – warunki końcowe", mode: "frag", lesson: null,
          code: `fun createResultFile(create: Boolean) {
    if (create)
        resultFile.writeText("Results\\n# ok")
    // ... inne ścieżki wykonania
    check(resultFile.exists()) {
        "\${resultFile.name} doesn't exist!"
    }
}` },
        { n: 10, section: "Instrukcje sprawdzające", slide: "`assert()` w Kotlinie i Javie", mode: "frag", lesson: null,
          code: `assert(x >= 0) // Wymaga flagi -ea` },
        { n: 11, section: "Typ Nothing", slide: "Przykład: nieskończona pętla", mode: "decl", lesson: null,
          code: `fun infinite(): Nothing {
    while (true) {}
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 12, section: "Typ Nothing", slide: "`TODO()` – praktyczne zastosowanie", mode: "decl", lesson: null,
          code: `fun later(s: String): String = TODO("later()")

fun later2(s: String): Int = TODO()

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 13, section: "Typ Nothing", slide: "Funkcje pomocnicze z `Nothing`", mode: "decl", lesson: null,
          code: `fun fail(i: Int): Nothing =
    throw Exception("fail($i)")

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 14, section: "Typ Nothing", slide: "`Nothing` w wyrażeniach warunkowych", mode: "decl", lesson: null,
          code: `class BadData(m: String) : Exception(m)

fun checkObject(obj: Any?): String =
    if (obj is String)
        obj
    else
        throw BadData("Needs String, got $obj")

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 15, section: "Typ Nothing", slide: "Operator Elvis i `Nothing`", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty
class BadData(m: String) : Exception(m)

//sampleStart
fun failWithBadData(obj: Any?): Nothing =
    throw BadData("Needs String, got $obj")

fun checkObject2(obj: Any?): String =
    (obj as? String) ?: failWithBadData(obj)

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 16, section: "Typ Nothing", slide: "`error()` – wbudowana funkcja z `Nothing`", mode: "decl", lesson: null,
          code: `class Address(val city: String)
class Company(val address: Address?)

fun printCity(company: Company) {
    val address = company.address ?: error("No address")
    println(address.city)   // address: Address, nie Address?
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 17, section: "Typ Nothing", slide: "`Nothing?` – nullable `Nothing`", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
val none: Nothing? = null
var nullableString: String? = null
nullableString = "abc"
nullableString = none  // OK!
//sampleEnd
}` },
        { n: 18, section: "Typ Nothing", slide: "`Nothing` w kolekcjach", mode: "wrap", lesson: null,
          code: `fun main() {
//sampleStart
val listNone: List<Nothing?> = listOf(null)
val ints: List<Int?> = listOf(null)  // OK
//sampleEnd
}` },
        { n: 19, section: "Typ Nothing", slide: "Pytanie kontrolne: `Nothing`", mode: "frag", lesson: null,
          code: `val name = user?.name ?: error("Brak użytkownika")` },
        { n: 20, section: "Czyszczenie zasobów", slide: "Tradycyjne podejście – `finally`", mode: "decl", lesson: null,
          code: `fun checkValue(value: Int) {
    try {
        println(value)
        if (value <= 0)
            throw IllegalArgumentException(
                "value must be positive: $value")
    } finally {
        println("In finally clause for $value")
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 21, section: "Czyszczenie zasobów", slide: "Kotlin: `use()` – eleganckie rozwiązanie", mode: "wrap", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

fun main() {
//sampleStart
val first = File("Results.txt")
    .bufferedReader()
    .use { it.readLines().first() }
//sampleEnd
}` },
        { n: 22, section: "Czyszczenie zasobów", slide: "Własna klasa z `AutoCloseable`", mode: "run", lesson: null,
          code: `class Usable : AutoCloseable {
    fun func() = println("func()")
    override fun close() = println("close()")
}

fun main() {
    Usable().use { it.func() }
    // Wypisze: func(), potem close()
}` },
        { n: 23, section: "Czyszczenie zasobów", slide: "Jak działa `use()`?", mode: "decl", lesson: null,
          code: `inline fun <T : AutoCloseable?, R> T.use(block: (T) -> R): R {
    try {
        return block(this)
    } finally {
        this?.close()
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 24, section: "Czyszczenie zasobów", slide: "Ten sam wzorzec w bibliotece standardowej", mode: "frag", lesson: null,
          code: `// liczba niepustych linii; plik zamknięty automatycznie
val n = File("data.txt").useLines { lines ->
    lines.count { it.isNotBlank() }
}

// blokada zwolniona nawet przy wyjątku
val lock = ReentrantLock()
lock.withLock {
    // sekcja krytyczna
}` },
        { n: 25, section: "Czyszczenie zasobów", slide: "Porównanie: Kotlin vs Java", mode: "frag", lesson: null,
          code: `file.bufferedReader().use { reader ->
    reader.readLines().forEach { println(it) }
}` },
        { n: 26, section: "Logowanie", slide: "Kotlin: kotlin-logging", mode: "frag", lesson: null,
          code: `import io.github.oshai.kotlinlogging.KotlinLogging

private val logger = KotlinLogging.logger {}` },
        { n: 27, section: "Logowanie", slide: "Kotlin: kotlin-logging", mode: "frag", lesson: null,
          code: `fun main() {
    logger.trace { "Hello, Kotlin Logging!" }
    logger.debug { "Hello, Kotlin Logging!" }
    logger.info { "Hello, Kotlin Logging!" }
    logger.warn { "Hello, Kotlin Logging!" }
    logger.error { "Hello, Kotlin Logging!" }
}` },
        { n: 28, section: "Logowanie", slide: "Projekt: `System.Logger` w Kotlinie", mode: "frag", lesson: null,
          code: `private val log = System.getLogger("shop.ProductService")

class ProductService(private val repo: ProductRepository) {
    fun delete(id: Int): Boolean {
        val ok = repo.delete(id)
        if (ok) log.log(System.Logger.Level.INFO, "Usunięto produkt $id")
        else log.log(System.Logger.Level.WARNING, "Brak produktu $id")
        return ok
    }
}
// nieoczekiwany wyjątek -- razem ze śladem stosu:
// log.log(System.Logger.Level.ERROR, "Nieoczekiwany błąd", e)` },
        { n: 29, section: "Logowanie", slide: "Projekt: logi do pliku", mode: "run", lesson: null,
          code: `import java.util.logging.*

//sampleStart
fun configureLogging() {
    val root = Logger.getLogger("")
    root.handlers.forEach { root.removeHandler(it) }    // nic na konsolę
    root.addHandler(FileHandler("app.log", true).apply { // true = dopisuj
        formatter = SimpleFormatter()                     // tekst zamiast XML
    })
    root.level = Level.INFO
}

fun main() {
    configureLogging()           // raz, na początku programu
    // ... menu
}
//sampleEnd` },
        { n: 30, section: "Logowanie", slide: "Najlepsze praktyki", mode: "frag", lesson: null,
          code: `  logger.debug { "User $userId logged in" }
  logger.error(ex) { "Database connection failed" }
  ` },
        { n: 31, section: "Logowanie", slide: "Najlepsze praktyki", mode: "frag", lesson: null,
          code: `  logger.debug { "Complex: \${expensiveOperation()}" }
  ` },
        { n: 32, section: "Testowanie jednostkowe", slide: "Od ręcznych testów do `kotlin.test`", mode: "frag", lesson: null,
          code: `test("1/2 + 1/3", Fraction(5, 6), Fraction(1, 2) + Fraction(1, 3))  // OK / BŁĄD` },
        { n: 33, section: "Testowanie jednostkowe", slide: "Od ręcznych testów do `kotlin.test`", mode: "frag", lesson: null,
          code: `class FractionTest {
    @Test
    fun \`jedna druga plus jedna trzecia to pięć szóstych\`() {
        assertEquals(Fraction(5, 6), Fraction(1, 2) + Fraction(1, 3))
    }
}` },
        { n: 34, section: "Testowanie jednostkowe", slide: "Testy w projekcie Gradle", mode: "frag", lesson: null,
          code: `dependencies {
    testImplementation(kotlin("test"))
}
tasks.test {
    useJUnitPlatform()          // kotlin.test na JVM działa na JUnit 5
}` },
        { n: 35, section: "Testowanie jednostkowe", slide: "Podstawowe asercje – `kotlin.test`", mode: "frag", lesson: null,
          code: `import kotlin.test.*

assertEquals(expected, actual, message)
assertNotEquals(expected, actual)
assertTrue(condition, message)
assertFalse(condition, message)
assertNull(value)
assertNotNull(value)
assertFails { /* kod */ }
assertFailsWith<ExceptionType> { /* kod */ }` },
        { n: 36, section: "Testowanie jednostkowe", slide: "Adnotacja `@Test`", mode: "frag", lesson: null,
          code: `typealias Test = org.junit.jupiter.api.Test` },
        { n: 37, section: "Testowanie jednostkowe", slide: "Nazwy testów ze spacjami", mode: "frag", lesson: null,
          code: `@Test
fun \`should calculate correct sum\`() {
    assertEquals(5, calculator.add(2, 3))
}

@Test
fun \`should throw on division by zero\`() {
    assertFailsWith<ArithmeticException> {
        calculator.divide(10, 0)
    }
}` },
        { n: 38, section: "Testowanie jednostkowe", slide: "Testy parametryzowane", mode: "frag", lesson: null,
          code: `  @ParameterizedTest
  @ValueSource(ints = [1, 2, 3, 4, 5])
  fun \`is positive\`(n: Int) {
      assertTrue(isPositive(n))
  }
  ` },
        { n: 39, section: "Testowanie jednostkowe", slide: "Przygotowanie i sprzątanie (setup, teardown)", mode: "frag", lesson: null,
          code: `class ProductServiceTest {
    private lateinit var repo: InMemoryProductRepository
    private lateinit var service: ProductService

    @BeforeTest                        // JUnit 5: @BeforeEach
    fun setUp() {
        repo = InMemoryProductRepository()
        service = ProductService(repo)
    }

    @AfterTest                         // JUnit 5: @AfterEach
    fun tearDown() {
        // sprzątanie, np. usunięcie pliku tymczasowego
    }
}` },
        { n: 40, section: "Testowanie jednostkowe", slide: "Testowanie wyjątków – Kotlin", mode: "decl", lesson: null,
          code: `import java.io.File
import kotlin.math.*
import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

//sampleStart
fun safeSqrt(x: Double): Double {
    require(x >= 0) { "x must be non-negative: $x" }
    return sqrt(x)
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}
//sampleEnd` },
        { n: 41, section: "Testowanie jednostkowe", slide: "Testowanie wyjątków – Kotlin", mode: "frag", lesson: null,
          code: `@Test
fun \`should throw for negative input\`() {
    assertFailsWith<IllegalArgumentException> { safeSqrt(-1.0) }
}` },
        { n: 42, section: "Testowanie jednostkowe", slide: "Przykład: funkcja pomocnicza", mode: "frag", lesson: null,
          code: `fun makeLearner(
    id: Int,
    language: Language = Kotlin,
    name: String = "Test Name $id",
    surname: String = "Test Surname $id"
) = Learner(id, name, surname, language)

@Test
fun \`single Learner\`() {
    val learner = makeLearner(10, Java)
    assertEquals("Test Name 10", learner.name)
}` },
        { n: 43, section: "Testowanie jednostkowe", slide: "Przypomnienie: serwis i repozytorium (IVa, uproszczone)", mode: "decl", lesson: null,
          code: `data class Product(val id: Int, val name: String)

interface ProductRepository {
    fun findById(id: Int): Product?
    fun save(p: Product): Product
}

class ProductService(private val repo: ProductRepository) {
    fun rename(id: Int, newName: String): Product {
        require(newName.isNotBlank()) { "Pusta nazwa" }
        val p = repo.findById(id)
            ?: throw NoSuchElementException("Brak produktu $id")
        return repo.save(p.copy(name = newName))
    }
}

fun main() {
    // tu możesz wypróbować kod ze slajdu
}` },
        { n: 44, section: "Testowanie jednostkowe", slide: "Fake: zastępnik napisany ręcznie", mode: "frag", lesson: null,
          code: `class FakeProductRepository : ProductRepository {
    private val items = mutableMapOf<Int, Product>()
    override fun findById(id: Int) = items[id]
    override fun save(p: Product): Product { items[p.id] = p; return p }
}

@Test
fun \`zmiana nazwy zapisuje produkt\`() {
    val repo = FakeProductRepository().apply { save(Product(1, "Kawa")) }
    ProductService(repo).rename(1, "Herbata")
    assertEquals("Herbata", repo.findById(1)?.name)
}` },
        { n: 45, section: "Testowanie jednostkowe", slide: "MockK: pierwszy mock", mode: "frag", lesson: null,
          code: `// build.gradle.kts
dependencies {
    testImplementation(kotlin("test"))
    testImplementation("io.mockk:mockk:1.14.11")
}` },
        { n: 46, section: "Testowanie jednostkowe", slide: "MockK: pierwszy mock", mode: "frag", lesson: null,
          code: `import io.mockk.*
import kotlin.test.*

class ProductServiceTest {
    @Test
    fun \`zmiana nazwy zwraca zapisany produkt\`() {
        val repo = mockk<ProductRepository>()                      // mock interfejsu
        every { repo.findById(1) } returns Product(1, "Kawa")      // stub: odpowiedź
        every { repo.save(any()) } answers { firstArg() }          // zwróć argument

        val result = ProductService(repo).rename(1, "Herbata")

        assertEquals("Herbata", result.name)
    }
}` },
        { n: 47, section: "Testowanie jednostkowe", slide: "MockK: weryfikacja wywołań", mode: "frag", lesson: null,
          code: `@Test
fun \`brak produktu -- nic nie jest zapisywane\`() {
    val repo = mockk<ProductRepository>()
    every { repo.findById(99) } returns null

    assertFailsWith<NoSuchElementException> { ProductService(repo).rename(99, "X") }

    verify(exactly = 1) { repo.findById(99) }
    verify(exactly = 0) { repo.save(any()) }        // save nie mogło zostać wywołane
}

@Test
fun \`pusta nazwa -- repozytorium nie jest używane\`() {
    val repo = mockk<ProductRepository>()
    assertFailsWith<IllegalArgumentException> { ProductService(repo).rename(1, " ") }
    verify { repo wasNot Called }
}` },
        { n: 48, section: "Testowanie jednostkowe", slide: "MockK: przechwytywanie argumentów i wyjątki", mode: "frag", lesson: null,
          code: `@Test
fun \`zapisywany produkt ma nową nazwę i ten sam id\`() {
    val repo = mockk<ProductRepository>()
    val saved = slot<Product>()                    // „pojemnik” na argument
    every { repo.findById(1) } returns Product(1, "Kawa")
    every { repo.save(capture(saved)) } answers { saved.captured }

    ProductService(repo).rename(1, "Herbata")

    assertEquals(Product(1, "Herbata"), saved.captured)
}

@Test
fun \`błąd zapisu jest przekazywany dalej\`() {
    val repo = mockk<ProductRepository>()
    every { repo.findById(1) } returns Product(1, "Kawa")
    every { repo.save(any()) } throws IllegalStateException("Dysk pełny")

    assertFailsWith<IllegalStateException> {
        ProductService(repo).rename(1, "Herbata")
    }
}` },
        { n: 49, section: "Testowanie jednostkowe", slide: "Wzorzec AAA", mode: "frag", lesson: null,
          code: `@Test
fun \`should apply 10 percent discount\`() {
    // Arrange (Given)
    val cart = Cart(discount = 0.10)
    cart.add(Product("Book", 100.0))

    // Act (When)
    val total = cart.calculateTotal()

    // Assert (Then)
    assertEquals(90.0, total)
}` },
        { n: 50, section: "Testowanie jednostkowe", slide: "Pytanie kontrolne: testy z MockK", mode: "frag", lesson: null,
          code: `val repo = mockk<ProductRepository>()
assertFailsWith<IllegalArgumentException> { ProductService(repo).rename(1, " ") }
verify { repo wasNot Called }` }
    ]
});
