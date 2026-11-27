LESSONS.push({
    id: "visibility",
    track: "oop",
    title: "Widoczność i akcesory",
    lecture: "IIa, IIb",
    atom: ["Constraining Visibility", "Property Accessors"],
    intro: "Hermetyzacja oznacza, że obiekt sam pilnuje swojego stanu: z zewnątrz można zrobić tylko to, na co klasa pozwala. Służą do tego modyfikatory widoczności oraz akcesory, czyli getter i setter, które w Kotlinie są częścią właściwości.",
    java: `import java.util.ArrayList;
import java.util.List;

class BankAccount {
    private final String owner;
    private int balance = 0;
    private final List<String> history = new ArrayList<>();
    private int limit = 1000;

    public BankAccount(String owner) { this.owner = owner; }

    public String getOwner() { return owner; }
    public int getBalance() { return balance; }      // bez publicznego setBalance
    public int getOperations() { return history.size(); }

    public int getLimit() { return limit; }
    public void setLimit(int value) {
        if (value >= 0) limit = value;
    }

    public void deposit(int amount) {
        balance += amount;
        history.add("wpłata " + amount);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Ala");
        acc.deposit(100);
        acc.deposit(50);
        System.out.println(acc.getOwner() + ": " + acc.getBalance()
            + ", operacji: " + acc.getOperations());
        acc.setLimit(500);
        System.out.println(acc.getLimit());
        acc.setLimit(-1);
        System.out.println(acc.getLimit());
    }
}`,
    kt: `// Widocznosc/BankAccount.kt

class BankAccount(val owner: String) {
    var balance = 0                    // odczyt publiczny...
        private set                    // ...zapis tylko wewnątrz klasy

    private val history = mutableListOf<String>()

    val operations: Int                // właściwość bez pola:
        get() = history.size           // liczona przy każdym odczycie

    var limit = 1000
        set(value) {                   // własny setter
            if (value >= 0) field = value   // field = pole z wartością
        }

    fun deposit(amount: Int) {
        balance += amount
        history += "wpłata $amount"
    }
}

fun main() {
    val acc = BankAccount("Ala")
    acc.deposit(100)
    acc.deposit(50)
    println("\${acc.owner}: \${acc.balance}, operacji: \${acc.operations}")
    // acc.balance = 1_000_000         // błąd: setter jest prywatny
    // println(acc.history)            // błąd: właściwość prywatna
    acc.limit = 500
    println(acc.limit)
    acc.limit = -1                     // setter odrzuca wartość
    println(acc.limit)
}
/* Output:
Ala: 150, operacji: 2
500
500
*/`,
    changes: [
        "Modyfikatory: `public` (domyślny), `private` (tylko w klasie), `protected` (klasa i podklasy), `internal` (ten sam moduł). Java nie ma `internal`, za to ma domyślną widoczność w pakiecie.",
        "Odczyt `acc.balance` zawsze idzie przez getter, a zapis przez setter, także gdy ich nie napisałeś. Dlatego własny getter lub setter można dodać później bez zmiany kodu, który używa klasy.",
        "`private set` daje publiczny odczyt i prywatny zapis. W Javie odpowiada temu publiczny getter bez settera.",
        "`val operations: Int get() = ...` to właściwość bez pola, liczona przy każdym odczycie. W Javie to zwykła metoda `getOperations()`.",
        "W setterze `field` oznacza pole, w którym właściwość przechowuje wartość."
    ],
    traps: [
        { text: "W setterze `limit = value` zamiast `field = value` wywołuje ten sam setter jeszcze raz, bez końca: program kończy się `StackOverflowError`." },
        { text: "Własna metoda `getX()` obok właściwości `x` koliduje z getterem wygenerowanym przez Kotlina: błąd „platform declaration clash”. Albo właściwość, albo metoda (patrz lab 1)." },
        { text: "`private` na najwyższym poziomie pliku oznacza „widoczne w tym pliku”, a nie „w klasie”." }
    ],
    extras: [
        {
            lang: "py",
            title: "Prywatność jako umowa",
            text: "Python nie ma kontroli dostępu. `_x` to umowa między programistami, a `__x` tylko zmienia nazwę atrybutu. W Kotlinie i Javie `private` sprawdza kompilator: kod, który narusza hermetyzację, się nie skompiluje.",
            code: `class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self._balance = 0          # „_” to tylko umowa: nie ruszaj z zewnątrz
        self.__history = []        # „__” zmienia nazwę, ale nie blokuje dostępu

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        self._balance += amount
        self.__history.append(amount)

acc = BankAccount("Ala")
acc.deposit(100)
acc._balance = 1_000_000           # Python na to pozwala
print(acc.balance)                 # 1000000
print(acc._BankAccount__history)   # [100]`
        }
    ],
    exercise: {
        task: "Dodaj do klasy `Thermometer` setter, który odrzuca temperatury poniżej −273,15 °C, oraz właściwość `fahrenheit` liczoną przy każdym odczycie: `celsius * 9 / 5 + 32`.",
        expected: "68.0\n212.0\n100.0",
        starter: `class Thermometer {
    var celsius = 20.0
    // setter: odrzuć temperatury poniżej -273.15
    // dodaj właściwość fahrenheit liczoną przy każdym odczycie: celsius * 9 / 5 + 32
}

fun main() {
    val t = Thermometer()
    println(t.fahrenheit)
    t.celsius = 100.0
    println(t.fahrenheit)
    t.celsius = -300.0
    println(t.celsius)
}`,
        solution: `class Thermometer {
    var celsius = 20.0
        set(value) {
            if (value >= -273.15) field = value
        }

    val fahrenheit: Double
        get() = celsius * 9 / 5 + 32
}

fun main() {
    val t = Thermometer()
    println(t.fahrenheit)
    t.celsius = 100.0
    println(t.fahrenheit)
    t.celsius = -300.0
    println(t.celsius)
}`
    },
    cheats: [
        { from: "java", src: "public int getBalance() bez setBalance", kt: "var balance = 0\n    private set", note: "" },
        { from: "java", src: "public int getSize() { return list.size(); }", kt: "val size: Int get() = list.size", note: "właściwość bez pola" },
        { from: "java", src: "public void setLimit(int v) { if (v >= 0) limit = v; }", kt: "var limit = 0\n    set(v) { if (v >= 0) field = v }", note: "" },
        { from: "java", src: "(brak modyfikatora: pakiet)", kt: "internal", note: "najbliższy odpowiednik: moduł" },
        { from: "py", src: "self._x  (umowa)", kt: "private val x", note: "sprawdza kompilator" }
    ],
    keywords: "widoczność private public protected internal hermetyzacja enkapsulacja getter setter akcesor field get set private set"
});
