import { assertAlmostEquals, assertEquals } from "@std/assert";
import { defineQuantitySystem } from "@isentropic/dim-quantity";
import { defineUnitSystem, valueIn } from "./src/mod.ts";
import { add, divide, multiply, scale, subtract } from "./src/ops.ts";

// === Setup ===

const qs = defineQuantitySystem(["L", "T", "Θ"]);

const length = qs.factory({ L: 1, T: 0, Θ: 0 });
const time = qs.factory({ L: 0, T: 1, Θ: 0 });
const velocity = qs.factory({ L: 1, T: -1, Θ: 0 });
const temperature = qs.factory({ L: 0, T: 0, Θ: 1 });

const us = defineUnitSystem("test", qs);

// Linear units
const meter = us.unit(length);
const kilometer = meter.scaled(1000);
const centimeter = meter.scaled(0.01);

const second = us.unit(time);
const hour = second.scaled(3600);

const meterPerSecond = us.unit(velocity);
const kilometerPerHour = meterPerSecond.scaled(1000 / 3600);

// Affine units
const kelvin = us.unit(temperature);
const celsius = kelvin.offset(273.15);
const fahrenheit = kelvin.scaled(5 / 9).offset(459.67 * 5 / 9);

// === Tests ===

Deno.test("linear units: creation and extraction", () => {
  const d = kilometer(5);
  assertEquals(d.value, 5000); // stored in base units (meters)
  assertEquals(valueIn(d, meter), 5000);
  assertEquals(valueIn(d, kilometer), 5);
  assertEquals(valueIn(d, centimeter), 500000);
});

Deno.test("linear units: operations", () => {
  const d1 = kilometer(5);
  const d2 = kilometer(3);
  const t = hour(2);

  const sum = add(d1, d2);
  assertEquals(valueIn(sum, kilometer), 8);

  const diff = subtract(d1, d2);
  assertEquals(valueIn(diff, kilometer), 2);

  const doubled = scale(d1, 2);
  assertEquals(valueIn(doubled, kilometer), 10);

  const v = divide(d1, t);
  assertEquals(valueIn(v, kilometerPerHour), 2.5);
});

Deno.test("linear units: chained scaling", () => {
  // ScaledUnit.scaled() allows chained scaling
  const gram = kilometer.scaled(0.001); // pretend this is gram from kg
  const milligram = gram.scaled(0.001);

  assertEquals(gram.scale, 1); // 1000 * 0.001 = 1
  assertEquals(milligram.scale, 0.001); // 1 * 0.001 = 0.001
});

Deno.test("affine units: creation and extraction", () => {
  const boiling = celsius(100);
  assertEquals(boiling.value, 373.15); // stored in base units (kelvin)
  assertEquals(boiling._affine, true);
  assertEquals(valueIn(boiling, kelvin), 373.15);
  assertEquals(valueIn(boiling, celsius), 100);
});

Deno.test("affine units: delta creation and extraction", () => {
  const rise = celsius.delta(10);
  assertEquals(rise.value, 10); // delta has no offset
  assertEquals(valueIn(rise, celsius.delta), 10);
  assertEquals(valueIn(rise, kelvin), 10); // same as kelvin since scale=1
});

Deno.test("affine operations: subtract affine - affine = linear", () => {
  const boiling = celsius(100);
  const freezing = celsius(0);

  const diff = subtract(boiling, freezing);
  assertEquals(diff.value, 100); // 100K difference
  assertEquals(valueIn(diff, celsius.delta), 100);

  // Result is Linear, not Affine
  assertEquals("_affine" in diff, false);
});

Deno.test("affine operations: affine + linear = affine", () => {
  const boiling = celsius(100);
  const rise = celsius.delta(10);

  const result = add(boiling, rise);
  assertEquals(result.value, 383.15);
  assertEquals(valueIn(result, celsius), 110);
  assertEquals(result._affine, true);
});

Deno.test("affine operations: affine - linear = affine", () => {
  const boiling = celsius(100);
  const drop = celsius.delta(10);

  const result = subtract(boiling, drop);
  assertEquals(result.value, 363.15);
  assertEquals(valueIn(result, celsius), 90);
  assertEquals(result._affine, true);
});

Deno.test("unit properties: scale and offset", () => {
  assertEquals(meter.scale, 1);
  assertEquals(kilometer.scale, 1000);

  assertEquals(kelvin.scale, 1);
  assertEquals(celsius.scale, 1);
  assertEquals(celsius.offset, 273.15);
  assertEquals(celsius.delta.scale, 1);
});

Deno.test("fahrenheit: complex affine conversion", () => {
  const freezing = fahrenheit(32);
  // 32°F = 0°C = 273.15K
  const kelvinValue = valueIn(freezing, kelvin);
  assertAlmostEquals(kelvinValue, 273.15, 0.01);

  const boiling = fahrenheit(212);
  // 212°F = 100°C = 373.15K
  const boilingKelvin = valueIn(boiling, kelvin);
  assertAlmostEquals(boilingKelvin, 373.15, 0.01);

  // Convert Celsius to Fahrenheit
  const celsiusBoiling = celsius(100);
  const fahrenheitValue = valueIn(celsiusBoiling, fahrenheit);
  assertAlmostEquals(fahrenheitValue, 212, 0.01);
});

Deno.test("unit system: name property", () => {
  assertEquals(us.name, "test");
});

Deno.test("type safety: affine units cannot derive further", () => {
  // Affine units cannot be further derived
  // @ts-expect-error: affine units don't have .scaled()
  celsius.scaled;

  // celsius.offset is a number property, not a method - that's correct
  assertEquals(typeof celsius.offset, "number");
});

// Compile-time type safety checks
function _compileTimeChecks() {
  const affine1 = celsius(100);
  const affine2 = celsius(50);
  const linear = celsius.delta(10);

  // @ts-expect-error: cannot add two affine quantities
  add(affine1, affine2);

  // @ts-expect-error: cannot multiply affine quantities
  multiply(affine1, linear);

  // @ts-expect-error: cannot scale affine quantities
  scale(affine1, 2);

  // Chained scaling is allowed
  const _mm = centimeter.scaled(0.1);

  // Cross-system operations are rejected
  const otherQs = defineQuantitySystem(["L", "T", "Θ"]);
  const otherLength = otherQs.factory({ L: 1, T: 0, Θ: 0 });
  const otherUs = defineUnitSystem("other", otherQs);
  const foot = otherUs.unit(otherLength);

  // @ts-expect-error: cannot add quantities from different unit systems
  add(meter(1), foot(1));

  // @ts-expect-error: cannot subtract quantities from different unit systems
  subtract(meter(1), foot(1));

  // @ts-expect-error: cannot multiply quantities from different unit systems
  multiply(meter(1), foot(1));

  // @ts-expect-error: cannot divide quantities from different unit systems
  divide(meter(1), foot(1));

  // @ts-expect-error: cannot use valueIn with mismatched systems
  valueIn(meter(1), foot);
}
