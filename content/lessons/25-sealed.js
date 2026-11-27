LESSONS.push({
    id: "sealed",
    track: "oop",
    title: "Klasy zapieczętowane",
    lecture: "IVb",
    atom: ["Sealed Classes", "Type Checking", "Downcasting"],
    intro: "Czasem wiadomo z góry, jakie są wszystkie odmiany czegoś: płatność to gotówka, karta albo przelew. Klasa zapieczętowana (`sealed`) zamyka listę podklas, a `when` z `is` może je obsłużyć bez `else`. Po sprawdzeniu typu kompilator sam traktuje zmienną jako podklasę.",
    java: `import java.util.List;

// Java 17+: sealed + permits, Java 21+: switch z wzorcami
sealed abstract class Payment permits Cash, Card, Transfer {
    private final int amount;
    protected Payment(int amount) { this.amount = amount; }
    public int getAmount() { return amount; }
}

final class Cash extends Payment {
    public Cash(int amount) { super(amount); }
}

final class Card extends Payment {
    private final String number;
    public Card(int amount, String number) { super(amount); this.number = number; }
    public String getNumber() { return number; }
}

final class Transfer extends Payment {
    private final int days;
    public Transfer(int amount, int days) { super(amount); this.days = days; }
    public int getDays() { return days; }
}

public class Main {
    static String describe(Payment p) {
        return switch (p) {
            case Cash c -> "gotówka: " + c.getAmount() + " zł";
            case Card c -> "karta **" + c.getNumber().substring(c.getNumber().length() - 4)
                + ": " + c.getAmount() + " zł";
            case Transfer t -> "przelew (" + t.getDays() + " dni): " + t.getAmount() + " zł";
        };
    }

    static int fee(Payment p) {
        if (p instanceof Card c) return c.getAmount() / 100;   // nowa zmienna c
        return 0;
    }

    public static void main(String[] args) {
        List<Payment> payments = List.of(
            new Cash(50), new Card(200, "1234567812345678"), new Transfer(1000, 2));
        for (Payment p : payments) System.out.println(describe(p));
        int sum = 0;
        for (Payment p : payments) sum += fee(p);
        System.out.println(sum);

        Card card = payments.get(1) instanceof Card c ? c : null;
        System.out.println(card != null ? card.getNumber().length() : null);
        System.out.println(payments.get(0) instanceof Card c ? c.getNumber() : null);
    }
}`,
    kt: `// Zapieczetowane/Payment.kt

sealed class Payment(val amount: Int)
class Cash(amount: Int) : Payment(amount)
class Card(amount: Int, val number: String) : Payment(amount)
class Transfer(amount: Int, val days: Int) : Payment(amount)

fun describe(p: Payment): String = when (p) {
    is Cash -> "gotówka: \${p.amount} zł"
    is Card -> "karta **\${p.number.takeLast(4)}: \${p.amount} zł"   // tu p jest typu Card
    is Transfer -> "przelew (\${p.days} dni): \${p.amount} zł"
}   // bez else: kompilator zna wszystkie podklasy

fun fee(p: Payment): Int {
    if (p is Card) return p.amount / 100        // inteligentne rzutowanie w if
    return 0
}

fun main() {
    val payments = listOf(Cash(50), Card(200, "1234567812345678"), Transfer(1000, 2))
    for (p in payments) println(describe(p))
    println(payments.sumOf { fee(it) })

    val card = payments[1] as? Card              // bezpieczne rzutowanie w dół
    println(card?.number?.length)
    println((payments[0] as? Card)?.number)      // to nie karta: null
}
/* Output:
gotówka: 50 zł
karta **5678: 200 zł
przelew (2 dni): 1000 zł
2
16
null
*/`,
    changes: [
        "`sealed class` ma znaną listę bezpośrednich podklas (ten sam pakiet i moduł). W Javie 17+ odpowiada jej `sealed ... permits`.",
        "`when` z `is` po klasie zapieczętowanej nie potrzebuje `else`. Po dodaniu nowej podklasy kompilator pokaże każde niekompletne `when`.",
        "Inteligentne rzutowanie (smart cast): po `is Card` zmienna `p` ma typ `Card` bez jawnego rzutowania. W Javie 16+ `instanceof Card c` wprowadza nową zmienną `c`.",
        "`is` odpowiada `instanceof`, a `!is` to zaprzeczenie.",
        "`as` rzutuje w dół i rzuca `ClassCastException` przy błędzie. `as?` zamiast wyjątku daje `null`."
    ],
    traps: [
        { text: "Inteligentne rzutowanie nie działa dla właściwości `var` (mogłaby się zmienić między sprawdzeniem a użyciem). Przepisz ją najpierw do lokalnego `val`." },
        { text: "`else` w `when` po klasie zapieczętowanej wyłącza ochronę: nowa podklasa trafi do `else` bez żadnego ostrzeżenia." },
        { text: "Długi łańcuch `if (x is A) … else if (x is B) …` po zwykłej, otwartej hierarchii zwykle oznacza, że brakuje metody polimorficznej (lekcja 24)." }
    ],
    extras: [],
    exercise: {
        task: "Dopisz podklasy `Move(steps)`, `Turn(degrees)` i `Stop` klasy zapieczętowanej `Command` oraz funkcję `execute`, która zwraca opis polecenia. Użyj `when` z `is` bez `else`.",
        expected: "naprzód o 3\nobracam się o 90°\nnaprzód o 1\nstop",
        starter: `sealed class Command
// dodaj podklasy: Move(steps: Int), Turn(degrees: Int), Stop

fun execute(c: Command): String = TODO()   // użyj when z is, bez else

fun main() {
    val program = listOf(Move(3), Turn(90), Move(1), Stop())
    for (c in program) println(execute(c))
}`,
        solution: `sealed class Command
class Move(val steps: Int) : Command()
class Turn(val degrees: Int) : Command()
class Stop : Command()

fun execute(c: Command): String = when (c) {
    is Move -> "naprzód o \${c.steps}"
    is Turn -> "obracam się o \${c.degrees}°"
    is Stop -> "stop"
}

fun main() {
    val program = listOf(Move(3), Turn(90), Move(1), Stop())
    for (c in program) println(execute(c))
}`
    },
    cheats: [
        { from: "java", src: "sealed class A permits B, C", kt: "sealed class A", note: "podklasy w tym samym pakiecie" },
        { from: "java", src: "x instanceof Card", kt: "x is Card", note: "" },
        { from: "java", src: "if (x instanceof Card c) c.getNumber()", kt: "if (x is Card) x.number", note: "inteligentne rzutowanie" },
        { from: "java", src: "(Card) x", kt: "x as Card", note: "" },
        { from: "java", src: "x instanceof Card c ? c : null", kt: "x as? Card", note: "" },
        { from: "py", src: "isinstance(x, Card)", kt: "x is Card", note: "" }
    ],
    keywords: "sealed zapieczętowana is as as? instanceof smart cast inteligentne rzutowanie rzutowanie w dół when isinstance"
});
