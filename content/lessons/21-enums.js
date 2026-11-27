LESSONS.push({
    id: "enums",
    track: "oop",
    title: "Wyliczenia",
    lecture: "IIIa",
    atom: ["Enumerations"],
    intro: "Wyliczenie (`enum class`) to typ z zamkniętym zbiorem wartości, np. kierunki świata albo kolory świateł. Każda wartość jest obiektem, więc może mieć właściwości i metody, a `when` po wyliczeniu kompilator sprawdza pod kątem kompletności.",
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

enum Direction {
    NORTH(0, 1), EAST(1, 0), SOUTH(0, -1), WEST(-1, 0);

    private final int dx, dy;

    Direction(int dx, int dy) {
        this.dx = dx;
        this.dy = dy;
    }

    public int getDx() { return dx; }
    public int getDy() { return dy; }

    public Direction turnRight() {
        return switch (this) {          // switch jako wyrażenie: Java 14+
            case NORTH -> EAST;
            case EAST -> SOUTH;
            case SOUTH -> WEST;
            case WEST -> NORTH;
        };
    }
}

public class Main {
    static String describe(Direction d) {
        return switch (d) {
            case NORTH, SOUTH -> "pionowo";
            case EAST, WEST -> "poziomo";
        };
    }

    public static void main(String[] args) {
        Direction d = Direction.NORTH;
        List<Direction> path = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            path.add(d);
            d = d.turnRight();
        }
        System.out.println(path);
        System.out.println(Direction.WEST.getDx() + ", " + Direction.WEST.getDy());
        System.out.println(describe(Direction.EAST));
        System.out.println(Direction.values().length);
        System.out.println(Direction.valueOf("SOUTH").ordinal());
        System.out.println(Arrays.stream(Direction.values())
            .map(x -> x.name().toLowerCase()).toList());
    }
}`,
    kt: `// Wyliczenia/Direction.kt

enum class Direction(val dx: Int, val dy: Int) {
    NORTH(0, 1), EAST(1, 0), SOUTH(0, -1), WEST(-1, 0);   // średnik przed metodami

    fun turnRight(): Direction = when (this) {
        NORTH -> EAST
        EAST -> SOUTH
        SOUTH -> WEST
        WEST -> NORTH
    }
}

fun describe(d: Direction): String = when (d) {
    Direction.NORTH, Direction.SOUTH -> "pionowo"
    Direction.EAST, Direction.WEST -> "poziomo"
}   // bez else: kompilator sprawdza, że są wszystkie wartości

fun main() {
    var d = Direction.NORTH
    val path = mutableListOf<Direction>()
    repeat(5) {
        path += d
        d = d.turnRight()
    }
    println(path)
    println("\${Direction.WEST.dx}, \${Direction.WEST.dy}")
    println(describe(Direction.EAST))
    println(Direction.entries.size)
    println(Direction.valueOf("SOUTH").ordinal)
    println(Direction.entries.map { it.name.lowercase() })
}
/* Output:
[NORTH, EAST, SOUTH, WEST, NORTH]
-1, 0
poziomo
4
2
[north, east, south, west]
*/`,
    changes: [
        "`enum class` w Kotlinie odpowiada `enum` w Javie. Wartości mogą mieć właściwości z konstruktora (`NORTH(0, 1)`) i metody.",
        "`when` po wyliczeniu bez `else` musi obsłużyć wszystkie wartości. Po dodaniu nowej wartości kompilator wskaże każde miejsce do poprawienia.",
        "`entries` zwraca listę wszystkich wartości (w Javie `values()` daje tablicę). `name`, `ordinal` i `valueOf` działają jak w Javie.",
        "Wewnątrz wyliczenia wartości pisze się bez prefiksu (`NORTH`), poza nim z nazwą typu (`Direction.NORTH`)."
    ],
    traps: [
        { text: "Gdy po wartościach są metody, po ostatniej wartości musi stać średnik." },
        { text: "`Direction.valueOf(\"north\")` rzuca `IllegalArgumentException`: wielkość liter ma znaczenie." },
        { text: "`ordinal` zależy od kolejności zapisu. Nie zapisuj go do pliku ani bazy, bo po zmianie kolejności dane stracą sens." }
    ],
    extras: [
        {
            lang: "cpp",
            title: "enum a enum class",
            text: "`enum` z C (i C++) to nazwane liczby: można je dodawać do `int` i mieszać między sobą. `enum class` z C++11 jest osobnym typem, bliżej Kotlina, ale jego wartości nie mają właściwości ani metod i nie da się wprost wypisać ich nazwy.",
            code: `#include <iostream>

enum Color { RED, GREEN, BLUE };          // jak w C: nazwane liczby
enum class Direction { NORTH, EAST, SOUTH, WEST };

int main() {
    int x = BLUE + 10;                     // kompiluje się: BLUE to po prostu 2
    // int y = Direction::EAST + 1;        // błąd: enum class nie jest liczbą
    Direction d = Direction::EAST;         // nazwa zawsze z prefiksem
    std::cout << x << " " << static_cast<int>(d) << "\\n";   // 12 1
}`
        }
    ],
    exercise: {
        task: "Uzupełnij `TrafficLight`: wartości `RED`, `GREEN`, `YELLOW` z czasem trwania (30, 25, 5 sekund) oraz metodę `next()` zmieniającą światło w kolejności RED → GREEN → YELLOW → RED.",
        expected: "RED 30 s\nGREEN 25 s\nYELLOW 5 s\nRED 30 s",
        starter: `// dodaj wartości RED, GREEN, YELLOW z czasem trwania w sekundach (30, 25, 5)
// i metodę next(): RED -> GREEN -> YELLOW -> RED
enum class TrafficLight

fun main() {
    var light = TrafficLight.RED
    repeat(4) {
        println("$light \${light.seconds} s")
        light = light.next()
    }
}`,
        solution: `enum class TrafficLight(val seconds: Int) {
    RED(30), GREEN(25), YELLOW(5);

    fun next(): TrafficLight = when (this) {
        RED -> GREEN
        GREEN -> YELLOW
        YELLOW -> RED
    }
}

fun main() {
    var light = TrafficLight.RED
    repeat(4) {
        println("$light \${light.seconds} s")
        light = light.next()
    }
}`
    },
    cheats: [
        { from: "java", src: "enum Color { RED, GREEN }", kt: "enum class Color { RED, GREEN }", note: "" },
        { from: "java", src: "Color.values()", kt: "Color.entries", note: "lista zamiast tablicy" },
        { from: "java", src: "switch (c) { case RED -> ... }", kt: "when (c) { Color.RED -> ... }", note: "kompletność sprawdza kompilator" },
        { from: "c", src: "enum Color { RED, GREEN };", kt: "enum class Color { RED, GREEN }", note: "to nie są liczby" },
        { from: "py", src: "class Color(Enum): RED = 1", kt: "enum class Color { RED }", note: "" }
    ],
    keywords: "wyliczenie enum enumeracja when switch entries values valueOf ordinal name stała"
});
