LESSONS.push({
    id: "constructors",
    track: "oop",
    title: "Właściwości i konstruktory",
    lecture: "IIa",
    atom: ["Properties", "Constructors"],
    intro: "Konstruktor przygotowuje nowy obiekt do użycia. W Kotlinie najczęściej wystarcza konstruktor główny w nagłówku klasy: parametry z `val` lub `var` od razu stają się właściwościami. Java potrzebuje do tego pól, konstruktora i getterów.",
    java: `import java.util.ArrayList;
import java.util.List;

class Point {
    private final int x;              // val → final, tylko getter
    private int y;                    // var → getter i setter
    private final String label;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
        System.out.println("Tworzę punkt (" + x + ", " + y + ")");
        this.label = "(" + x + ", " + y + ")";
    }

    public int getX() { return x; }
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
    public String getLabel() { return label; }
}

class Student {
    private final String name;
    private final int year;
    private final List<Integer> grades = new ArrayList<>();

    public Student(String name, int year) {
        this.name = name;
        this.year = year;
    }

    public Student(String name) {     // zamiast wartości domyślnej:
        this(name, 1);                // drugi konstruktor
    }

    public String getName() { return name; }
    public int getYear() { return year; }
    public List<Integer> getGrades() { return grades; }
}

public class Main {
    public static void main(String[] args) {
        Point p = new Point(3, 4);
        System.out.println(p.getX());
        p.setY(10);
        System.out.println(p.getX() + " " + p.getY() + " " + p.getLabel());

        Student s1 = new Student("Ala");
        Student s2 = new Student("Jan", 2);
        s1.getGrades().add(5);
        System.out.println(s1.getName() + " " + s1.getYear() + " " + s1.getGrades());
        System.out.println(s2.getName() + " " + s2.getYear() + " " + s2.getGrades());
    }
}`,
    kt: `// Konstruktory/Point.kt

class Point(val x: Int, var y: Int) {     // konstruktor główny
    init {                                 // wykonuje się przy tworzeniu obiektu
        println("Tworzę punkt ($x, $y)")
    }

    val label = "($x, $y)"                 // liczone raz, przy tworzeniu
}

class Student(val name: String, val year: Int = 1) {
    val grades = mutableListOf<Int>()
}

fun main() {
    val p = Point(3, 4)
    println(p.x)
    p.y = 10                // var: można zmienić
    // p.x = 5              // błąd kompilacji: x to val
    println("\${p.x} \${p.y} \${p.label}")

    val s1 = Student("Ala")
    val s2 = Student("Jan", year = 2)
    s1.grades += 5
    println("\${s1.name} \${s1.year} \${s1.grades}")
    println("\${s2.name} \${s2.year} \${s2.grades}")
}
/* Output:
Tworzę punkt (3, 4)
3
3 10 (3, 4)
Ala 1 [5]
Jan 2 []
*/`,
    changes: [
        "`class Point(val x: Int, var y: Int)` to klasa, konstruktor główny i dwie właściwości w jednej linii.",
        "Parametr bez `val`/`var` jest tylko parametrem konstruktora: widać go w `init` i inicjalizatorach, ale nie jest właściwością obiektu.",
        "Blok `init { }` wykonuje się przy tworzeniu obiektu, razem z inicjalizatorami właściwości, w kolejności zapisu.",
        "`val` odpowiada w Javie polu `final` z samym getterem, `var` – polu z getterem i setterem.",
        "Wartości domyślne i argumenty nazwane (`Student(\"Jan\", year = 2)`) zastępują przeciążanie konstruktorów. W Javie dopisuje się drugi konstruktor, który woła pierwszy przez `this(...)`.",
        "Kotlin ma też konstruktory dodatkowe (`constructor(...) : this(...)`), ale przy wartościach domyślnych rzadko są potrzebne."
    ],
    traps: [
        { text: "`val label = \"($x, $y)\"` liczy się raz, przy tworzeniu obiektu. Po zmianie `p.y` napis jest nieaktualny. Wartość liczoną przy każdym odczycie daje getter (następna lekcja)." },
        { text: "W `class Point(x: Int)` bez `val` odwołanie `p.x` się nie skompiluje: `x` jest tylko parametrem." }
    ],
    extras: [
        {
            lang: "py",
            title: "@property: atrybut, który jest metodą",
            text: "W Pythonie `@property` pozwala zamienić atrybut na metodę bez zmiany kodu, który go używa (`p.x` zostaje `p.x`). Właściwość w Kotlinie działa tak od początku: odczyt `p.x` zawsze przechodzi przez getter, nawet jeśli go nie napisałeś.",
            code: `class Point:
    def __init__(self, x, y):
        self._x = x
        self.y = y
        print(f"Tworzę punkt ({x}, {y})")

    @property
    def x(self):            # odczyt p.x wywołuje tę metodę
        return self._x      # brak settera: jak val w Kotlinie

p = Point(3, 4)
p.y = 10
print(p.x, p.y)             # 3 10
try:
    p.x = 5
except AttributeError:
    print("x jest tylko do odczytu")`
        }
    ],
    exercise: {
        task: "Uzupełnij klasę `Rectangle`: szerokość i wysokość tylko do odczytu, wysokość domyślnie równa szerokości, a właściwość `area` liczona przy tworzeniu obiektu.",
        expected: "3 x 5 = 15\n4 x 4 = 16",
        starter: `// uzupełnij klasę: szerokość i wysokość tylko do odczytu, pole liczone przy tworzeniu
class Rectangle

fun main() {
    val r = Rectangle(3, 5)
    println("\${r.width} x \${r.height} = \${r.area}")
    val square = Rectangle(4)      // kwadrat: wysokość domyślnie równa szerokości
    println("\${square.width} x \${square.height} = \${square.area}")
}`,
        solution: `class Rectangle(val width: Int, val height: Int = width) {
    val area = width * height
}

fun main() {
    val r = Rectangle(3, 5)
    println("\${r.width} x \${r.height} = \${r.area}")
    val square = Rectangle(4)
    println("\${square.width} x \${square.height} = \${square.area}")
}`
    },
    cheats: [
        { from: "java", src: "private final int x; public Point(int x) { this.x = x; } getX()", kt: "class Point(val x: Int)", note: "konstruktor główny" },
        { from: "java", src: "this(name, 1);  (drugi konstruktor)", kt: "class Student(val name: String, val year: Int = 1)", note: "wartość domyślna" },
        { from: "java", src: "final", kt: "val", note: "" },
        { from: "py", src: "def __init__(self, x): self.x = x", kt: "class Point(val x: Int)", note: "" },
        { from: "py", src: "@property", kt: "val x: Int get() = ...", note: "" }
    ],
    keywords: "konstruktor constructor init __init__ właściwość property pole field val var final this domyślny parametr przeciążanie"
});
