/**
 * Scalar (dimensionless) quantities.
 *
 * Scalars have no dimension—useful for ratios, counts, and pure numbers.
 *
 * @module
 */

import type { Scalar as ScalarDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import type { Si } from "./system.ts";

/** An SI scalar (dimensionless) quantity. */
export type Scalar = Linear<ScalarDim, Si>;
