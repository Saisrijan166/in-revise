# How Python Runs ⭐

## What Python Is

Python is a high-level, general-purpose language known for simple, readable syntax. It is object-oriented (everything is an object), cross-platform, open source, and case-sensitive. It uses indentation, not `{}`, to mark code blocks. PEP 8 is the official style guide.

> Remember: Python 3 is the modern version; indentation is syntax, not just style.

## Interpreted, Compiled or Both?

Python is commonly called interpreted, but CPython first compiles your source (`.py`) into bytecode, then the Python Virtual Machine (PVM) runs that bytecode.

- Source code → bytecode → PVM → output.
- **CPython**: the standard implementation, written in C.
- **Jython** (runs on the JVM), **PyPy** (uses JIT compilation) are alternatives.
- **REPL**: interactive shell to run statements one at a time.

> Remember: "Interpreted, but CPython compiles to bytecode first" is the correct interview answer.

## Dynamic + Strong Typing ⭐

- **Dynamically typed**: you don't declare types; Python infers them at runtime, and a variable can later point to a different type.
- **Strongly typed**: Python won't silently combine incompatible types, e.g. `"a" + 1` raises an error.

```python
x = 10
x = "Python"   # allowed: dynamic typing
"age: " + 25   # TypeError: strong typing
```

> Remember: Dynamic = type decided at runtime. Strong = incompatible types are not auto-mixed.

# Types and Mutability ⭐

## Built-in Types

| Type | Meaning | Example |
| --- | --- | --- |
| `int` / `float` / `complex` | Numbers | `10`, `10.5`, `2+3j` |
| `str` | Text | `"Hi"` |
| `bool` | True / False | `True` |
| `list` / `tuple` | Ordered collection (mutable / immutable) | `[1,2]` / `(1,2)` |
| `set` | Unique elements | `{1,2}` |
| `dict` | Key-value pairs | `{"a":1}` |
| `NoneType` | Absence of a value | `None` |
| `range` / `bytes` | Int sequence / binary data | `range(5)` / `b"hi"` |

- **None**: means "no value"; not the same as `0`, `False`, or `""`.
- **Type conversion**: `int("100")`, `float("100")`, `str(10)`.

## Mutable vs Immutable ⭐

- **Mutable** (can change after creation): `list`, `set`, `dict`.
- **Immutable** (cannot change): `int`, `float`, `bool`, `str`, `tuple`, `frozenset`.

A tuple is immutable, but a mutable object *inside* it can still change:

```python
t = (1, [2, 3])
t[1].append(4)   # (1, [2, 3, 4]) — the tuple binding is unchanged
```

> Remember: Immutable = the object's value can't change; a tuple can still hold a list that changes.

## Hashable

An object is **hashable** if it has a stable hash. Only hashable objects can be dict keys or set elements. Immutable types are usually hashable; lists and dicts are not.

## Type Checking

- `type(x)`: exact type.
- `isinstance(x, int)`: type check that also accepts subclasses.
- `id(x)`: object identity (memory identity).

> Remember: Prefer `isinstance()` over `type()` because it respects inheritance.

# Operators (the ones interviewers probe)

## Arithmetic Gotchas

- `/` always returns a float (`10 / 2` → `5.0`).
- `//` floor division, rounds **down** toward negative infinity.
- `%` remainder, `**` power.

## Logic and Membership

- `and` / `or` / `not` for booleans.
- `in` / `not in` test membership; for a dict, they check **keys**.

## `==` vs `is` ⭐

- `==` compares **values**.
- `is` compares **identity** (same object in memory).

```python
a = [1, 2]; b = [1, 2]
a == b   # True  (same value)
a is b   # False (different objects)
```

> Remember: `==` = same value, `is` = same object. Always use `is None` to test for None.

# Control Flow

## Conditionals

`if` / `elif` / `else`. Ternary form: `value = "Pass" if marks >= 40 else "Fail"`.

## Loops and Keywords

- `for` iterates any iterable; `while` repeats while a condition holds.
- `break` exits the nearest loop; `continue` skips to the next iteration; `pass` is a do-nothing placeholder.
- A loop's `else` runs only if the loop finished **without** a `break`.
- Helpers: `enumerate()` (index + value), `zip()` (iterate several iterables together).

## range()

`range(start, stop, step)` — default start `0`, default step `1`, **stop is excluded**, step may be negative.

```python
list(range(1, 5))      # [1, 2, 3, 4]
list(range(5, 0, -1))  # [5, 4, 3, 2, 1]
```

> Remember: `range(5)` gives 0–4, never 5.

