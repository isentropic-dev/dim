# Contributing to dim

Thanks for wanting to contribute! This guide exists to save both of us time.

## The One Rule

**You must understand your code.** If you can't explain what your changes do and
how they interact with the rest of the system, your PR will be closed.

Using AI to write code is fine. You can gain understanding by interrogating an
agent with access to the codebase until you grasp all edge cases and effects of
your changes. What's not fine is submitting agent-generated slop without that
understanding.

If you use an agent, run it from the `dim` root directory so it picks up
`AGENTS.md` automatically. Your agent must follow the rules and guidelines in
that file.

## Before You Start

If in doubt, open an issue first. This is especially true for non-trivial
changes — it avoids wasted effort on things that won't be accepted.

## Before Submitting a PR

```bash
deno fmt --check  # must pass with no errors
deno lint         # must pass with no errors
deno test         # must pass
```

Do not edit `CHANGELOG.md`. Changelog entries are added by maintainers.

## Philosophy

dim is minimal and layered. If your change adds runtime overhead, bloats the
type system unnecessarily, or conflates quantities with units, it will likely be
rejected. Review the [ADRs](adr/) for documented design decisions before
proposing changes that touch core abstractions.

## Adding Quantities and Units

### Adding a New ISQ Quantity

Quantities are generated from `quantities.spec.ts`. To add a new derived
quantity:

1. **Add the entry** to the `derived` section in
   `packages/dim-isq/quantities.spec.ts`:

   ```typescript
   derived: {
     // ...existing quantities...
     angularVelocity: { T: -1 },
   },
   ```

   Keys are camelCase and become both the type name (PascalCase) and factory
   function (camelCase). Values map dimension letters to their exponents.

2. **Regenerate** the quantities file:

   ```bash
   deno task --cwd packages/dim-isq generate:quantities
   ```

3. **Update the table** in `packages/dim-isq/README.md` under Available
   Quantities.

4. **Run checks**:

   ```bash
   deno fmt && deno lint && deno test
   ```

> **Note:** Base quantities are fixed to the seven ISQ dimensions and shouldn't
> need to change.

### Adding a New SI Unit

Units are organized one file per dimension. To add a new unit to an existing
dimension, edit its module (e.g., `packages/dim-si/src/length.ts`). To add units
for a new dimension:

1. **Create the unit module** at `packages/dim-si/src/<dimension>.ts`:

   ```typescript
   /**
    * Jerk units (L·T⁻³).
    *
    * SI unit: meter per second cubed (m/s³).
    *
    * @module
    */

   import type { Jerk as JerkDim } from "@isentropic/dim-isq";
   import type { Linear } from "@isentropic/dim-unit";
   import { jerk } from "@isentropic/dim-isq";
   import type { BaseUnit } from "./types.ts";
   import type { Si } from "./system.ts";
   import { si } from "./system.ts";

   /** An SI jerk quantity. */
   export type Jerk = Linear<JerkDim, Si>;

   /** Meter per second cubed (m/s³) — SI unit of jerk. */
   export const meterPerSecondCubed: BaseUnit<JerkDim> = si.unit(jerk);
   ```

   > **Note:** The quantity (`jerk`) must exist in `dim-isq` first. See
   > [Adding a New ISQ Quantity](#adding-a-new-isq-quantity).

   For scaled units, use prefixes or compose from other unit scales:

   ```typescript
   import { KILO } from "./prefixes.ts";

   export const kilometerPerSecondCubed = meterPerSecondCubed.scaled(KILO);
   ```

2. **Add a subpath export** in `packages/dim-si/deno.json`:

   ```jsonc
   "./jerk": "./src/jerk.ts"
   ```

3. **Update the unit listing** in `packages/dim-si/README.md` under Units.

4. **Run checks**:

   ```bash
   deno fmt && deno lint && deno test
   ```

## Questions?

Open an issue.
