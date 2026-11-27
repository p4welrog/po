LESSONS.push({
    id: "inheritance",
    track: "oop",
    title: "Dziedziczenie",
    lecture: "IVa",
    atom: ["Inheritance", "Base Class Initialization", "Abstract Classes", "Polymorphism"],
    intro: "Dziedziczenie pozwala zbudować nową klasę na bazie istniejącej: podklasa przejmuje właściwości i metody nadklasy i może zmienić część zachowania. W Kotlinie trzeba na to jawnie pozwolić: klasy i metody są domyślnie zamknięte.",
    java: `import java.util.List;

abstract class Employee {
    private final String name;

    protected Employee(String name) { this.name = name; }

    public String getName() { return name; }
    public abstract int salary();
    public String title() { return "pracownik"; }          // w Javie otwarta domyślnie
    public final String describe() {                         // final: nie da się nadpisać
        return name + " (" + title() + "): " + salary() + " zł";
    }
}

class Developer extends Employee {
    private final int level;

    public Developer(String name, int level) {
        super(name);                                         // konstruktor nadklasy
        this.level = level;
    }

    public int getLevel() { return level; }
    @Override public int salary() { return 8000 + 2000 * level; }
    @Override public String title() { return "programista"; }
}

final class Lead extends Developer {
    private final int teamSize;

    public Lead(String name, int level, int teamSize) {
        super(name, level);
        this.teamSize = teamSize;
    }

    @Override public int salary() { return super.salary() + 500 * teamSize; }
    @Override public String title() { return "lider zespołu"; }
}

final class Intern extends Employee {
    public Intern(String name) { super(name); }
    @Override public int salary() { return 3000; }
}

public class Main {
    public static void main(String[] args) {
        List<Employee> staff = List.of(
            new Developer("Ala", 2), new Lead("Jan", 3, 4), new Intern("Ola"));
        for (Employee e : staff) System.out.println(e.describe());
        int sum = 0;
        for (Employee e : staff) sum += e.salary();
        System.out.println(sum);
    }
}`,
    kt: `// Dziedziczenie/Employee.kt

abstract class Employee(val name: String) {
    abstract fun salary(): Int                 // podklasa musi ją dostarczyć
    open fun title() = "pracownik"             // podklasa może ją zmienić
    fun describe() = "$name (\${title()}): \${salary()} zł"   // tej nie zmieni
}

open class Developer(name: String, val level: Int) : Employee(name) {
    override fun salary() = 8000 + 2000 * level
    override fun title() = "programista"
}

class Lead(name: String, level: Int, val teamSize: Int) : Developer(name, level) {
    override fun salary() = super.salary() + 500 * teamSize
    override fun title() = "lider zespołu"
}

class Intern(name: String) : Employee(name) {
    override fun salary() = 3000
}

fun main() {
    val staff: List<Employee> = listOf(     // rzutowanie w górę
        Developer("Ala", 2), Lead("Jan", 3, 4), Intern("Ola")
    )
    for (e in staff) println(e.describe())   // polimorfizm
    println(staff.sumOf { it.salary() })
    // Employee("X")                          // błąd: klasa abstrakcyjna
}
/* Output:
Ala (programista): 12000 zł
Jan (lider zespołu): 16000 zł
Ola (pracownik): 3000 zł
31000
*/`,
    changes: [
        "Klasy w Kotlinie są domyślnie `final`. Dziedziczenie wymaga `open` przy klasie, a nadpisanie metody `open` przy metodzie. W Javie jest odwrotnie: wszystko jest otwarte, chyba że dopiszesz `final`.",
        "`: Employee(name)` to nadklasa i wywołanie jej konstruktora naraz. W Javie: `extends Employee` i `super(name)` w konstruktorze.",
        "`abstract` działa jak w Javie: nie da się utworzyć obiektu, a metody abstrakcyjne podklasa musi nadpisać. Klasy i metody abstrakcyjne są automatycznie otwarte.",
        "Metoda z `override` pozostaje otwarta dla dalszych podklas. Zablokować ją można przez `final override`.",
        "`super.salary()` wywołuje wersję z nadklasy.",
        "Obiekty podklas można trzymać w `List<Employee>` (rzutowanie w górę). Wywołanie `e.describe()` korzysta z `title()` i `salary()` właściwych dla konkretnego obiektu.",
        "Klasa dziedziczy z jednej klasy, ale może implementować wiele interfejsów."
    ],
    traps: [
        { text: "Bez `open` przy `Developer` klasa `Lead` się nie skompiluje: „this type is final, so it cannot be extended”." },
        { text: "Nie wywołuj metod otwartych w `init` nadklasy. Podklasa nie jest jeszcze wtedy zainicjalizowana, więc jej wersja metody zobaczy niezainicjalizowane właściwości." },
        { text: "Dziedziczenie tylko po to, żeby użyć cudzego kodu, zwykle prowadzi do kłopotów. Częściej lepsza jest kompozycja: obiekt ma pole innej klasy (wykład IVa)." }
    ],
    extras: [
        {
            lang: "cpp",
            title: "virtual a open",
            text: "W C++ metoda jest polimorficzna tylko z `virtual`. Bez niego wywołanie zależy od typu zmiennej, a nie obiektu, więc `e.plain()` daje wersję z nadklasy. W Javie i Kotlinie wywołanie zawsze zależy od obiektu, a Kotlinowe `open` jest bliskie C++-owemu `virtual`: oba trzeba dopisać świadomie.",
            code: `#include <iostream>
#include <string>

class Employee {
public:
    virtual ~Employee() = default;
    virtual std::string title() const { return "pracownik"; }   // virtual: polimorficzna
    std::string plain() const { return "pracownik"; }           // bez virtual
};

class Developer : public Employee {
public:
    std::string title() const override { return "programista"; }
    std::string plain() const { return "programista"; }         // tylko zasłania
};

int main() {
    Developer d;
    Employee& e = d;                    // referencja typu nadklasy
    std::cout << e.title() << "\\n";     // programista
    std::cout << e.plain() << "\\n";     // pracownik (!)
}`
        },
        {
            lang: "cpp",
            title: "Wielodziedziczenie",
            text: "C++ pozwala dziedziczyć z kilku klas naraz. Przy wspólnym przodku pojawia się „problem diamentu” (którą kopię pól i metod wybrać). Kotlin i Java go unikają: jedna nadklasa i dowolnie wiele interfejsów. Gdy dwa interfejsy mają metodę o tej samej nazwie, w Kotlinie trzeba ją nadpisać i wybrać wersję przez `super<A>.f()`.",
            code: `#include <iostream>

class Printer {
public:
    void print() { std::cout << "drukuję\\n"; }
};

class Scanner {
public:
    void scan() { std::cout << "skanuję\\n"; }
};

class Copier : public Printer, public Scanner {};   // dwie nadklasy naraz

int main() {
    Copier c;
    c.scan();     // skanuję
    c.print();    // drukuję
}`
        }
    ],
    exercise: {
        task: "Zrób z `Animal` klasę otwartą z otwartą metodą `sound()` i dopisz podklasy `Dog` i `Cat`, które ją nadpisują.",
        expected: "Zwierz: ...\nBurek: hau\nMruczek: miau",
        starter: `// Animal ma być klasą otwartą z właściwością name i otwartą metodą sound() = "..."
class Animal(val name: String) {
    fun sound() = "..."
    fun speak() = "$name: \${sound()}"
}

// dodaj klasy Dog i Cat dziedziczące z Animal i nadpisujące sound()

fun main() {
    val animals = listOf(Animal("Zwierz"), Dog("Burek"), Cat("Mruczek"))
    for (a in animals) println(a.speak())
}`,
        solution: `open class Animal(val name: String) {
    open fun sound() = "..."
    fun speak() = "$name: \${sound()}"
}

class Dog(name: String) : Animal(name) {
    override fun sound() = "hau"
}

class Cat(name: String) : Animal(name) {
    override fun sound() = "miau"
}

fun main() {
    val animals = listOf(Animal("Zwierz"), Dog("Burek"), Cat("Mruczek"))
    for (a in animals) println(a.speak())
}`
    },
    cheats: [
        { from: "java", src: "class Dev extends Employee", kt: "class Dev(...) : Employee(...)", note: "nadklasa musi być open" },
        { from: "java", src: "super(name);", kt: ": Employee(name)", note: "w nagłówku klasy" },
        { from: "java", src: "final class A", kt: "class A", note: "domyślnie zamknięta" },
        { from: "java", src: "class A  (otwarta)", kt: "open class A", note: "" },
        { from: "java", src: "super.salary()", kt: "super.salary()", note: "" },
        { from: "java", src: "abstract class A", kt: "abstract class A", note: "" },
        { from: "py", src: "class Dev(Employee):", kt: "class Dev(...) : Employee(...)", note: "" },
        { from: "py", src: "super().__init__(name)", kt: ": Employee(name)", note: "" }
    ],
    keywords: "dziedziczenie inheritance extends open final override abstract super nadklasa podklasa polimorfizm virtual rzutowanie w górę"
});
