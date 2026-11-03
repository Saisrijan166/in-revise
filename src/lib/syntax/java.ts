import type { SyntaxSheet } from "./types";

export const java: SyntaxSheet = {
  tagline: "The Java methods, collections and stream calls you actually write every day.",
  baseline: "Java 25 (LTS)",
  lang: "java",
  groups: [
    {
      title: "Printing and input",
      rows: [
        {
          syntax: "System.out.println(x)",
          what: "Print a line",
          example: 'System.out.println("Hello");',
        },
        {
          syntax: "System.out.printf(fmt, ...)",
          what: "Formatted print",
          example: 'System.out.printf("%d%n", 5);',
        },
        {
          syntax: "String.format(fmt, ...)",
          what: "Build a formatted string",
          example: 'String s = String.format("%.2f", 3.14159); // 3.14',
        },
        {
          syntax: "new Scanner(System.in)",
          what: "Read console input",
          example: "Scanner sc = new Scanner(System.in);",
        },
        {
          syntax: "sc.nextInt() / nextLine()",
          what: "Read an int / a line",
          example: "int n = sc.nextInt();",
        },
        {
          syntax: "var x = ...",
          what: "Infer the local type",
          example: "var list = new ArrayList<Integer>();",
        },
      ],
    },
    {
      title: "Strings",
      rows: [
        { syntax: "s.length()", what: "Number of characters", example: '"abc".length() // 3' },
        { syntax: "s.charAt(i)", what: "Char at index", example: "\"abc\".charAt(0) // 'a'" },
        {
          syntax: "s.substring(a, b)",
          what: "Slice [a, b)",
          example: '"abcde".substring(1, 3) // "bc"',
        },
        { syntax: "s.indexOf(x)", what: "First index, or -1", example: '"abc".indexOf("b") // 1' },
        {
          syntax: "s.contains(x)",
          what: "Has substring?",
          example: '"abc".contains("ab") // true',
        },
        { syntax: "s.equals(t)", what: "Value equality (not ==)", example: "a.equals(b)" },
        {
          syntax: "s.equalsIgnoreCase(t)",
          what: "Case-insensitive equals",
          example: '"A".equalsIgnoreCase("a") // true',
        },
        { syntax: "s.split(regex)", what: "Split into a String[]", example: '"a,b,c".split(",")' },
        {
          syntax: "s.replace(a, b)",
          what: "Replace all occurrences",
          example: '"aaa".replace("a", "b") // "bbb"',
        },
        {
          syntax: "s.strip()",
          what: "Trim leading/trailing spaces",
          example: '"  x  ".strip() // "x"',
        },
        {
          syntax: "s.toUpperCase() / toLowerCase()",
          what: "Change case",
          example: '"abc".toUpperCase() // "ABC"',
        },
        {
          syntax: "s.toCharArray()",
          what: "To a char[]",
          example: "for (char c : s.toCharArray()) {}",
        },
        {
          syntax: "s.chars()",
          what: "IntStream of code points",
          example: "s.chars().filter(Character::isDigit).count()",
        },
        {
          syntax: "String.valueOf(x)",
          what: "Any value to String",
          example: 'String.valueOf(42) // "42"',
        },
        {
          syntax: "String.join(sep, parts)",
          what: "Join an iterable",
          example: 'String.join("-", list)',
        },
      ],
      combos: [
        {
          label: "Build a string with StringBuilder (mutable, fast)",
          code: `StringBuilder sb = new StringBuilder();
sb.append("a").append(1);     // chaining
sb.insert(0, "x");            // "xa1"
sb.delete(0, 1);              // "a1"  (removes [start, end))
sb.reverse();                 // "1a"
String result = sb.toString();`,
        },
      ],
    },
    {
      title: "Arrays",
      rows: [
        {
          syntax: "int[] a = new int[n]",
          what: "Fixed-size array (zeros)",
          example: "int[] a = new int[5];",
        },
        { syntax: "int[] a = {1, 2, 3}", what: "Array literal", example: "int[] a = {1, 2, 3};" },
        { syntax: "a.length", what: "Size (a field, not a method)", example: "a.length // 3" },
        { syntax: "Arrays.sort(a)", what: "Sort ascending in place", example: "Arrays.sort(a);" },
        {
          syntax: "Arrays.sort(arr, cmp)",
          what: "Sort objects by comparator",
          example: "Arrays.sort(arr, Comparator.reverseOrder());",
        },
        { syntax: "Arrays.fill(a, v)", what: "Fill every slot", example: "Arrays.fill(a, -1);" },
        {
          syntax: "Arrays.equals(a, b)",
          what: "Element-by-element equality",
          example: "Arrays.equals(a, b) // true if same contents",
        },
        {
          syntax: "Arrays.toString(a)",
          what: "Printable form",
          example: "Arrays.toString(a) // [1, 2, 3]",
        },
        {
          syntax: "Arrays.copyOf(a, n)",
          what: "Resized copy",
          example: "int[] b = Arrays.copyOf(a, 10);",
        },
        {
          syntax: "Arrays.stream(a)",
          what: "Stream over the array",
          example: "Arrays.stream(a).sum()",
        },
        {
          syntax: "Arrays.asList(...)",
          what: "Fixed-size List view",
          example: "List<Integer> l = Arrays.asList(1, 2, 3);",
        },
        {
          syntax: "int[][] g = new int[r][c]",
          what: "2D array (matrix)",
          example: "int[][] g = new int[3][3];",
        },
      ],
    },
    {
      title: "List (ArrayList)",
      rows: [
        {
          syntax: "List<T> list = new ArrayList<>()",
          what: "Create a growable list",
          example: "List<Integer> list = new ArrayList<>();",
        },
        { syntax: "list.add(x)", what: "Append", example: "list.add(10);" },
        { syntax: "list.add(i, x)", what: "Insert at index", example: "list.add(0, 99);" },
        { syntax: "list.get(i) / set(i, x)", what: "Read / overwrite", example: "list.set(0, 5);" },
        { syntax: "list.remove(i)", what: "Remove by index", example: "list.remove(0);" },
        {
          syntax: "list.remove(obj)",
          what: "Remove by value",
          example: "list.remove(Integer.valueOf(5));",
        },
        {
          syntax: "list.size() / isEmpty()",
          what: "Count / empty check",
          example: "if (list.isEmpty()) {}",
        },
        { syntax: "list.contains(x) / indexOf(x)", what: "Search", example: "list.indexOf(5)" },
        {
          syntax: "list.sort(cmp)",
          what: "Sort in place",
          example: "list.sort(Comparator.naturalOrder());",
        },
        {
          syntax: "list.removeIf(pred)",
          what: "Conditional remove",
          example: "list.removeIf(x -> x < 0);",
        },
        { syntax: "List.of(...)", what: "Immutable list", example: "List.of(1, 2, 3)" },
      ],
      combos: [
        {
          label: "Iterate, and remove safely while iterating",
          code: `for (int x : list) { /* read */ }

Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    if (it.next() % 2 == 0) it.remove();   // safe
}`,
        },
      ],
    },
    {
      title: "Map (HashMap)",
      rows: [
        {
          syntax: "Map<K,V> m = new HashMap<>()",
          what: "Key to value store",
          example: "Map<String,Integer> m = new HashMap<>();",
        },
        { syntax: "m.put(k, v)", what: "Insert or overwrite", example: 'm.put("a", 1);' },
        { syntax: "m.get(k)", what: "Value, or null", example: 'm.get("a")' },
        {
          syntax: "m.getOrDefault(k, def)",
          what: "Value, or a default",
          example: 'm.getOrDefault("x", 0)',
        },
        { syntax: "m.containsKey(k)", what: "Has key?", example: 'm.containsKey("a")' },
        { syntax: "m.remove(k)", what: "Delete a key", example: 'm.remove("a");' },
        {
          syntax: "m.keySet() / values() / entrySet()",
          what: "Views for iterating",
          example: "for (var e : m.entrySet()) {}",
        },
        {
          syntax: "m.merge(k, 1, Integer::sum)",
          what: "Combine with existing",
          example: 'm.merge("a", 1, Integer::sum);',
        },
        {
          syntax: "m.computeIfAbsent(k, f)",
          what: "Default then get (grouping)",
          example: "m.computeIfAbsent(k, x -> new ArrayList<>()).add(v);",
        },
        {
          syntax: "m.putIfAbsent(k, v)",
          what: "Set only if missing",
          example: 'm.putIfAbsent("a", 1);',
        },
        { syntax: "Map.of(k, v, ...)", what: "Immutable map", example: 'Map.of("a", 1, "b", 2)' },
        {
          syntax: "new TreeMap<>()",
          what: "Sorted keys + floorKey/ceilingKey",
          example: "TreeMap<Integer,V> t = new TreeMap<>();",
        },
      ],
      combos: [
        {
          label: "Frequency counting (two idioms)",
          code: `map.put(k, map.getOrDefault(k, 0) + 1);
map.merge(k, 1, Integer::sum);     // same result, shorter

// iterate
for (Map.Entry<String,Integer> e : map.entrySet()) {
    e.getKey(); e.getValue();
}
map.forEach((key, val) -> System.out.println(key + "=" + val));`,
        },
      ],
    },
    {
      title: "Set (HashSet)",
      rows: [
        {
          syntax: "Set<T> s = new HashSet<>()",
          what: "Unique elements",
          example: "Set<Integer> s = new HashSet<>();",
        },
        { syntax: "s.add(x)", what: "Add (false if duplicate)", example: "s.add(5);" },
        { syntax: "s.contains(x)", what: "Membership O(1) avg", example: "s.contains(5)" },
        { syntax: "s.remove(x)", what: "Delete", example: "s.remove(5);" },
        { syntax: "s.addAll(c)", what: "Union", example: "a.addAll(b);" },
        { syntax: "s.retainAll(c)", what: "Intersection", example: "a.retainAll(b);" },
        { syntax: "s.removeAll(c)", what: "Difference", example: "a.removeAll(b);" },
        { syntax: "Set.of(...)", what: "Immutable set", example: "Set.of(1, 2, 3)" },
        {
          syntax: "new TreeSet<>()",
          what: "Sorted + first/last/floor/ceiling",
          example: "TreeSet<Integer> t = new TreeSet<>();",
        },
        {
          syntax: "new LinkedHashSet<>()",
          what: "Keeps insertion order",
          example: "new LinkedHashSet<>()",
        },
      ],
    },
    {
      title: "Stack, Queue, Deque, Heap",
      rows: [
        {
          syntax: "Deque<T> st = new ArrayDeque<>()",
          what: "Use as a stack (LIFO)",
          example: "st.push(x); st.pop(); st.peek();",
        },
        {
          syntax: "Deque<T> q = new ArrayDeque<>()",
          what: "Use as a queue (FIFO)",
          example: "q.offer(x); q.poll(); q.peek();",
        },
        {
          syntax: "PriorityQueue<T> pq = new PriorityQueue<>()",
          what: "Min-heap",
          example: "pq.offer(x); pq.poll(); // smallest",
        },
        {
          syntax: "new PriorityQueue<>(Comparator.reverseOrder())",
          what: "Max-heap",
          example: "pq.poll(); // largest",
        },
        {
          syntax: "pq.offer(x) / poll() / peek()",
          what: "Add / remove-top / view-top",
          example: "int top = pq.peek();",
        },
      ],
      combos: [
        {
          label: "Max-heap of pairs by a field",
          code: `PriorityQueue<int[]> pq =
    new PriorityQueue<>((a, b) -> b[1] - a[1]);   // by second value, desc
pq.offer(new int[]{id, count});`,
        },
      ],
    },
    {
      title: "Streams",
      rows: [
        { syntax: "coll.stream()", what: "Start a stream", example: "list.stream()" },
        { syntax: ".filter(pred)", what: "Keep matching", example: ".filter(x -> x > 0)" },
        { syntax: ".map(fn)", what: "Transform each", example: ".map(String::toUpperCase)" },
        {
          syntax: ".mapToInt(fn).sum()",
          what: "Sum of ints",
          example: "list.stream().mapToInt(Integer::intValue).sum()",
        },
        {
          syntax: ".sorted(cmp)",
          what: "Sort the stream",
          example: ".sorted(Comparator.reverseOrder())",
        },
        { syntax: ".distinct()", what: "Remove duplicates", example: ".distinct()" },
        { syntax: ".limit(n) / .skip(n)", what: "Take / drop", example: ".limit(5)" },
        { syntax: ".count()", what: "How many", example: ".filter(...).count()" },
        {
          syntax: ".findFirst() / .findAny()",
          what: "First / any match (Optional)",
          example: ".filter(x -> x > 0).findFirst()",
        },
        {
          syntax: ".anyMatch/allMatch/noneMatch(pred)",
          what: "Boolean checks",
          example: ".anyMatch(x -> x < 0)",
        },
        {
          syntax: ".min(cmp) / .max(cmp)",
          what: "Extremes (Optional)",
          example: ".max(Comparator.naturalOrder())",
        },
        {
          syntax: ".reduce(id, op)",
          what: "Fold to one value",
          example: ".reduce(0, Integer::sum)",
        },
        {
          syntax: ".toList()",
          what: "Collect to a List (Java 16+)",
          example: ".map(...).toList()",
        },
        {
          syntax: "Collectors.groupingBy(fn)",
          what: "Group into a Map",
          example: ".collect(Collectors.groupingBy(P::dept))",
        },
        {
          syntax: "Collectors.joining(sep)",
          what: "Join to a String",
          example: '.collect(Collectors.joining(", "))',
        },
        {
          syntax: "Collectors.toMap(k, v)",
          what: "Collect to a Map",
          example: ".collect(Collectors.toMap(P::id, p -> p))",
        },
        {
          syntax: "Collectors.toSet()",
          what: "Collect to a Set",
          example: ".collect(Collectors.toSet())",
        },
        {
          syntax: "Collectors.counting()",
          what: "Count per group (downstream)",
          example: "groupingBy(P::dept, Collectors.counting())",
        },
        {
          syntax: "Collectors.summingInt(fn)",
          what: "Sum per group (also averagingInt)",
          example: "groupingBy(P::dept, Collectors.summingInt(P::salary))",
        },
        {
          syntax: "Collectors.mapping(fn, down)",
          what: "Map then collect per group",
          example: "groupingBy(P::dept, mapping(P::name, toList()))",
        },
        {
          syntax: "Collectors.maxBy(cmp) / minBy(cmp)",
          what: "Extreme per group (Optional)",
          example: "groupingBy(P::dept, maxBy(comparingInt(P::salary)))",
        },
        {
          syntax: "IntStream.range(a, b)",
          what: "Stream of ints [a, b)",
          example: "IntStream.range(0, n).forEach(i -> {});",
        },
      ],
      combos: [
        {
          label: "Common one-liners",
          code: `List<Integer> evens = nums.stream()
    .filter(x -> x % 2 == 0)
    .toList();

Map<String, List<Person>> byDept = people.stream()
    .collect(Collectors.groupingBy(Person::dept));

Map<Boolean, List<Integer>> split = nums.stream()
    .collect(Collectors.partitioningBy(x -> x > 0));

// count per group: {HR=3, ENG=5}
Map<String, Long> perDept = people.stream()
    .collect(Collectors.groupingBy(
        Person::dept, Collectors.counting()));`,
        },
      ],
    },
    {
      title: "Optional",
      rows: [
        {
          syntax: "Optional.of(x) / ofNullable(x)",
          what: "Wrap a value (maybe null)",
          example: "Optional.ofNullable(map.get(k))",
        },
        {
          syntax: "opt.isPresent() / isEmpty()",
          what: "Has a value?",
          example: "if (opt.isPresent()) {}",
        },
        { syntax: "opt.get()", what: "Unwrap (throws if empty)", example: "opt.get()" },
        {
          syntax: "opt.orElse(def)",
          what: "Value, or a fallback",
          example: 'name.orElse("unknown")',
        },
        { syntax: "opt.orElseThrow()", what: "Value, or throw", example: "opt.orElseThrow()" },
        {
          syntax: "opt.map(fn) / filter(pred)",
          what: "Transform if present",
          example: "opt.map(String::length)",
        },
        {
          syntax: "opt.ifPresent(cons)",
          what: "Run only if present",
          example: "opt.ifPresent(System.out::println);",
        },
      ],
    },
    {
      title: "Math and number limits",
      rows: [
        {
          syntax: "Math.max(a, b) / min(a, b)",
          what: "Larger / smaller",
          example: "Math.max(3, 7) // 7",
        },
        { syntax: "Math.abs(x)", what: "Absolute value", example: "Math.abs(-4) // 4" },
        {
          syntax: "Math.pow(a, b)",
          what: "Power (returns double)",
          example: "(int) Math.pow(2, 10) // 1024",
        },
        { syntax: "Math.sqrt(x)", what: "Square root", example: "Math.sqrt(16) // 4.0" },
        {
          syntax: "Math.floor / ceil / round",
          what: "Round down / up / nearest",
          example: "Math.round(2.6) // 3",
        },
        {
          syntax: "Math.floorMod(a, b)",
          what: "Modulo with correct sign",
          example: "Math.floorMod(-1, 3) // 2",
        },
        {
          syntax: "Integer.MAX_VALUE / MIN_VALUE",
          what: "Int bounds",
          example: "int best = Integer.MAX_VALUE;",
        },
        { syntax: "Long.MAX_VALUE", what: "Long bound", example: "long sum = 0L;" },
      ],
    },
    {
      title: "Parsing and char tricks",
      rows: [
        {
          syntax: "Integer.parseInt(s)",
          what: "String to int",
          example: 'Integer.parseInt("42") // 42',
        },
        {
          syntax: "Double.parseDouble(s)",
          what: "String to double",
          example: 'Double.parseDouble("3.14")',
        },
        { syntax: "Integer.toString(n)", what: "Int to String", example: "Integer.toString(42)" },
        {
          syntax: "Integer.toBinaryString(n)",
          what: "Int to binary text",
          example: 'Integer.toBinaryString(5) // "101"',
        },
        { syntax: "c - '0'", what: "Digit char to int", example: "'7' - '0' // 7" },
        {
          syntax: "(char) ('a' + i)",
          what: "Int to letter char",
          example: "(char) ('a' + 2) // 'c'",
        },
        {
          syntax: "Character.isDigit(c) / isLetter(c)",
          what: "Classify a char",
          example: "Character.isLetterOrDigit(c)",
        },
        {
          syntax: "Character.isWhitespace(c)",
          what: "Is a space/tab/newline?",
          example: "Character.isWhitespace(' ') // true",
        },
        {
          syntax: "Character.toUpperCase(c)",
          what: "Change a char's case",
          example: "Character.toLowerCase('A') // 'a'",
        },
      ],
    },
    {
      title: "Sorting and comparators",
      rows: [
        {
          syntax: "Collections.sort(list)",
          what: "Sort a list ascending",
          example: "Collections.sort(list);",
        },
        {
          syntax: "Comparator.comparing(T::field)",
          what: "Compare by a field",
          example: "Comparator.comparing(Person::name)",
        },
        {
          syntax: ".reversed()",
          what: "Flip a comparator",
          example: "Comparator.comparing(P::age).reversed()",
        },
        {
          syntax: ".thenComparing(T::field2)",
          what: "Tie-breaker",
          example: ".thenComparing(Person::name)",
        },
        {
          syntax: "Comparator.comparingInt(T::num)",
          what: "Avoid boxing for ints",
          example: "Comparator.comparingInt(P::age)",
        },
        {
          syntax: "(a, b) -> a - b",
          what: "Lambda comparator (ints)",
          example: "arr.sort((a, b) -> a[0] - b[0]);",
        },
        {
          syntax: "Collections.reverse(list)",
          what: "Reverse in place",
          example: "Collections.reverse(list);",
        },
        {
          syntax: "Collections.max(list) / min(list)",
          what: "Largest / smallest element",
          example: "Collections.max(list)",
        },
        {
          syntax: "Collections.frequency(list, x)",
          what: "How many times x appears",
          example: "Collections.frequency(list, 5) // 2",
        },
      ],
      combos: [
        {
          label: "Multi-key sort",
          code: `people.sort(
    Comparator.comparingInt(Person::age)
              .thenComparing(Person::name));`,
        },
      ],
    },
    {
      title: "Exceptions",
      rows: [
        {
          syntax: "try { } catch (E e) { }",
          what: "Handle a failure",
          example: "try { risky(); } catch (IOException e) { }",
        },
        { syntax: "finally { }", what: "Always runs", example: "finally { cleanup(); }" },
        {
          syntax: "try (var r = open()) { }",
          what: "Auto-close resources",
          example: "try (var in = Files.newBufferedReader(p)) {}",
        },
        {
          syntax: "throw new RuntimeException(msg)",
          what: "Raise an error",
          example: 'throw new IllegalArgumentException("bad");',
        },
        {
          syntax: "e.getMessage()",
          what: "Read the message",
          example: "log.error(e.getMessage());",
        },
        {
          syntax: "class MyEx extends RuntimeException",
          what: "Custom exception",
          example: "class NotFound extends RuntimeException {}",
        },
      ],
    },
    {
      title: "Modern Java (records, enums, switch)",
      rows: [
        {
          syntax: "record Point(int x, int y) {}",
          what: "Immutable data carrier",
          example: "var p = new Point(1, 2); p.x();",
        },
        {
          syntax: "enum Color { RED, GREEN }",
          what: "Fixed set of constants",
          example: "Color c = Color.RED;",
        },
        {
          syntax: "switch expression",
          what: "Return from a switch",
          example: 'var r = switch (n) { case 1 -> "one"; default -> "many"; };',
        },
        {
          syntax: "if (o instanceof String s)",
          what: "Pattern matching + bind",
          example: "if (o instanceof String s) s.length();",
        },
        {
          syntax: "List.of / Map.of / Set.of",
          what: "Immutable collections",
          example: 'var cfg = Map.of("k", 1);',
        },
        {
          syntax: 'text block """..."""',
          what: "Multi-line string",
          example: 'String json = """\\n{"a":1}\\n""";',
        },
      ],
    },
  ],
};
