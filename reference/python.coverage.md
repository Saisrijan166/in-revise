# Coverage: Python
Reference: reference/python.md  ·  Last updated: 02-11-2026

Every numbered section and every "vs" pair / interview question in `reference/python.md`
appears once below (Mapped, Corrected or Dropped). Additions beyond the reference are listed too.

## Mapped
| Reference item | Landed in | Note |
|---|---|---|
| 1.1 Introduction to Python | concept `what-is-python`, `dynamic-and-strong-typing`; glossary | high-level, interpreted-with-bytecode, dynamic/strong, OOP, PEP 8 |
| 1.2 Python Execution Basics | concept `python-execution-model` | source→bytecode→PVM; CPython/Jython/PyPy; REPL; module/package → tree nodes + `modules-and-packages` |
| 2.1 Variables | concept `variables-and-objects` | name→object, dynamic/multiple assignment, naming |
| 2.2 Built-in Data Types | concept `builtin-data-types` | int/float/complex/str/bool/list/tuple/set/dict/None/range/bytes; type conversion |
| 2.3 Mutable vs Immutable | concept `mutable-vs-immutable`; comparison `mutable-vs-immutable` | tuple-of-mutables trap |
| 2.4 Type Checking | concept `type-checking`; comparison `type-vs-isinstance` | type/isinstance/id |
| 3.1–3.6 Operators | concept `operators-overview`, `equality-vs-identity`; comparison `is-vs-equals` | arithmetic/comparison/logical/assignment/membership/identity |
| 4.1 Conditional Statements | concept `conditionals` | if/elif/else, nested, ternary |
| 4.2 Loops | concept `loops` | for/while/nested/infinite |
| 4.3 Loop Keywords | concept `loop-control`, `iteration-helpers` | break/continue/pass/loop-else; range/enumerate/zip |
| 5.1 String Basics | concept `strings` | immutable, indexing, slicing, escapes |
| 5.2 String Methods | concept `string-methods` | upper/strip/split/join/find vs index/is* |
| 5.3 String Formatting | concept `strings` (f-string section) | f-string vs format vs % |
| 6.1–6.3 Lists + methods + differences | concept `lists` | append vs extend, remove vs pop, sort vs sorted (inline) |
| 6.4 List Comprehension | concept `comprehensions` | merged with set/dict/generator comprehensions |
| 7.1 Tuples | concept `tuples`; comparison `list-vs-tuple` | single-element comma, unpacking |
| 7.2 Sets | concept `sets`; comparison `list-set-dict` | set ops, frozenset |
| 7.3 Dictionaries | concept `dictionaries`; comparison `list-set-dict` | get vs [], hashable keys, ordered |
| 8.1 Function Basics | concept `functions-basics` | def/param/return/docstring; return vs print (inline) |
| 8.2 Parameters and Arguments | concept `function-arguments` | positional/keyword/default |
| 8.3 *args and **kwargs | concept `function-arguments`; comparison `args-vs-kwargs` | |
| 8.4 Return vs Print | concept `functions-basics` (point/trap) | |
| 8.5 Lambda | concept `lambda` | |
| 8.6 Recursion | concept `recursion` | base case, recursion limit |
| 8.7 Scope LEGB | concept `scope-legb` | global/nonlocal |
| 8.8 Function Concepts | concept `closures`, `decorators` | first-class, HOF, closure, pure/side-effect |
| 9.1 Class and Object | concept `class-and-object` | self, __init__ |
| 9.2 Constructor/Destructor | concept `init-new-del`; comparison `init-vs-new` | __init__/__new__/__del__ |
| 9.3 Four Pillars | concept `encapsulation`, `inheritance`, `polymorphism`, `abstraction` | |
| 9.4 Types of Methods | concept `method-types`; comparison `instance-class-static-method` | |
| 9.5 OOP Terminology | concept `mro`, `dunder-methods` | issubclass, composition/aggregation → glossary |
| 10.1–10.2 Exceptions | concept `exceptions` | try/except/else/finally/raise; common types |
| 10.3 Custom Exceptions | concept `custom-exceptions` | |
| 10.4 raise vs assert, syntax vs exception | concept `custom-exceptions`, `exceptions` | |
| 11 File Handling | concept `file-handling` | modes, with open, methods |
| 12 Iterators and Generators | concept `iterable-vs-iterator`, `generators`; comparison `iterator-vs-generator` | |
| 13 Built-in Functions | concept `map-filter-reduce`; glossary; tree notes | len/sorted/enumerate/zip etc |
| 14.1–14.3 Modules/Packages/__main__ | concept `modules-and-packages` | |
| 14.4 pip and venv | concept `venv-and-pip` | |
| 15.1 Memory Management | concept `memory-and-gc` | ref counting, gc, del |
| 15.2 Shallow vs Deep Copy | concept `shallow-vs-deep-copy`; comparison `shallow-vs-deep-copy` | |
| 15.3 Mutable Default Argument | concept `mutable-default-argument` | |
| 16.1 Comprehensions | concept `comprehensions`; comparison `list-comp-vs-generator-expr` | |
| 16.2–16.3 Unpacking/Swapping | concept `unpacking-and-swapping` | |
| 17.1 Decorators | concept `decorators` | functools.wraps |
| 17.2 Context Managers | concept `context-managers` | |
| 17.3 map/filter/reduce | concept `map-filter-reduce` | |
| 17.4 Type Hints | concept `type-hints` | |
| 17.5 Dataclasses | concept `dataclasses` | |
| 17.6 Regular Expressions | concept `regex` | |
| 18.1 Concurrency vs Parallelism | concept `concurrency-vs-parallelism`; comparison `concurrency-vs-parallelism`, `process-vs-thread` | |
| 18.2 Multithreading | concept `threading` | |
| 18.3 Multiprocessing | concept `multiprocessing`; comparison `threading-vs-multiprocessing` | |
| 18.4 GIL | concept `gil` | free-threaded build (PEP 779) |
| 18.5 Async | concept `asyncio` | |
| 19 Data Structures and Time Complexity | concept `time-complexity`, `collections-module` | stack/queue/deque; Counter/defaultdict/namedtuple |
| 20.1 Frameworks | concept `python-web-frameworks`; comparison `django-flask-fastapi` | |
| 20.2–20.6 REST/HTTP/DB/env | glossary + points in `python-web-frameworks` | other techs cover REST/HTTP in depth; Python-specific bits only |
| 21 Testing and Debugging | concept `testing-and-logging` | pytest/unittest/mock/logging/pdb |
| 22 Important Libraries | glossary + tree notes | os/sys/json/datetime/itertools/functools etc |
| 23 Security Concepts | points in `python-web-frameworks`; glossary | parameterized queries, secrets; SQLi/XSS/CSRF are other techs |
| 24 Common Interview Confusions | spread across the matching concepts' traps and Interview Qs | |
| 25 Coding Programs | concept `string-coding-problems`, `number-coding-problems`, `collection-coding-problems` | with practice boxes + outputs |
| 26 Terminology Quick Revision | glossary | |
| 27 Revision checklist | story spine + topic order | |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| (none material) | The reference was accurate on the facts; its only issues were formatting (merged code lines, ASCII boxes) which were redrawn, not corrected. Two drafting fixes to our own cards (the `x is 256` SyntaxWarning example; a stray double space in one output) are recorded in OPEN_QUESTIONS R18, not here. | — | docs.python.org/3 |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Int/str interning gotcha (why `is` can look true) | concept `equality-vs-identity` | Common follow-up to == vs is |
| Truthiness (falsy values) | concept `conditionals` | Frequently asked; underpins `if x:` idioms |
| Free-threaded CPython (PEP 779, 3.14) | concept `gil` | Current, interview-relevant change to the GIL story |
| Python-for-Java-developers gotchas | concept `python-for-java-developers` | Owner's audience is a Java/Spring dev; the reference calls these out |
| dunder __eq__/__hash__ contract | concept `dunder-methods` | Standard OOP follow-up |

## Dropped
| Reference item | Reason |
|---|---|
| ASCII execution-flow boxes | Reference formatting; redrawn as Steps/Mermaid |
| Full HTTP status-code table | REST API / OS-Networking techs own this; kept the Python-relevant few |
| Exhaustive standard-library list (22) | Captured as glossary terms and tree notes, not a concept each |