# Strings

## Basics

A string is an **immutable** sequence of characters. Indexing starts at `0`; `-1` is the last character.

- **Slicing** `s[start:stop:step]`: stop is excluded; `s[::-1]` reverses.
- Slicing beyond the length is safe (no error).

```python
name = "Python"
name[0]     # 'P'
name[-1]    # 'n'
name[0:3]   # 'Pyt'
name[::-1]  # 'nohtyP'
```

## Useful Methods

Case: `upper`, `lower`, `capitalize`, `title`. Clean: `strip`, `lstrip`, `rstrip`. Edit/search: `replace`, `split`, `join`, `count`, `startswith`, `endswith`. Checks: `isdigit`, `isalpha`, `isalnum`, `isspace`.

- `find()` returns `-1` if missing; `index()` raises `ValueError` if missing.

## Formatting

```python
name, age = "Srijan", 25
f"My name is {name}, age {age}"           # f-string (preferred)
"My name is {}, age {}".format(name, age) # .format()
```

> Remember: Use f-strings; they are the simplest and most readable.

# Collections ⭐

## List

Ordered, mutable, allows duplicates, can mix types.

- Add: `append(x)` (one element), `extend(iterable)` (many), `insert(i, x)`.
- Remove: `remove(value)`, `pop()` (last, returns it), `pop(i)`, `clear()`.
- Other: `index`, `count`, `sort`, `reverse`, `copy`.

## Tuple

Ordered, **immutable**, allows duplicates, supports indexing/slicing. Use for fixed collections.

- A single-element tuple needs a trailing comma: `x = (10,)`.
- **Unpacking**: `name, age = ("Srijan", 25)`.

## Set

Collection of **unique, hashable** elements; duplicates auto-removed; **no order guarantee**; no indexing; mutable.

- Edit: `add`, `update`, `remove` (errors if missing), `discard` (no error), `pop` (arbitrary element).
- Math: `|` union, `&` intersection, `-` difference, `^` symmetric difference.
- `frozenset` is the immutable, hashable version.

## Dict

Mutable key-value store. Keys must be **hashable and unique**; values any type. Preserves insertion order in modern Python.

- Access: `d["k"]` raises `KeyError` if missing; `d.get("k")` returns `None` (or a default) instead.
- Methods: `keys`, `values`, `items`, `update`, `pop`, `popitem`, `setdefault`, `clear`, `copy`.

> Remember: Lists/dicts can't be keys (unhashable); strings, ints and all-hashable tuples can.

## Comprehensions ⭐

A concise way to build a collection from an iterable, with an optional condition.

```python
nums = [1, 2, 3, 4]
[x * x for x in nums]          # list
{x * 2 for x in nums}          # set
{x: x * x for x in nums}       # dict
(x * 2 for x in nums)          # generator (lazy)
[x for x in nums if x % 2 == 0]  # with condition
```

> Remember: `[]` list, `{}` set/dict, `()` a lazy generator expression.

## Unpacking and Swapping

```python
first, *middle, last = [1, 2, 3, 4, 5]   # 1, [2,3,4], 5
a, b = b, a                              # swap, no temp variable
```

# Functions ⭐

## Basics

Defined with `def`; a **parameter** is the name in the definition, an **argument** is the value passed. `return` sends a result back; a function with no `return` returns `None`. A docstring documents it.

- `print()` shows output on screen; `return` hands a value to the caller — they are not the same.

## Arguments

- **Positional**: matched by order. **Keyword**: matched by name. **Default**: `def greet(name, msg="Hi")`.

## *args and **kwargs ⭐

- `*args`: collects extra positional arguments into a **tuple**.
- `**kwargs`: collects extra keyword arguments into a **dict**.

```python
def demo(*args, **kwargs):
    print(args)    # (10, 20)
    print(kwargs)  # {'name': 'Srijan'}
demo(10, 20, name="Srijan")
```

> Remember: The `*` and `**` symbols matter, not the names `args`/`kwargs`.

## Lambda

A small anonymous function of one expression, common with `map`, `filter`, sorting.

```python
square = lambda x: x * x
```

## Scope: LEGB ⭐

Python looks up names in order: **Local → Enclosing → Global → Built-in**.

- `global x` lets a function reassign a module-level variable.
- `nonlocal x` lets an inner function reassign a variable in its enclosing function.

## First-Class Functions, Closures, Decorators ⭐

- **First-class / higher-order**: functions can be stored in variables, passed as arguments, and returned.
- **Closure**: an inner function that remembers variables from its enclosing scope.
- **Decorator**: a function that wraps another to add behaviour without editing its source. `@name` applies it. Use `functools.wraps` to keep the original function's metadata.

