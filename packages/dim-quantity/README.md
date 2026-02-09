# @isentropic/dim-quantity

Define quantity systems with compile-time dimensional analysis in TypeScript.

## Quick Start

```ts
// 1. Define a spec
import { defineQuantitySpec } from "@isentropic/dim-quantity";

export default defineQuantitySpec({
  name: "physics",
  dims: ["L", "T"],
  quantities: {
    base: {
      length: "L",
      time: "T",
    },
    derived: {
      velocity: { L: 1, T: -1 },
      area: { L: 2 },
    },
  },
});

// 2. Generate code (via CLI or generateQuantitySystem())
// → produces physics.generated.ts with typed factories

// 3. Use the generated code
import { area, length, time, velocity } from "./physics.generated.ts";
import {
  add,
  divide,
  multiply,
  scale,
  subtract,
} from "@isentropic/dim-quantity";

const distance = length(100);
const duration = time(10);

// Arithmetic with automatic dimension tracking
const speed = divide(distance, duration); // → velocity
const surface = multiply(length(5), length(5)); // → area

// Same-dimension operations
const total = add(length(50), length(30)); // → length(80)
const doubled = scale(distance, 2); // → length(200)

// Dimension mismatches are compile errors
// @ts-expect-error: can't add length and time
add(length(10), time(5));
// @ts-expect-error: can't subtract different dimensions
subtract(velocity(10), area(5));
```

## Core Concepts

A **quantity** is a number with compile-time dimension tracking—no unit semantics attached.
The value `length(100)` is just `100` tagged with dimension `L`;
whether that represents meters, feet, or furlongs is not modeled here.

**Units** (scale factors and offsets) are layered on top by `dim-unit`.

## Why

Dimensional errors are silent bugs that type systems usually ignore.
This package encodes dimensions in the type system
so the compiler catches these mistakes before your code runs.

```ts
add(length(10), time(5));
//  ~~~~~~~~~~~
//  Error: Types '{ L: 1; T: 0 }' and '{ L: 0; T: 1 }' have no overlap
```

## Code Generation

**Deno:**

```bash
deno run -RW jsr:@isentropic/dim-quantity/generate \
  --spec ./quantities.spec.ts \
  --out ./quantities.generated.ts
```

**Node/Bun:**

```ts
import { generateQuantitySystem } from "@isentropic/dim-quantity";
import { writeFileSync } from "node:fs";
import spec from "./quantities.spec.ts";

writeFileSync("./quantities.generated.ts", generateQuantitySystem(spec));
```

## License

MIT
