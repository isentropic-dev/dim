/**
 * Internal SI-branded type aliases used by unit definition files.
 */

import type { Si } from "./system.ts";
import type {
  AffineUnit as GenericAffineUnit,
  BaseUnit as GenericBaseUnit,
  LinearUnit as GenericLinearUnit,
  ScaledUnit as GenericScaledUnit,
} from "@isentropic/dim-unit";

export type BaseUnit<D> = GenericBaseUnit<D, Si>;
export type ScaledUnit<D> = GenericScaledUnit<D, Si>;
export type LinearUnit<D> = GenericLinearUnit<D, Si>;
export type AffineUnit<D> = GenericAffineUnit<D, Si>;
