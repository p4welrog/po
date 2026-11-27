LESSONS.push({
    id: "objects",
    track: "oop",
    title: "object i obiekt towarzyszący",
    lecture: "IVb",
    atom: ["Objects", "Companion Objects"],
    intro: "Kotlin nie ma słowa `static`. Gdy potrzebny jest dokładnie jeden obiekt (np. konfiguracja), piszesz `object`. Gdy coś ma należeć do klasy, a nie do pojedynczego obiektu (licznik, funkcja tworząca obiekty), trafia do obiektu towarzyszącego (`companion object`).",
    java: `final class Config {
    private static String language = "pl";

    private Config() {}                  // nikt nie utworzy obiektu

    public static String getLanguage() { return language; }
    public static void setLanguage(String l) { language = l; }
    public static String greeting() {
        return language.equals("pl") ? "Cześć" : "Hello";
    }
}

final class Student {
    public static final int FIRST_ID = 1000;
    private static int nextId = FIRST_ID;
    private static int created = 0;

    private final String name;
    private final int id;

    private Student(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static Student create(String name) {
        created++;
        return new Student(name, nextId++);
    }

    public static int getCreated() { return created; }
    public String getName() { return name; }
    public int getId() { return id; }

    @Override
    public String toString() { return name + " #" + id; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Config.greeting());
        Config.setLanguage("en");
        System.out.println(Config.greeting());

        Student a = Student.create("Ala");
        Student b = Student.create("Jan");
        System.out.println(a + ", " + b);
        System.out.println(Student.getCreated());
    }
}`,
    kt: `// Obiekty/Config.kt

object Config {                          // jedyny obiekt tej klasy (Singleton)
    var language = "pl"
    fun greeting() = if (language == "pl") "Cześć" else "Hello"
}

class Student private constructor(val name: String, val id: Int) {
    companion object {                   // część wspólna dla całej klasy
        const val FIRST_ID = 1000        // stała czasu kompilacji
        private var nextId = FIRST_ID
        var created = 0
            private set

        fun create(name: String): Student {     // funkcja wytwórcza
            created++
            return Student(name, nextId++)
        }
    }

    override fun toString() = "$name #$id"
}

fun main() {
    println(Config.greeting())
    Config.language = "en"
    println(Config.greeting())

    val a = Student.create("Ala")        // przez nazwę klasy, jak static w Javie
    val b = Student.create("Jan")
    println("$a, $b")
    println(Student.created)
    // Student("Ola", 1)                 // błąd: konstruktor prywatny
}
/* Output:
Cześć
Hello
Ala #1000, Jan #1001
2
*/`,
    changes: [
        "`object Config { ... }` deklaruje klasę i jej jedyny obiekt naraz (wzorzec Singleton). Obiekt powstaje przy pierwszym użyciu.",
        "Składowe obiektu towarzyszącego wywołuje się przez nazwę klasy: `Student.create(...)`, jak metody statyczne w Javie.",
        "Prywatny konstruktor i funkcja wytwórcza w obiekcie towarzyszącym dają klasie kontrolę nad tworzeniem obiektów, np. nadawanie kolejnych numerów.",
        "`const val` to stała znana w czasie kompilacji (w Javie `static final`). Może być w obiekcie albo na najwyższym poziomie pliku.",
        "Funkcje pomocnicze bez stanu zwykle lepiej zapisać jako funkcje najwyższego poziomu niż w `object`."
    ],
    traps: [
        { text: "Obiekt towarzyszący to prawdziwy obiekt. Z kodu w Javie widać go jako `Student.Companion.create(...)`, chyba że oznaczysz metodę `@JvmStatic`." },
        { text: "`object` ze zmiennym stanem działa jak zmienna globalna: każda część programu może go zmienić, co utrudnia testowanie." }
    ],
    extras: [
        {
            lang: "cpp",
            title: "static w C++",
            text: "`static` w C++ działa jak w Javie: zmienna lub metoda należy do klasy. Zmienną statyczną trzeba dodatkowo zdefiniować poza klasą (od C++17 można zamiast tego napisać `inline static`). Kotlin zamiast słowa `static` ma obiekt towarzyszący.",
            code: `#include <iostream>
#include <string>

class Student {
    static int nextId;                  // jedna zmienna dla całej klasy
    std::string name;
    int id;
    Student(std::string n, int i) : name(n), id(i) {}   // prywatny konstruktor
public:
    static Student create(const std::string& n) { return Student(n, nextId++); }
    void print() const { std::cout << name << " #" << id << "\\n"; }
};

int Student::nextId = 1000;             // definicja poza klasą

int main() {
    Student::create("Ala").print();     // Ala #1000
    Student::create("Jan").print();     // Jan #1001
}`
        }
    ],
    exercise: {
        task: "Uzupełnij obiekt `TicketMachine`: metoda `next()` zwraca kolejne numery biletów `B-1`, `B-2`, …, a właściwość `issued` (tylko do odczytu z zewnątrz) liczy wydane bilety.",
        expected: "B-1\nB-2\nB-3\nwydano: 3",
        starter: `// obiekt ma pamiętać ostatni numer i zwracać kolejne: B-1, B-2, ...
object TicketMachine

fun main() {
    repeat(3) { println(TicketMachine.next()) }
    println("wydano: \${TicketMachine.issued}")
}`,
        solution: `object TicketMachine {
    var issued = 0
        private set

    fun next(): String {
        issued++
        return "B-$issued"
    }
}

fun main() {
    repeat(3) { println(TicketMachine.next()) }
    println("wydano: \${TicketMachine.issued}")
}`
    },
    cheats: [
        { from: "java", src: "static int count;", kt: "companion object { var count = 0 }", note: "" },
        { from: "java", src: "public static Student create(...)", kt: "companion object { fun create(...) }", note: "wywołanie: Student.create(...)" },
        { from: "java", src: "static final int MAX = 10;", kt: "const val MAX = 10", note: "" },
        { from: "java", src: "Singleton: private Config() + getInstance()", kt: "object Config", note: "" },
        { from: "py", src: "zmienna klasy / @classmethod", kt: "companion object", note: "" }
    ],
    keywords: "object singleton companion obiekt towarzyszący static statyczny const stała fabryka funkcja wytwórcza JvmStatic"
});
