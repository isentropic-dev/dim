/**
 * Force units (M·L·T⁻²).
 *
 * SI unit: newton (N).
 *
 * @example
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

import type { Force } from "@isentropic/dim-isq";
import { force } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import { si } from "./system.ts";

export type { Force } from "@isentropic/dim-isq";

/** Newton (N) — SI unit of force. */
export const newton: BaseUnit<Force> = si.unit(force);
