# @isentropic/dim-quantity

Define quantity systems for compile-time dimensional analysis.

> Looking for standard ISQ quantities? See
> [`@isentropic/dim-isq`](https://github.com/isentropic-dev/dim/blob/main/packages/dim-isq/README.md).

## Usage

### Spec-based

The preferred approach for any non-trivial system. Define a spec, generate typed
factories, and use them.

```typescript
// quantities.spec.ts
import { defineQuantitySpec } from "@isentropic/dim-quantity/generate";

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
import { add, divide, multiply } from "@isentropic/dim-quantity/ops";

const distance = length(100);
const duration = time(10);

const speed = divide(distance, duration);
const surface = multiply(length(5), length(5));
const total = add(length(50), length(30));

// Dimension mismatches are compile errors
// add(length(10), time(5));     // Can't add length and time
```

> For Node/Bun, use `generateQuantitySystem()` programmatically:
>
> ```typescript
> import { generateQuantitySystem } from "@isentropic/dim-quantity/generate";
> import { writeFileSync } from "node:fs";
> import spec from "./quantities.spec.ts";
>
> writeFileSync("./quantities.generated.ts", generateQuantitySystem(spec));
> ```

### Code-based

For small, one-off quantity systems where code generation isn't worth the
overhead:

```typescript
import { defineQuantitySystem } from "@isentropic/dim-quantity";
import { add, divide } from "@isentropic/dim-quantity/ops";
import type { DimOf } from "@isentropic/dim-quantity";

const qs = defineQuantitySystem(["L", "T"]);

const length = qs.base("L");
const time = qs.base("T");
const velocity = qs.factory({ L: 1, T: -1 });

// Extract dimension types from factory functions
type Length = DimOf<typeof length>;
type Velocity = DimOf<typeof velocity>;

const distance = length(100);
const duration = time(10);
const speed = divide(distance, duration);

// Dimension mismatches are compile errors
// add(distance, duration);     // Can't add length and time
```

## Installation

```bash
# Deno
deno add jsr:@isentropic/dim-quantity
# npm
npm install @isentropic/dim-quantity
# Bun
bun add @isentropic/dim-quantity
```

## License

MIT
