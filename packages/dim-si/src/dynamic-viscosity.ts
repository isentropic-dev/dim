/**
 * Dynamic viscosity units (M·L⁻¹·T⁻¹).
 *
 * SI unit: pascal second (Pa·s).
 *
 * @example Creating a dynamic viscosity
 * ```ts
 * import { pascalSecond } from "@isentropic/dim-si/dynamic-viscosity";
 *
 * const water = pascalSecond(0.001);
 * ```
 *
 * @module
 */

import type { DynamicViscosity as DynamicViscosityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { dynamicViscosity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI dynamic viscosity quantity. */
export type DynamicViscosity = Linear<DynamicViscosityDim, Si>;

/** Pascal second (Pa·s) — SI unit of dynamic viscosity. */
export const pascalSecond: BaseUnit<DynamicViscosityDim> = si.unit(
  dynamicViscosity,
);
