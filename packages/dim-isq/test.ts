import { assertEquals } from "@std/assert";
import { add, divide, multiply } from "@isentropic/dim-isq/ops";
import {
  acceleration,
  energy,
  force,
  isq,
  length,
  mass,
  time,
  velocity,
} from "./src/mod.ts";

Deno.test("smoke: generated system works end-to-end", () => {
  // Base quantities
  const d = length(100);
  const t = time(10);

  // Derived via operations
  const v = divide(d, t);
  assertEquals(v, velocity(10));

  // Chain of derivations: F = m * a = m * v / t
  const m = mass(5);
  const a = divide(v, t);
  assertEquals(a, acceleration(1));

  const f = multiply(m, a);
  assertEquals(f, force(5));

  // Energy = force * distance
  const e = multiply(f, d);
  assertEquals(e, energy(500));

  // Scalar
  assertEquals(divide(d, d), isq.scalar(1));
});

Deno.test("smoke: add same dimensions", () => {
  assertEquals(add(length(5), length(3)), length(8));
  assertEquals(add(velocity(10), velocity(5)), velocity(15));
});

// Compile-time type safety checks (7-dimension ISQ-specific)
function _compileTimeChecks() {
  // @ts-expect-error: cannot add length and time
  add(length(1), time(1));

  // @ts-expect-error: cannot add velocity and acceleration
  add(velocity(1), acceleration(1));

  // @ts-expect-error: cannot add force and energy
  add(force(1), energy(1));
}