```python
from functools import wraps
def logger(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("called")
        return func(*args, **kwargs)
    return wrapper

@logger
def greet(): print("Hello")
```

> Remember: `@decorator` is just `func = decorator(func)`.

## Recursion

A function that calls itself; needs a **base case** to stop. Deep recursion raises `RecursionError` (there is a recursion limit).

# OOP ⭐

## Class and Object

- **Class**: a blueprint; **object/instance**: a thing built from it.
- **Attribute**: a variable on an object/class; **method**: a function in a class.
- `self` refers to the current instance (a convention, not a keyword).
- `__init__()` runs when an instance is created.

```python
class Student:
    def __init__(self, name):
        self.name = name
```

## Init vs New vs Del

- `__init__()` **initializes** an already-created instance.
- `__new__()` actually **creates** the instance.
- `__del__()` is a finalizer with unpredictable timing — don't rely on it; use context managers for cleanup.

> Remember: `__init__` is commonly called the constructor, but it's technically an initializer.

## Four Pillars ⭐

- **Encapsulation**: bundle data + methods and control access. Conventions: `name` public, `_salary` protected (by convention), `__password` name-mangled. Python does **not** enforce private access like Java.
- **Inheritance**: a child class reuses/extends a parent. **Overriding** = child redefines a parent method. `super()` calls the parent via the MRO. Types: single, multiple, multilevel, hierarchical, hybrid.
- **Polymorphism**: same method name behaves differently per object. **Duck typing**: if an object has the needed behaviour, Python accepts it regardless of its class.
- **Abstraction**: hide details, expose only what's needed. Use the `abc` module: an abstract class with `@abstractmethod` cannot be instantiated until subclasses implement those methods.

```python
from abc import ABC, abstractmethod
class Payment(ABC):
    @abstractmethod
    def pay(self): ...
```

> Remember: Python has no Java-style method overloading — a later same-named method replaces the earlier one. Use default args or `*args` instead.

## Method Types

| Method | First arg | Use |
| --- | --- | --- |
| Instance | `self` | work with object data |
| Class (`@classmethod`) | `cls` | work with class-level data |
| Static (`@staticmethod`) | none | plain utility |

## Key OOP Terms

- **MRO (Method Resolution Order)**: the order Python searches classes for a method.
- `isinstance()` object-vs-class; `issubclass()` class-vs-class.
- **Composition / Aggregation / Association**: HAS-A relationships (aggregation = contained objects can live independently).
- **Dunder / magic methods**: `__init__`, `__str__`, `__len__`, etc.

# Iterators and Generators ⭐

## Iterable vs Iterator

- **Iterable**: an object you can get an iterator from via `iter()` (list, tuple, str, set, dict, range).
- **Iterator**: produces one item at a time via `next()`; raises `StopIteration` when done.

```python
it = iter([10, 20])
next(it)  # 10
```

## Generator ⭐

A special iterator that produces values **lazily** using `yield`. `yield` returns a value and pauses, keeping the function's state for next time. Memory-efficient — it doesn't store the whole sequence.

```python
def nums():
    yield 1
    yield 2
```

> Remember: Every generator is an iterator, but not every iterable is an iterator. A generator is consumed once — it doesn't auto-restart.

# Errors and Files

## Exception Handling ⭐

- `try` holds risky code; `except` handles an error; `else` runs if no error; `finally` always runs (barring process kill); `raise` throws one.
- Catch **specific** exceptions, not a bare `except`.

```python
try:
    print(a / b)
except ZeroDivisionError:
    print("no divide by zero")
finally:
    print("done")
```

Common ones: `ValueError` (right type, bad value), `TypeError`, `KeyError`, `IndexError`, `NameError`, `AttributeError`, `FileNotFoundError`, `StopIteration`, `RecursionError`.

- **Custom exception**: inherit from `Exception`.
- **Syntax error vs exception**: syntax error = invalid code structure; exception = valid code that fails at runtime.
- **`raise` vs `assert`**: `assert` checks a condition and raises `AssertionError`, but assertions can be disabled with `-O`, so don't use them for essential validation.

## File Handling

Open with modes: `r` read (must exist), `w` write (creates/overwrites), `a` append (creates if missing), `x` create-new, `+` read+write, `b`/`t` binary/text. Methods: `read`, `readline`, `readlines`, `write`, `writelines`, `seek`, `tell`.

```python
with open("test.txt", "w") as f:
    f.write("Hello")
```

