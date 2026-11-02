# PLAN — Python (new tech, template v3)

Reference: `reference/python.md` (owner input, 27 sections). Slug `python`, accent `cobalt` (new), Python-only code. Baseline **Python 3.14** (current stable; PEP 779 free-threading officially supported; dict ordered since 3.7; `X | None` since 3.10; `match` since 3.10).

## Topics (9) and 65 concepts

1. Python Basics — what-is-python, python-execution-model, dynamic-and-strong-typing, variables-and-objects
2. Data Types and Memory — builtin-data-types, mutable-vs-immutable, type-checking, memory-and-gc, shallow-vs-deep-copy, mutable-default-argument
3. Operators and Control Flow — operators-overview, equality-vs-identity, conditionals, loops, loop-control, iteration-helpers
4. Strings and Collections — strings, string-methods, lists, tuples, sets, dictionaries, comprehensions, unpacking-and-swapping
5. Functions — functions-basics, function-arguments, lambda, recursion, scope-legb, closures, decorators
6. Object-Oriented Python — class-and-object, init-new-del, encapsulation, inheritance, polymorphism, abstraction, method-types, mro, dunder-methods
7. Iterators, Generators and Errors — iterable-vs-iterator, generators, context-managers, exceptions, custom-exceptions, file-handling, map-filter-reduce, type-hints, dataclasses
8. Concurrency and Tooling — concurrency-vs-parallelism, threading, multiprocessing, gil, asyncio, modules-and-packages, venv-and-pip, collections-module, time-complexity
9. Python in Practice — python-web-frameworks, testing-and-logging, regex, string-coding-problems, number-coding-problems, collection-coding-problems, python-for-java-developers

## Comparisons (15)

list-vs-tuple, list-set-dict, mutable-vs-immutable, is-vs-equals, shallow-vs-deep-copy, type-vs-isinstance, args-vs-kwargs, instance-class-static-method, init-vs-new, iterator-vs-generator, list-comp-vs-generator-expr, concurrency-vs-parallelism, process-vs-thread, threading-vs-multiprocessing, django-flask-fastapi

## Workflow

Structural files (me) → glossary + comparisons (parallel agents) → cards topic-by-topic (parallel agents, v3 spec + gold example) → independent verification agents → coverage close → gates (validate/lint/typecheck/build) → browser QA → commit + push.

## Decisions / notes

- Backend REST/HTTP/status-codes/security are other techs on the site; covered here only as Python-specific points/glossary, not re-taught in depth (principle: write each fact once).
- Running example where natural: a small online-shop / orders thread (list of orders, Order class, totals, streaming).
- Owner value-add: `python-for-java-developers` concept + 3 coding-problem concepts with practice boxes (per owner's coding emphasis).
