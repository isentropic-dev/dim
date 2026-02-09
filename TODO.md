# TODO

## Fix dim-unit README imports

The Quick Start in `packages/dim-unit/README.md` imports `add`, `divide`, `scale`, `subtract` from `@isentropic/dim-unit`, but these are only exported from `@isentropic/dim-unit/ops`. The main `mod.ts` doesn't re-export ops.

Fix the import block at the top of the Quick Start:

```ts
// Current (broken)
import {
  add,
  defineUnitSystem,
  divide,
  scale,
  subtract,
  valueIn,
} from "@isentropic/dim-unit";

// Should be
import { defineUnitSystem, valueIn } from "@isentropic/dim-unit";
import { add, divide, scale, subtract } from "@isentropic/dim-unit/ops";
```

Check the rest of the README for similar issues.
