import type { SyntaxSheet } from "./types";

export const designPatterns: SyntaxSheet = {
  tagline: "The common GoF patterns as minimal, idiomatic Java templates, grouped by category.",
  baseline: "GoF patterns",
  lang: "java",
  groups: [
    {
      title: "When to use which",
      rows: [
        {
          syntax: "Singleton",
          what: "Exactly one shared instance",
          example: "config, connection pool, logger",
        },
        {
          syntax: "Factory Method",
          what: "Pick the concrete type at runtime",
          example: "parser by file type",
        },
        {
          syntax: "Builder",
          what: "Build an object step by step",
          example: "object with many optional fields",
        },
        {
          syntax: "Adapter",
          what: "Make an incompatible API fit",
          example: "wrap a 3rd-party class",
        },
        {
          syntax: "Decorator",
          what: "Add behaviour without subclassing",
          example: "buffered / compressed stream",
        },
        {
          syntax: "Facade",
          what: "One simple entry over a subsystem",
          example: "service hides many classes",
        },
        {
          syntax: "Proxy",
          what: "Stand-in that controls access",
          example: "lazy load, caching, security",
        },
        {
          syntax: "Strategy",
          what: "Swap an algorithm at runtime",
          example: "sort order, payment method",
        },
        {
          syntax: "Observer",
          what: "Notify many on a change",
          example: "event listeners, pub/sub",
        },
        {
          syntax: "Template Method",
          what: "Fixed steps, variable details",
          example: "algorithm with hook methods",
        },
        {
          syntax: "Command",
          what: "Wrap an action as an object",
          example: "undo, queue, scheduling",
        },
      ],
    },
    {
      title: "Creational",
      rows: [],
      combos: [
        {
          label: "Singleton (enum — simplest, thread-safe)",
          code: `public enum Config {
    INSTANCE;
    private final Map<String,String> values = new HashMap<>();
    public String get(String k) { return values.get(k); }
}
// use: Config.INSTANCE.get("url");`,
        },
        {
          label: "Singleton (lazy holder idiom)",
          code: `public class Registry {
    private Registry() {}
    private static class Holder { static final Registry I = new Registry(); }
    public static Registry getInstance() { return Holder.I; }  // lazy + thread-safe
}`,
        },
        {
          label: "Factory Method",
          code: `interface Shape { double area(); }
record Circle(double r) implements Shape { public double area(){ return Math.PI*r*r; } }
record Square(double s) implements Shape { public double area(){ return s*s; } }

static Shape create(String type, double n) {
    return switch (type) {
        case "circle" -> new Circle(n);
        case "square" -> new Square(n);
        default -> throw new IllegalArgumentException(type);
    };
}`,
        },
        {
          label: "Builder (fluent, optional fields)",
          code: `class User {
    private final String name; private final int age;
    private User(Builder b) { this.name = b.name; this.age = b.age; }
    static class Builder {
        private String name; private int age;
        Builder name(String n){ this.name = n; return this; }
        Builder age(int a){ this.age = a; return this; }
        User build(){ return new User(this); }
    }
}
// User u = new User.Builder().name("Ava").age(30).build();`,
        },
      ],
    },
    {
      title: "Structural",
      rows: [],
      combos: [
        {
          label: "Adapter (make old fit a new interface)",
          code: `interface Payment { void pay(int cents); }
class LegacyGateway { void charge(double dollars) { /* ... */ } }

class LegacyAdapter implements Payment {
    private final LegacyGateway legacy;
    LegacyAdapter(LegacyGateway g) { this.legacy = g; }
    public void pay(int cents) { legacy.charge(cents / 100.0); }
}`,
        },
        {
          label: "Decorator (wrap and add behaviour)",
          code: `interface Notifier { void send(String msg); }
class Email implements Notifier { public void send(String m){ /* email */ } }

class SmsDecorator implements Notifier {
    private final Notifier inner;
    SmsDecorator(Notifier n){ this.inner = n; }
    public void send(String m){ inner.send(m); /* also SMS */ }
}
// new SmsDecorator(new Email()).send("Hi");`,
        },
        {
          label: "Facade (one method over many steps)",
          code: `class OrderFacade {
    private final Inventory inventory; private final Payment payment; private final Shipping shipping;
    void placeOrder(Cart cart) {
        inventory.reserve(cart);
        payment.charge(cart.total());
        shipping.dispatch(cart);     // caller sees one simple call
    }
}`,
        },
        {
          label: "Proxy (lazy / access control)",
          code: `interface Image { void render(); }
class RealImage implements Image {
    RealImage(String f){ /* heavy load */ }
    public void render(){ /* draw */ }
}
class ImageProxy implements Image {
    private final String file; private RealImage real;
    ImageProxy(String f){ this.file = f; }
    public void render(){ if (real == null) real = new RealImage(file); real.render(); }
}`,
        },
      ],
    },
    {
      title: "Behavioral",
      rows: [],
      combos: [
        {
          label: "Strategy (swap algorithm at runtime)",
          code: `interface Discount { int apply(int price); }
Discount none = p -> p;
Discount tenPct = p -> p - p / 10;

class Checkout {
    private Discount discount;
    void setDiscount(Discount d){ this.discount = d; }
    int total(int price){ return discount.apply(price); }
}`,
        },
        {
          label: "Observer (notify subscribers)",
          code: `interface Observer { void update(String event); }
class Subject {
    private final List<Observer> observers = new ArrayList<>();
    void subscribe(Observer o){ observers.add(o); }
    void publish(String event){ observers.forEach(o -> o.update(event)); }
}
// subject.subscribe(e -> System.out.println("got " + e));`,
        },
        {
          label: "Template Method (fixed steps, variable parts)",
          code: `abstract class Report {
    public final void generate() {   // fixed skeleton
        String data = fetch();
        String body = format(data);
        print(body);
    }
    protected abstract String fetch();
    protected abstract String format(String data);
    private void print(String b){ System.out.println(b); }
}`,
        },
        {
          label: "Command (action as an object, undoable)",
          code: `interface Command { void execute(); void undo(); }
class AddText implements Command {
    private final StringBuilder doc; private final String text;
    AddText(StringBuilder d, String t){ this.doc = d; this.text = t; }
    public void execute(){ doc.append(text); }
    public void undo(){ doc.setLength(doc.length() - text.length()); }
}`,
        },
      ],
    },
  ],
};
