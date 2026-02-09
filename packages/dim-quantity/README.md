# @isentropic/dim-quantity

Define quantity systems for compile-time dimensional analysis.

## Quick Start (Spec-Based)

The preferred approach for any non-trivial system.
Define a spec, generate typed factories, and use them.

```typescript
// quantities.spec.ts
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
```

Generate the code:

```bash
deno run -RW jsr:@isentropic/dim-quantity/generate \
  --spec ./quantities.spec.ts \
  --out ./quantities.generated.ts
```

Use the generated factories:

```typescript
import { area, length, time, velocity } from "./quantities.generated.ts";
import {
  add,
  divide,
  multiply,
  scale,
  subtract,
} from "@isentropic/dim-quantity";

const distance = length(100);
const duration = time(10);

const speed = divide(distance, duration); // → velocity
const surface = multiply(length(5), length(5)); // → area

const total = add(length(50), length(30)); // → length(80)
const doubled = scale(distance, 2); // → length(200)

// Dimension mismatches are compile errors
// @ts-expect-error: can't add length and time
add(length(10), time(5));
// @ts-expect-error: can't subtract different dimensions
subtract(velocity(10), area(5));
```

> For Node/Bun, use `generateQuantitySystem()` programmatically:
>
> ```typescript
> import { generateQuantitySystem } from "@isentropic/dim-quantity";
> import { writeFileSync } from "node:fs";
> import spec from "./quantities.spec.ts";
>
> writeFileSync("./quantities.generated.ts", generateQuantitySystem(spec));
> ```

## Quick Start (Code-Based)

For small, one-off quantity systems where code generation isn't worth the overhead.
Define dimensions and factories directly:

```typescript
import { defineQuantitySystem } from "@isentropic/dim-quantity";
import { add, divide } from "@isentropic/dim-quantity";
import type { DimOf } from "@isentropic/dim-quantity";

const qs = defineQuantitySystem(["L", "T"]);

const length = qs.base("L");
const time = qs.base("T");
const velocity = qs.factory({ L: 1, T: -1 });

// Extract dimension types from factory functions
type Length = DimOf<typeof length>;
type Velocity = DimOf<typeof velocity>;

const distance = length(100);  // Quantity<Length>
const duration = time(10);
const speed = divide(distance, duration);  // Quantity<Velocity>

// Dimension mismatches are compile errors
// @ts-expect-error: can't add length and time
add(distance, duration);
```

## License

MIT