> Remember: Use `with open(...)` — it auto-closes the file even if an exception occurs. `w` overwrites, `a` appends.

# Concurrency ⭐

## Concurrency vs Parallelism

- **Concurrency**: several tasks make progress over overlapping periods.
- **Parallelism**: tasks truly run at the same time on multiple cores.
- **Thread**: lightweight unit inside a process (shares memory). **Process**: independent program with its own memory.

## The GIL ⭐

The **Global Interpreter Lock** in standard CPython lets only **one thread run Python bytecode at a time**. So:

- Threads **don't** speed up CPU-bound work, but **do** help I/O-bound work (network, files) because the GIL is released while waiting.
- **Multiprocessing** gives real CPU parallelism (separate memory, uses multiple cores).
- Free-threaded CPython builds exist, so the GIL isn't universal.

## Threading vs Multiprocessing

| | Threading | Multiprocessing |
| --- | --- | --- |
| Unit | Thread | Process |
| Memory | Shared | Separate |
| CPU-bound | Limited by GIL | Real parallelism |
| I/O-bound | Good | Works, heavier |
| Overhead / comms | Lower / shared memory | Higher / IPC, queues |

## Async (asyncio)

Cooperative tasks that don't block while waiting. `async def` defines a **coroutine**; `await` suspends it until an awaitable finishes; the **event loop** schedules everything, usually on one thread. `await` does **not** spawn a thread.

```python
import asyncio
async def task():
    await asyncio.sleep(1)
asyncio.run(task())
```

> Remember: I/O-bound → threads or asyncio; CPU-bound → multiprocessing.

# Memory and Copying ⭐

## Memory Management

Everything is an object; variables hold references. CPython uses **reference counting** plus a **garbage collector** that handles reference cycles. `del` removes a name, not necessarily the object. Python frees memory automatically, but you must still manage resources like files and connections.

## Shallow vs Deep Copy ⭐

| Operation | New outer object? | Nested copied? |
| --- | --- | --- |
| Assignment `=` | No (same object) | No |
| `copy.copy` (shallow) | Yes | No (shares nested) |
| `copy.deepcopy` (deep) | Yes | Yes, recursively |

```python
import copy
original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)
original[0][0] = 100
# shallow -> [[100, 2], [3, 4]]  (nested shared)
# deep    -> [[1, 2], [3, 4]]    (fully independent)
```

## Mutable Default Argument Trap ⭐

A default like `items=[]` is created **once** at definition and reused across calls, so it accumulates state.

```python
def add_item(item, items=None):   # correct
    if items is None:
        items = []
    items.append(item)
    return items
```

> Remember: Never use a mutable default (`[]`, `{}`); default to `None` and create inside.

# Modules, venv and pip

## Modules and Packages

- **Module**: a `.py` file of reusable code. **Package**: a folder of modules (regular packages use `__init__.py`).
- Imports: `import math`, `from math import sqrt`, `import math as m`. Avoid `from module import *` in app code (naming conflicts).

## `if __name__ == "__main__"`

`__name__` is `"__main__"` when the file runs directly, else the module's name. Guard startup code with it so it doesn't run on import.

## pip and Virtual Environments

- **pip** installs packages from **PyPI**; a **virtual environment** (`venv`) isolates a project's dependencies.
- `python -m venv venv` → `source venv/bin/activate` → `pip install ...` → `pip freeze > requirements.txt` → `pip install -r requirements.txt`.

> Remember: One venv per project keeps dependencies isolated.

# Built-ins and Data Structures

## Handy Built-in Functions

`len`, `type`, `isinstance`, `id`, `range`, `enumerate`, `zip`, `map`, `filter`, `sorted`, `reversed`, `sum/min/max`, `abs`, `round`, `all`, `any`, `pow`, `divmod`, `chr/ord`, `bin/hex/oct`, `callable`.

- `map()` and `filter()` return lazy iterators — wrap in `list()` to materialize.
- `all()` → every item truthy; `any()` → at least one truthy.
- `reduce()` (from `functools`) combines items into one value.

```python
list(map(lambda x: x*x, [1, 2, 3]))      # [1, 4, 9]
list(filter(lambda x: x % 2 == 0, [1,2,3,4]))  # [2, 4]
```

## collections Module

- `Counter`: counts occurrences. `defaultdict`: default value for missing keys. `deque`: fast add/remove at both ends (use for queues/stacks). `namedtuple`: tuple with named fields. `OrderedDict`: order-aware dict (plain dicts also keep order now).

## Time Complexity (typical)

