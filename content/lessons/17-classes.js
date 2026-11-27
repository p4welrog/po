LESSONS.push({
    id: "classes",
    track: "oop",
    title: "Klasy i obiekty",
    lecture: "IIa",
    atom: ["Objects Everywhere", "Creating Classes"],
    intro: "Klasa łączy dane (właściwości) z operacjami na nich (metodami). Obiekt to konkretny egzemplarz klasy z własnym stanem. W C dane trzymasz w `struct`, a funkcje piszesz obok; w klasie jedno i drugie jest razem, a obiekt „wie”, co potrafi.",
    java: `// Counter.java i Main.java (tu w jednym pliku)

class Counter {
    private int count = 0;

    // to Kotlin generuje sam dla „var count”
    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }

    public void increment() {
        count++;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter a = new Counter();
        Counter b = new Counter();
        a.increment();
        a.increment();
        b.increment();
        System.out.println("a: " + a.getCount() + ", b: " + b.getCount());

        Counter c = a;
        c.increment();
        System.out.println("a: " + a.getCount());
        System.out.println(a == c);
        System.out.println(a == b);
    }
}`,
    kt: `// Klasy/Counter.kt

class Counter {
    var count = 0          // właściwość: stan obiektu

    fun increment() {      // metoda: zachowanie obiektu
        count++
    }
}

fun main() {
    val a = Counter()      // tworzenie obiektu: bez słowa new
    val b = Counter()
    a.increment()
    a.increment()
    b.increment()
    println("a: \${a.count}, b: \${b.count}")

    val c = a              // druga referencja do TEGO SAMEGO obiektu
    c.increment()
    println("a: \${a.count}")
    println(a === c)       // czy to ten sam obiekt?
    println(a === b)
}
/* Output:
a: 2, b: 1
a: 3
true
false
*/`,
    changes: [
        "Obiekt tworzy się wywołaniem konstruktora jak funkcji: `Counter()`. Nie ma słowa `new`.",
        "`var count` w klasie to właściwość. Kotlin sam tworzy pole i akcesory, które w Javie trzeba napisać ręcznie (`getCount`, `setCount`).",
        "Zmienna typu klasy przechowuje referencję do obiektu. `val c = a` nie kopiuje obiektu, tylko daje mu drugą nazwę.",
        "`===` sprawdza, czy to ten sam obiekt (w Javie `==` dla obiektów). Kotlinowe `==` wywołuje `equals` (więcej w lekcji o klasach danych).",
        "Domyślna widoczność w Kotlinie to `public`. W Javie brak modyfikatora oznacza widoczność w pakiecie.",
        "W jednym pliku `.kt` może być wiele klas i funkcji najwyższego poziomu, a `main` nie musi być w klasie. W Javie każda klasa publiczna ma własny plik, a `main` jest metodą statyczną."
    ],
    traps: [
        { text: "`val a = Counter()` blokuje tylko przypisanie innego obiektu do `a`. Stan obiektu (`a.count`) nadal można zmieniać." },
        { text: "`val x = Counter` bez nawiasów to błąd kompilacji: nazwa klasy to nie obiekt." }
    ],
    extras: [
        {
            lang: "cpp",
            title: "Obiekt jako wartość",
            text: "W C++ obiekt może być zwykłą wartością na stosie, a przypisanie kopiuje cały obiekt. W Kotlinie, Javie i Pythonie zmienna zawsze trzyma referencję. `struct` i `class` w C++ różnią się tylko domyślną widocznością.",
            code: `#include <iostream>

class Counter {
public:                  // w class domyślnie private, w struct domyślnie public
    int count = 0;
    void increment() { count++; }
};

int main() {
    Counter a;           // obiekt powstaje od razu, bez new
    Counter b = a;       // KOPIA całego obiektu, nie druga referencja
    a.increment();
    std::cout << a.count << " " << b.count << "\\n";   // 1 0

    Counter& c = a;      // referencję trzeba zaznaczyć jawnie (&)
    c.increment();
    std::cout << a.count << "\\n";                      // 2
}`
        },
        {
            lang: "py",
            title: "self i __init__",
            text: "Model jest ten sam co w Kotlinie: zmienne to referencje, a `is` odpowiada `===`. Różnice: `self` piszesz jawnie w każdej metodzie, a atrybuty powstają w `__init__`, nie w ciele klasy, więc kompilator ich nie sprawdza.",
            code: `class Counter:
    def __init__(self):          # atrybuty powstają w __init__
        self.count = 0

    def increment(self):         # self trzeba pisać jawnie
        self.count += 1

a = Counter()
b = Counter()
a.increment()
a.increment()
b.increment()
print(f"a: {a.count}, b: {b.count}")    # a: 2, b: 1

c = a                            # referencja, jak w Kotlinie
c.increment()
print(a.count)                   # 3
print(a is c, a is b)            # True False`
        }
    ],
    exercise: {
        task: "Dodaj do klasy `Lamp` właściwość `on` (na początku `false`) i metodę `toggle()`, która ją przełącza. Przełącz lampę trzy razy i wypisz stan po każdym przełączeniu.",
        expected: "true\nfalse\ntrue",
        starter: `class Lamp {
    // dodaj właściwość on i metodę toggle()
}

fun main() {
    val lamp = Lamp()
    // przełącz lampę trzy razy i wypisz jej stan po każdym przełączeniu
}`,
        solution: `class Lamp {
    var on = false

    fun toggle() {
        on = !on
    }
}

fun main() {
    val lamp = Lamp()
    repeat(3) {
        lamp.toggle()
        println(lamp.on)
    }
}`
    },
    cheats: [
        { from: "java", src: "new Counter()", kt: "Counter()", note: "" },
        { from: "java", src: "a == b  (te same obiekty?)", kt: "a === b", note: "`==` w Kotlinie to `equals`" },
        { from: "java", src: "private int count; getCount(); setCount()", kt: "var count = 0", note: "akcesory generuje kompilator" },
        { from: "py", src: "self.count", kt: "count  (albo this.count)", note: "" },
        { from: "py", src: "a is b", kt: "a === b", note: "" }
    ],
    keywords: "klasa obiekt class new instancja egzemplarz referencja this self struct właściwość metoda tożsamość"
});
