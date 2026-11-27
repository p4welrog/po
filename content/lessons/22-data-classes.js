LESSONS.push({
    id: "data-classes",
    track: "oop",
    title: "Klasy danych",
    lecture: "IIIb",
    atom: ["Data Classes", "Destructuring Declarations"],
    intro: "Wiele klas tylko przechowuje dane: student, punkt, książka. Dla takich klas porównywanie, wypisywanie i kopiowanie powinno działać „po wartości”. Słowo `data` przed `class` każe kompilatorowi wygenerować to wszystko. Java potrzebuje do tego kilkudziesięciu linii albo `record`.",
    java: `import java.util.HashSet;
import java.util.List;
import java.util.Objects;

// to, co Kotlin generuje dla jednej linii „data class Student(...)”
final class Student {
    private final String name;
    private final int id;
    private final int year;

    public Student(String name, int id, int year) {
        this.name = name;
        this.id = id;
        this.year = year;
    }

    public Student(String name, int id) { this(name, id, 1); }

    public String getName() { return name; }
    public int getId() { return id; }
    public int getYear() { return year; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Student)) return false;
        Student s = (Student) o;
        return id == s.id && year == s.year && name.equals(s.name);
    }

    @Override
    public int hashCode() { return Objects.hash(name, id, year); }

    @Override
    public String toString() {
        return "Student(name=" + name + ", id=" + id + ", year=" + year + ")";
    }

    public Student withYear(int year) {       // zamiast copy(year = ...)
        return new Student(name, id, year);
    }
}

class PlainStudent {
    private final String name;
    private final int id;
    public PlainStudent(String name, int id) { this.name = name; this.id = id; }
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Ala", 1001);
        Student b = new Student("Ala", 1001);
        System.out.println(a);
        System.out.println(a.equals(b));
        System.out.println(a == b);
        Student c = a.withYear(2);
        System.out.println(c);
        String name = c.getName();
        int id = c.getId();
        System.out.println(name + " " + id);
        System.out.println(new HashSet<>(List.of(a, b, c)).size());
        System.out.println(new PlainStudent("Ala", 1001).equals(new PlainStudent("Ala", 1001)));
    }
}`,
    kt: `// KlasyDanych/Student.kt

data class Student(val name: String, val id: Int, val year: Int = 1)

class PlainStudent(val name: String, val id: Int)      // zwykła klasa

fun main() {
    val a = Student("Ala", 1001)
    val b = Student("Ala", 1001)
    println(a)                         // toString z właściwościami
    println(a == b)                    // equals porównuje właściwości
    println(a === b)                   // ale to nadal dwa obiekty
    val c = a.copy(year = 2)           // kopia ze zmianą jednej właściwości
    println(c)
    val (name, id) = c                 // destrukturyzacja
    println("$name $id")
    println(setOf(a, b, c).size)       // a i b to w zbiorze jeden element

    val p = PlainStudent("Ala", 1001)
    val q = PlainStudent("Ala", 1001)
    println(p == q)                    // zwykła klasa: porównanie referencji
}
/* Output:
Student(name=Ala, id=1001, year=1)
true
false
Student(name=Ala, id=1001, year=2)
Ala 1001
2
false
*/`,
    changes: [
        "`data class` generuje `equals`, `hashCode`, `toString`, `copy` i funkcje do destrukturyzacji na podstawie właściwości z konstruktora głównego.",
        "`==` w Kotlinie wywołuje `equals`. W zwykłej klasie `equals` pochodzi z `Any` i porównuje referencje, więc dwa obiekty z tymi samymi danymi są różne.",
        "`copy(year = 2)` tworzy nowy obiekt, zmieniając tylko wskazane właściwości. Razem z `val` pozwala to pisać klasy niemodyfikowalne.",
        "Dzięki `hashCode` klasy danych działają po wartości w zbiorach i jako klucze map.",
        "Java 16+ ma `record Student(String name, int id)`: podobny skrót, ale bez `copy` i wartości domyślnych, a akcesory nazywają się `name()`, nie `getName()`."
    ],
    traps: [
        { text: "Do `equals`, `hashCode` i `toString` wchodzą tylko właściwości z konstruktora głównego. Właściwość zadeklarowana w ciele klasy jest pomijana." },
        { text: "Obiekt z `var` włożony do `HashSet` albo użyty jako klucz `HashMap` po zmianie właściwości „ginie”, bo zmienia się jego `hashCode`. Lepiej `val` i `copy`." },
        { text: "`copy` robi płytką kopię: lista w środku jest wspólna dla oryginału i kopii." }
    ],
    extras: [
        {
            lang: "py",
            title: "@dataclass",
            text: "`@dataclass` to niemal dokładny odpowiednik: generuje `__init__`, `__eq__` i `__repr__`. `frozen=True` odpowiada `val` i jest potrzebne, żeby obiekt dało się włożyć do zbioru. Kopię ze zmianą robi `dataclasses.replace`.",
            code: `from dataclasses import dataclass, replace

@dataclass(frozen=True)        # frozen: pola tylko do odczytu, jak val
class Student:
    name: str
    id: int
    year: int = 1

a = Student("Ala", 1001)
b = Student("Ala", 1001)
print(a)                       # Student(name='Ala', id=1001, year=1)
print(a == b, a is b)          # True False
c = replace(a, year=2)         # odpowiednik copy(year = 2)
print(c.year)                  # 2
print(len({a, b, c}))          # 2`
        }
    ],
    exercise: {
        task: "Zamień `Book` na klasę danych z właściwościami `title`, `author` i `year`. Sprawdź, że dwie książki z tymi samymi danymi są równe, i zrób kopię z innym rokiem wydania.",
        expected: "true\nBook(title=Solaris, author=Stanisław Lem, year=2021)",
        starter: `// zamień na klasę danych z właściwościami title, author, year
class Book

fun main() {
    val b1 = Book("Solaris", "Stanisław Lem", 1961)
    val b2 = Book("Solaris", "Stanisław Lem", 1961)
    println(b1 == b2)
    val b3 = b1.copy(year = 2021)
    println(b3)
}`,
        solution: `data class Book(val title: String, val author: String, val year: Int)

fun main() {
    val b1 = Book("Solaris", "Stanisław Lem", 1961)
    val b2 = Book("Solaris", "Stanisław Lem", 1961)
    println(b1 == b2)
    val b3 = b1.copy(year = 2021)
    println(b3)
}`
    },
    cheats: [
        { from: "java", src: "equals() + hashCode() + toString()", kt: "data class", note: "" },
        { from: "java", src: "record Point(int x, int y)", kt: "data class Point(val x: Int, val y: Int)", note: "" },
        { from: "java", src: "a.equals(b)", kt: "a == b", note: "" },
        { from: "java", src: "new Student(s.getName(), s.getId(), 2)", kt: "s.copy(year = 2)", note: "" },
        { from: "py", src: "@dataclass(frozen=True)", kt: "data class", note: "" },
        { from: "py", src: "dataclasses.replace(s, year=2)", kt: "s.copy(year = 2)", note: "" }
    ],
    keywords: "klasa danych data class record dataclass equals hashCode toString copy destrukturyzacja porównanie wartość"
});