| Operation | Time |
| --- | --- |
| List index / append / pop-end | O(1) (append amortized) |
| List search / insert or pop at front | O(n) |
| Dict / set lookup and insert | O(1) average |
| Sorting | O(n log n) |

- **Stack** = LIFO (list `append`/`pop`). **Queue** = FIFO (`deque.append`/`popleft`).

# Useful Concepts and Libraries

## Type Hints and Dataclasses

- **Type hints** document expected types (`def add(a: int) -> int`). Not enforced at runtime; tools like **mypy** check them statically. `X | None` marks an optional value.
- **Dataclass** (`@dataclass`) auto-generates `__init__`, `__repr__`, etc. for data-holding classes.

## Context Managers

Manage setup and cleanup via `with`, using `__enter__()` and `__exit__()`. Used for files, DB connections, locks. The `contextlib` module helps build them.

## Regex

The `re` module: `match` (start), `search` (anywhere), `findall` (all matches), `sub` (replace). Example: `re.findall(r"\d+", text)`.

## Libraries to Recognize

Standard: `os`, `sys`, `math`, `random`, `datetime`, `json`, `re`, `collections`, `itertools`, `functools`, `copy`, `pathlib`, `logging`, `pickle`, `csv`, `sqlite3`, `hashlib`, `socket`. Third-party: Requests, Pydantic, SQLAlchemy, NumPy, Pandas, Matplotlib, FastAPI/Django/Flask, Pytest, Celery, Boto3, LangChain.

# Backend Essentials (for Python backend roles)

## Frameworks

| | Django | Flask | FastAPI |
| --- | --- | --- | --- |
| Type | Full framework | Microframework | API framework |
| Built-in ORM | Yes | No | No |
| Auto API docs | No | No | Yes |
| Async | Supported | Limited | Strong |
| Best for | Full web apps | Lightweight apps | APIs |

## REST, HTTP and Status Codes

- **Idempotent** = repeating a request has the same effect as doing it once. GET (safe, cacheable), PUT and DELETE are idempotent; POST and PATCH are generally not.
- Status codes: 200 OK, 201 Created, 204 No Content; 301/302 redirects; 400 Bad Request, **401 not authenticated**, **403 authenticated but not allowed**, 404 Not Found, 409 Conflict, 429 Too Many Requests; 500 server error, 502/503/504 gateway/unavailable/timeout.
- **ORM** maps tables to objects (SQLAlchemy, Django ORM). A **transaction** groups operations; **commit** saves, **rollback** undoes. **Connection pooling** reuses connections.

## Security and Config

- **SQL injection**: never build SQL with string concatenation; use **parameterized queries** (`cursor.execute("... WHERE name = ?", (name,))`).
- Know: input validation, XSS, CSRF, password hashing, encryption, authentication vs authorization, JWT, CORS, rate limiting.
- Keep secrets in **environment variables** (`os.getenv`), never hardcoded or committed.

# Why X vs Y — Common Confusions ⭐

| Question | Short answer |
| --- | --- |
| `==` vs `is` | `==` same value; `is` same object. Use `is None`. |
| `type()` vs `isinstance()` | `isinstance` also accepts subclasses — prefer it. |
| list vs tuple | List mutable; tuple immutable (usable as dict key if all-hashable). |
| set vs frozenset | set mutable; frozenset immutable and hashable. |
| `append()` vs `extend()` | `append` adds one object; `extend` adds each element. |
| `remove()` vs `pop()` | `remove(value)` by value; `pop(index)` by index and returns it. |
| `sort()` vs `sorted()` | `sort()` mutates list, returns None; `sorted()` returns a new list. |
| `dict[k]` vs `dict.get(k)` | `[k]` raises KeyError; `get` returns None/default. |
| `find()` vs `index()` (str) | `find` returns -1 if absent; `index` raises ValueError. |
| assignment vs shallow vs deep copy | New outer object? nested copied? — No/No, Yes/No, Yes/Yes. |
| iterator vs generator | Generator is a simpler lazy iterator made with `yield`. |
| iterable vs iterator | Iterable gives an iterator; iterator produces items via `next()`. |
| `__init__` vs `__new__` | `__new__` creates the instance; `__init__` initializes it. |
| overriding vs overloading | Python has overriding; no true overloading (later def wins). |
| threading vs multiprocessing | Threads share memory, GIL-limited for CPU; processes give real parallelism. |
| `raise` vs `assert` | `assert` can be disabled with `-O`; don't use it for real validation. |
| `return` vs `print` | `return` hands a value back; `print` only displays. |
