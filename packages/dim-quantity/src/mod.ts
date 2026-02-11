/**
 * Define quantity systems for compile-time dimensional analysis.
 *
 * A quantity encodes dimensionality — dimensions are tracked at compile time
 * so the type checker catches errors like adding a length to a time before
 * your code runs. Unit systems (via
 * {@link https://jsr.io/@isentropic/dim-unit | @isentropic/dim-unit}) layer
 * on top to give quantities physical meaning with scale factors and offsets.
 *
 * There are two ways to define a quantity system:
 *
 * ### Spec-based (recommended)
 *
 * Define a spec and generate typed factories with
 * {@linkcode generateQuantitySystem} from `@isentropic/dim-quantity/generate`:
 *
 * ```ts
 * import { defineQuantitySpec } from "@isentropic/dim-quantity/generate";
 *
 * export default defineQuantitySpec({
 *   name: "physics",
 *   dims: ["L", "T"],
 *   quantities: {
 *     base: { length: "L", time: "T" },
 *     derived: { velocity: { L: 1, T: -1 }, area: { L: 2 } },
 *   },
 * });
 * ```
 *
 * ```sh
 * deno run -RW jsr:@isentropic/dim-quantity/generate \
 *   --spec ./quantities.spec.ts \
 *   --out ./quantities.generated.ts
 * ```
 *
 * ### Code-based
 *
 * For small or one-off systems, define dimensions and factories directly:
 *
 * ```ts
 * import { defineQuantitySystem } from "@isentropic/dim-quantity";
 * import { divide } from "@isentropic/dim-quantity/ops";
 *
 * const sys = defineQuantitySystem(["L", "T"]);
 * const length = sys.base("L");
 * const time = sys.base("T");
 *
 * const velocity = divide(length(100), time(10));
 * console.log(velocity.value); // 10
 * ```
 *
 * @module
 */

export type { Quantity } from "./quantity.ts";
export { defineQuantitySystem } from "./system.ts";
export type { DimOf, QuantityFactory, QuantitySystem } from "./system.ts";
export type { Dim, DivDim, MulDim, WithDefaults } from "./dimensions.ts";
export type { Exp } from "./exponents.generated.ts";
