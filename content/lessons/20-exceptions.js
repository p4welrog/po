LESSONS.push({
    id: "exceptions",
    track: "oop",
    title: "Wyjątki",
    lecture: "IIb",
    atom: ["Exceptions", "Exception Handling"],
    intro: "Wyjątek przerywa normalny przebieg programu, gdy coś poszło nie tak, i wędruje w górę wywołań aż do pasującego `catch`. Składnia jest prawie jak w Javie. Najważniejsza różnica: Kotlin nie ma wyjątków sprawdzanych, więc kompilator nie zmusza do ich łapania.",
    java: `// wyjątek sprawdzany (checked): dziedziczy z Exception, nie z RuntimeException
class InsufficientFundsException extends Exception {
    private final int missing;

    public InsufficientFundsException(int missing) {
        super("Brakuje " + missing + " zł");
        this.missing = missing;
    }

    public int getMissing() { return missing; }
}

class Wallet {
    private int money;

    public Wallet(int money) {
        if (money < 0) throw new IllegalArgumentException("Ujemny stan: " + money);
        this.money = money;
    }

    public int getMoney() { return money; }

    // „throws” jest obowiązkowe dla wyjątku sprawdzanego
    public void pay(int amount) throws InsufficientFundsException {
        if (amount > money) throw new InsufficientFundsException(amount - money);
        money -= amount;
    }
}

public class Main {
    static int parsePrice(String text) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public static void main(String[] args) {
        Wallet w = new Wallet(100);
        try {
            w.pay(30);              // bez try/catch kod się nie skompiluje
        } catch (InsufficientFundsException e) {
            throw new IllegalStateException(e);
        }
        System.out.println(w.getMoney());
        try {
            w.pay(200);
            System.out.println("tego nie zobaczysz");
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage() + " (missing = " + e.getMissing() + ")");
        } finally {
            System.out.println("finally wykonuje się zawsze");
        }
        try {
            new Wallet(-5);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
        System.out.println(parsePrice("42") + parsePrice("abc"));
    }
}`,
    kt: `// Wyjatki/Wallet.kt

class InsufficientFundsException(val missing: Int) :
    Exception("Brakuje $missing zł")              // własny wyjątek

class Wallet(var money: Int) {
    init {
        if (money < 0) throw IllegalArgumentException("Ujemny stan: $money")
    }

    fun pay(amount: Int) {                         // bez „throws”
        if (amount > money) throw InsufficientFundsException(amount - money)
        money -= amount
    }
}

fun parsePrice(text: String): Int =
    try {                                          // try jest wyrażeniem
        text.toInt()
    } catch (e: NumberFormatException) {
        0
    }

fun main() {
    val w = Wallet(100)
    w.pay(30)                                      // kompilator nie wymusza try
    println(w.money)
    try {
        w.pay(200)
        println("tego nie zobaczysz")
    } catch (e: InsufficientFundsException) {
        println("\${e.message} (missing = \${e.missing})")
    } finally {
        println("finally wykonuje się zawsze")
    }
    try {
        Wallet(-5)
    } catch (e: IllegalArgumentException) {
        println(e.message)
    }
    println(parsePrice("42") + parsePrice("abc"))
}
/* Output:
70
Brakuje 130 zł (missing = 130)
finally wykonuje się zawsze
Ujemny stan: -5
42
*/`,
    changes: [
        "`throw IllegalArgumentException(\"...\")` jak w Javie, tylko bez `new`. Często rzuca się go w `init`, gdy konstruktor dostaje błędne dane.",
        "Kotlin nie ma wyjątków sprawdzanych (checked) ani słowa `throws`. W Javie wyjątek dziedziczący z `Exception` (a nie z `RuntimeException`) trzeba złapać albo zadeklarować w nagłówku metody.",
        "`try` jest wyrażeniem: jego wartością jest ostatnie wyrażenie z bloku `try` albo z `catch`.",
        "`finally` wykonuje się zawsze, także po `return` i po nieobsłużonym wyjątku.",
        "Własny wyjątek to klasa dziedzicząca z `Exception` lub innego wyjątku. Może mieć dodatkowe właściwości, np. `missing`. Dziedziczenie: lekcja 24."
    ],
    traps: [
        { text: "Bloki `catch` są sprawdzane po kolei. `catch (e: Exception)` na początku przechwyci wszystko, a dalsze bloki nigdy się nie wykonają." },
        { text: "Brak wyjątków sprawdzanych nie zwalnia z myślenia: opisz w dokumentacji (`@throws` w KDoc), co funkcja może rzucić." },
        { text: "Nie używaj wyjątków do zwykłego sterowania: zamiast `try` wokół `toInt()` lepiej `toIntOrNull()` z `?:` (lekcja „Bezpieczeństwo null”)." }
    ],
    extras: [],
    exercise: {
        task: "Niech `checkAge` rzuca `IllegalArgumentException` z komunikatem, gdy wiek jest spoza zakresu 0..150. W `main` złap wyjątek i wypisz jego komunikat.",
        expected: "20\nNiepoprawny wiek: -3\nNiepoprawny wiek: 200",
        starter: `// funkcja ma rzucić IllegalArgumentException, gdy wiek jest spoza zakresu 0..150
fun checkAge(age: Int): Int {
    return age
}

fun main() {
    for (age in listOf(20, -3, 200)) {
        // wywołaj checkAge, a przy wyjątku wypisz jego komunikat
        println(checkAge(age))
    }
}`,
        solution: `fun checkAge(age: Int): Int {
    if (age !in 0..150) throw IllegalArgumentException("Niepoprawny wiek: $age")
    return age
}

fun main() {
    for (age in listOf(20, -3, 200)) {
        try {
            println(checkAge(age))
        } catch (e: IllegalArgumentException) {
            println(e.message)
        }
    }
}`
    },
    cheats: [
        { from: "java", src: "throw new IllegalArgumentException(\"...\")", kt: "throw IllegalArgumentException(\"...\")", note: "" },
        { from: "java", src: "void pay() throws MyException", kt: "fun pay()", note: "brak wyjątków sprawdzanych" },
        { from: "java", src: "class MyException extends Exception", kt: "class MyException(msg: String) : Exception(msg)", note: "" },
        { from: "java", src: "e.getMessage()", kt: "e.message", note: "typ String?" },
        { from: "py", src: "raise ValueError(\"...\")", kt: "throw IllegalArgumentException(\"...\")", note: "" },
        { from: "py", src: "except ValueError as e:", kt: "catch (e: IllegalArgumentException)", note: "" }
    ],
    keywords: "wyjątek exception throw throws try catch finally raise except checked sprawdzany błąd IllegalArgumentException"
});
