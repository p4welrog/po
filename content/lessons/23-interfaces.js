LESSONS.push({
    id: "interfaces",
    track: "oop",
    title: "Interfejsy",
    lecture: "IVa",
    atom: ["Interfaces"],
    intro: "Interfejs opisuje, co obiekt potrafi, bez mówienia, jak to robi. Funkcja, która przyjmuje `Shape`, zadziała dla każdej klasy implementującej ten interfejs, także takiej, która powstanie później.",
    java: `import java.util.List;

interface Shape {
    String getName();                       // „val name” w interfejsie to getter
    double area();
    default String describe() {             // default: metoda z implementacją
        return getName() + ", pole " + area();
    }
}

interface Scalable {
    Shape scaled(double k);
}

class Rectangle implements Shape, Scalable {
    private final double w, h;
    public Rectangle(double w, double h) { this.w = w; this.h = h; }

    @Override public String getName() { return "prostokąt"; }
    @Override public double area() { return w * h; }
    @Override public Rectangle scaled(double k) { return new Rectangle(w * k, h * k); }
}

class Triangle implements Shape {
    private final double base, height;
    public Triangle(double base, double height) { this.base = base; this.height = height; }

    @Override public String getName() { return "trójkąt"; }
    @Override public double area() { return base * height / 2; }
}

public class Main {
    static double totalArea(List<Shape> shapes) {
        double sum = 0;
        for (Shape s : shapes) sum += s.area();
        return sum;
    }

    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Rectangle(2.0, 3.0), new Triangle(4.0, 3.0));
        for (Shape s : shapes) System.out.println(s.describe());
        System.out.println(totalArea(shapes));
        System.out.println(new Rectangle(1.0, 2.0).scaled(3.0).describe());
    }
}`,
    kt: `// Interfejsy/Shape.kt

interface Shape {
    val name: String                       // właściwość abstrakcyjna
    fun area(): Double                     // metoda abstrakcyjna
    fun describe() = "$name, pole \${area()}"   // metoda z implementacją
}

interface Scalable {
    fun scaled(k: Double): Shape
}

class Rectangle(val w: Double, val h: Double) : Shape, Scalable {
    override val name = "prostokąt"
    override fun area() = w * h
    override fun scaled(k: Double) = Rectangle(w * k, h * k)
}

class Triangle(val base: Double, val height: Double) : Shape {
    override val name = "trójkąt"
    override fun area() = base * height / 2
}

fun totalArea(shapes: List<Shape>): Double =    // działa dla każdego kształtu
    shapes.sumOf { it.area() }

fun main() {
    val shapes: List<Shape> = listOf(Rectangle(2.0, 3.0), Triangle(4.0, 3.0))
    for (s in shapes) println(s.describe())
    println(totalArea(shapes))
    println(Rectangle(1.0, 2.0).scaled(3.0).describe())
}
/* Output:
prostokąt, pole 6.0
trójkąt, pole 6.0
12.0
prostokąt, pole 18.0
*/`,
    changes: [
        "Klasa implementuje interfejs po dwukropku: `class Triangle(...) : Shape`. Java używa `implements`.",
        "`override` jest obowiązkowe. W Javie `@Override` to adnotacja, którą można pominąć.",
        "Interfejs może mieć właściwości (bez pola, w Javie to gettery) i metody z implementacją (w Javie `default`).",
        "Klasa może implementować wiele interfejsów naraz: `Rectangle : Shape, Scalable`.",
        "Zmienna typu `Shape` może wskazywać obiekt dowolnej klasy implementującej `Shape`. Wywołanie `s.area()` wybiera metodę właściwą dla obiektu (polimorfizm)."
    ],
    traps: [
        { text: "Interfejs nie przechowuje stanu: `val name: String = \"x\"` w interfejsie to błąd kompilacji. Można natomiast napisać getter: `val name: String get() = \"x\"`." },
        { text: "Bez `override` metoda o tej samej nazwie nie jest „cichą nową metodą”, tylko błędem kompilacji." }
    ],
    extras: [
        {
            lang: "py",
            title: "Duck typing",
            text: "Python nie wymaga interfejsów: funkcja przyjmie każdy obiekt, który ma metodę o właściwej nazwie („jeśli chodzi jak kaczka…”). Pomyłka wychodzi dopiero w czasie działania. Interfejs w Kotlinie i Javie przenosi tę kontrolę do kompilatora. Podobną rolę dla narzędzi sprawdzających typy pełni w Pythonie `typing.Protocol`.",
            code: `class Rectangle:
    def __init__(self, w, h):
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h

class Garden:
    def area(self):                 # przypadkiem ta sama nazwa metody
        return "duży ogród"

def total_area(shapes):             # przyjmie wszystko, co ma metodę area()
    return sum(s.area() for s in shapes)

print(total_area([Rectangle(2, 3), Rectangle(1, 1)]))   # 7
try:
    print(total_area([Rectangle(2, 3), Garden()]))
except TypeError as e:              # błąd wychodzi dopiero w czasie działania
    print("TypeError:", e)`
        }
    ],
    exercise: {
        task: "Dopisz klasy `Dog` i `Cat` implementujące interfejs `Animal`. Pies robi „hau”, kot „miau”.",
        expected: "Burek: hau\nMruczek: miau",
        starter: `interface Animal {
    val name: String
    fun sound(): String
    fun speak() = "$name: \${sound()}"
}

// dodaj klasy Dog i Cat implementujące Animal

fun main() {
    val animals: List<Animal> = listOf(Dog("Burek"), Cat("Mruczek"))
    for (a in animals) println(a.speak())
}`,
        solution: `interface Animal {
    val name: String
    fun sound(): String
    fun speak() = "$name: \${sound()}"
}

class Dog(override val name: String) : Animal {
    override fun sound() = "hau"
}

class Cat(override val name: String) : Animal {
    override fun sound() = "miau"
}

fun main() {
    val animals: List<Animal> = listOf(Dog("Burek"), Cat("Mruczek"))
    for (a in animals) println(a.speak())
}`
    },
    cheats: [
        { from: "java", src: "class A implements Shape", kt: "class A : Shape", note: "" },
        { from: "java", src: "@Override", kt: "override", note: "obowiązkowe" },
        { from: "java", src: "default String describe() { ... }", kt: "fun describe() = ...", note: "metoda z implementacją w interfejsie" },
        { from: "java", src: "String getName();  (w interfejsie)", kt: "val name: String", note: "" },
        { from: "py", src: "duck typing", kt: "interface Shape { fun area(): Double }", note: "kontrola w czasie kompilacji" }
    ],
    keywords: "interfejs interface implements override default polimorfizm duck typing protocol abstrakcja kontrakt"
});
