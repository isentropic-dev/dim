/**
 * SI unit system definition and type aliases.
 *
 * @example
 * ```ts
 * import { si, type BaseUnit } from "@isentropic/dim-si/system";
 * import { length, type Length } from "@isentropic/dim-isq";
 *
 * const meter: BaseUnit<Length> = si.unit(length);
 * ```
 *
 * @module
 */

import { isq, type IsqDims } from "@isentropic/dim-isq";
import {
  type AffineUnit as GenericAffineUnit,
  type BaseUnit as GenericBaseUnit,
  defineUnitSystem,
  type LinearUnit as GenericLinearUnit,
  type ScaledUnit as GenericScaledUnit,
  type UnitSystem,
} from "@isentropic/dim-unit";

/** The SI unit system name (used as type brand). */
export type Si = "si";

/** The SI unit system. */
export const si: UnitSystem<IsqDims, Si> = defineUnitSystem("si", isq);

/** A base unit in the SI system. */
export type BaseUnit<D> = GenericBaseUnit<D, Si>;

/** A scaled unit in the SI system. */
export type ScaledUnit<D> = GenericScaledUnit<D, Si>;

/** A linear unit in the SI system. */
export type LinearUnit<D> = GenericLinearUnit<D, Si>;

/** An affine unit in the SI system. */
export type AffineUnit<D> = GenericAffineUnit<D, Si>;
