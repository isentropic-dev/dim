/**
 * Force units (M·L·T⁻²).
 *
 * SI unit: newton (N).
 *
 * @example Computing force from mass and acceleration
 * ```ts
 * import { newton } from "@isentropic/dim-si/force";
 * import { kilogram } from "@isentropic/dim-si/mass";
 * import { meterPerSecondSquared } from "@isentropic/dim-si/acceleration";
 * import { multiply, valueIn } from "@isentropic/dim-si/ops";
 *
 * const force = multiply(kilogram(10), meterPerSecondSquared(9.81));
 * valueIn(force, newton);  // 98.1
 * ```
 *
 * @module
 */

import type { Force as ForceDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { force } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI force quantity. */
export type Force = Linear<ForceDim, Si>;

/** Newton (N) — SI unit of force. */
export const newton: BaseUnit<ForceDim> = si.unit(force);
