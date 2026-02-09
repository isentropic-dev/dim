import { assertAlmostEquals, assertEquals } from "@std/assert";
import {
  add,
  divide,
  multiply,
  subtract,
  valueIn,
} from "@isentropic/dim-si/ops";

// Length
import {
  centimeter,
  kilometer,
  meter,
  micrometer,
  nanometer,
} from "@isentropic/dim-si/length";
// Mass
import {
  gram,
  kilogram,
  microgram,
  milligram,
  tonne,
} from "@isentropic/dim-si/mass";
// Time
import {
  day,
  hour,
  millisecond,
  minute,
  nanosecond,
  second,
} from "@isentropic/dim-si/time";
// Current
import { ampere, milliampere } from "@isentropic/dim-si/current";
// Temperature
import { celsius, fahrenheit, kelvin } from "@isentropic/dim-si/temperature";
// Area
import { hectare, squareMeter } from "@isentropic/dim-si/area";
// Volume
import { cubicMeter, liter, milliliter } from "@isentropic/dim-si/volume";
// Velocity
import { meterPerSecond } from "@isentropic/dim-si/velocity";
// Force
import { newton } from "@isentropic/dim-si/force";
// Pressure
import { bar, pascal } from "@isentropic/dim-si/pressure";
// Energy
import { joule, kilojoule, kilowattHour } from "@isentropic/dim-si/energy";
// Power
import { gigawatt, kilowatt, megawatt, watt } from "@isentropic/dim-si/power";
// Frequency
import {
  becquerel,
  hertz,
  kilohertz,
  megahertz,
} from "@isentropic/dim-si/frequency";
// Charge
import { coulomb } from "@isentropic/dim-si/charge";
// Voltage
import { volt } from "@isentropic/dim-si/voltage";
// Resistance
import { kilohm, ohm } from "@isentropic/dim-si/resistance";
// Conductance
import { siemens } from "@isentropic/dim-si/conductance";
// Capacitance
import { farad, microfarad } from "@isentropic/dim-si/capacitance";
// Inductance
import { henry } from "@isentropic/dim-si/inductance";
// Magnetic flux
import { weber } from "@isentropic/dim-si/magnetic-flux";
// Magnetic flux density
import { tesla } from "@isentropic/dim-si/magnetic-flux-density";
// Absorbed dose
import { gray, sievert } from "@isentropic/dim-si/absorbed-dose";
// Prefixes
import { KILO, MILLI, NANO } from "@isentropic/dim-si/prefixes";

// === Derived Unit Tests ===

Deno.test("derived units: newton = kg·m/s²", () => {
  const f = newton(10);
  assertEquals(f.value, 10);

  // F = m × a
  const m = kilogram(2);
  const a = divide(meter(5), multiply(second(1), second(1)));
  const force = multiply(m, a);
  assertEquals(valueIn(force, newton), 10);
});

Deno.test("derived units: joule = N·m", () => {
  const e = joule(100);
  assertEquals(e.value, 100);

  // E = F × d
  const force = newton(10);
  const distance = meter(10);
  const energy = multiply(force, distance);
  assertEquals(valueIn(energy, joule), 100);
});

Deno.test("derived units: watt = J/s", () => {
  const p = watt(50);
  assertEquals(p.value, 50);

  // P = E / t
  const energy = joule(100);
  const time = second(2);
  const power = divide(energy, time);
  assertEquals(valueIn(power, watt), 50);
});

Deno.test("derived units: volt = W/A", () => {
  const v = volt(12);
  assertEquals(v.value, 12);

  // V = P / I
  const power = watt(24);
  const current = ampere(2);
  const voltage = divide(power, current);
  assertEquals(valueIn(voltage, volt), 12);
});

Deno.test("derived units: ohm = V/A", () => {
  const r = ohm(100);
  assertEquals(r.value, 100);

  // R = V / I (Ohm's law)
  const voltage = volt(10);
  const current = ampere(0.1);
  const resistance = divide(voltage, current);
  assertEquals(valueIn(resistance, ohm), 100);
});

Deno.test("derived units: coulomb = A·s", () => {
  const q = coulomb(10);
  assertEquals(q.value, 10);

  // Q = I × t
  const current = ampere(2);
  const time = second(5);
  const charge = multiply(current, time);
  assertEquals(valueIn(charge, coulomb), 10);
});

Deno.test("derived units: hertz", () => {
  const f = hertz(60);
  assertEquals(f.value, 60);
});

Deno.test("derived units: pascal = N/m²", () => {
  const p = pascal(1000);
  assertEquals(p.value, 1000);

  // P = F / A
  const force = newton(100);
  const area = squareMeter(0.1);
  const pressure = divide(force, area);
  assertEquals(valueIn(pressure, pascal), 1000);
});

Deno.test("derived units: farad = C/V", () => {
  // Capacitance = charge / voltage
  const charge = coulomb(10);
  const voltage = volt(5);
  const capacitance = divide(charge, voltage);
  assertEquals(valueIn(capacitance, farad), 2);
});

Deno.test("derived units: siemens = A/V", () => {
  // Conductance = current / voltage (inverse of resistance)
  const current = ampere(2);
  const voltage = volt(10);
  const conductance = divide(current, voltage);
  assertEquals(valueIn(conductance, siemens), 0.2);
});

Deno.test("derived units: weber = V·s", () => {
  // Magnetic flux = voltage × time
  const voltage = volt(5);
  const time = second(4);
  const flux = multiply(voltage, time);
  assertEquals(valueIn(flux, weber), 20);
});

Deno.test("derived units: henry = Wb/A", () => {
  // Inductance = magnetic flux / current
  const flux = weber(10);
  const current = ampere(2);
  const inductance = divide(flux, current);
  assertEquals(valueIn(inductance, henry), 5);
});

Deno.test("derived units: tesla = Wb/m²", () => {
  // Magnetic flux density = flux / area
  const flux = weber(8);
  const area = squareMeter(4);
  const fluxDensity = divide(flux, area);
  assertEquals(valueIn(fluxDensity, tesla), 2);
});

// === Dimensional Aliasing ===
// Some SI units share dimensions but represent different physical quantities.
// This is intentional and matches SI definitions.

Deno.test("dimensional aliasing: becquerel = hertz (T⁻¹)", () => {
  // Both have dimension T⁻¹, but represent different concepts:
  // - becquerel: radioactive decay events per second
  // - hertz: cycles per second
  const activity = becquerel(100);
  const freq = hertz(100);
  assertEquals(activity.value, freq.value);
  // These are type-compatible, which matches SI definitions
});

Deno.test("dimensional aliasing: sievert = gray (L²·T⁻²)", () => {
  // Both have dimension L²·T⁻², but represent different concepts:
  // - gray: absorbed radiation dose (energy per mass)
  // - sievert: equivalent dose (accounts for radiation type)
  const absorbed = gray(1);
  const equivalent = sievert(1);
  assertEquals(absorbed.value, equivalent.value);
  // These are type-compatible, which matches SI definitions
});

// === Prefixed Unit Tests ===

Deno.test("prefixed units: length", () => {
  const d = kilometer(5);
  assertEquals(valueIn(d, meter), 5000);
  assertEquals(valueIn(d, kilometer), 5);
  assertEquals(valueIn(d, centimeter), 500000);

  const small = nanometer(100);
  assertAlmostEquals(valueIn(small, meter), 100e-9);
  assertAlmostEquals(valueIn(small, micrometer), 0.1);
});

Deno.test("prefixed units: mass (gram from kilogram)", () => {
  const m = gram(500);
  assertEquals(valueIn(m, kilogram), 0.5);
  assertEquals(valueIn(m, gram), 500);

  const tiny = microgram(100);
  assertAlmostEquals(valueIn(tiny, gram), 100e-6);
  assertAlmostEquals(valueIn(tiny, milligram), 0.1);

  const heavy = tonne(2);
  assertEquals(valueIn(heavy, kilogram), 2000);
});

Deno.test("prefixed units: time", () => {
  const t = millisecond(500);
  assertEquals(valueIn(t, second), 0.5);

  const fast = nanosecond(100);
  assertAlmostEquals(valueIn(fast, second), 100e-9);

  const long = hour(2);
  assertEquals(valueIn(long, second), 7200);
  assertEquals(valueIn(long, minute), 120);
});

Deno.test("prefixed units: frequency", () => {
  const f = megahertz(2.4);
  assertEquals(valueIn(f, hertz), 2400000);
  assertEquals(valueIn(f, kilohertz), 2400);
});

Deno.test("prefixed units: power", () => {
  const p = kilowatt(1.5);
  assertEquals(valueIn(p, watt), 1500);

  const big = gigawatt(1.21);
  assertEquals(valueIn(big, megawatt), 1210);
});

Deno.test("prefixed units: electrical", () => {
  const r = kilohm(4.7);
  assertEquals(valueIn(r, ohm), 4700);

  const c = microfarad(100);
  assertEquals(valueIn(c, microfarad), 100);

  const i = milliampere(20);
  assertEquals(valueIn(i, ampere), 0.02);
});

// === SI-Accepted Units ===

Deno.test("SI-accepted: time units", () => {
  const t = day(1);
  assertEquals(valueIn(t, hour), 24);
  assertEquals(valueIn(t, minute), 1440);
  assertEquals(valueIn(t, second), 86400);
});

Deno.test("SI-accepted: volume (liter)", () => {
  const v = liter(1);
  assertEquals(valueIn(v, cubicMeter), 0.001);
  assertAlmostEquals(valueIn(v, milliliter), 1000);
});

Deno.test("SI-accepted: area (hectare)", () => {
  const a = hectare(1);
  assertEquals(valueIn(a, squareMeter), 10000);
});

Deno.test("SI-accepted: pressure (bar)", () => {
  const p = bar(1);
  assertEquals(valueIn(p, pascal), 100000);
});

Deno.test("SI-accepted: mass (tonne)", () => {
  const m = tonne(1);
  assertEquals(valueIn(m, kilogram), 1000);
});

// === Compound Scaled Units ===

Deno.test("compound: kilowatt-hour", () => {
  const e = kilowattHour(1);
  assertEquals(valueIn(e, joule), 3600000);
  assertEquals(valueIn(e, kilojoule), 3600);

  // 1 kWh = 1 kW × 1 h
  const power = kilowatt(1);
  const time = hour(1);
  const energy = multiply(power, time);
  assertEquals(valueIn(energy, kilowattHour), 1);
});

// === Affine Units (Temperature) ===

Deno.test("affine: celsius to kelvin", () => {
  const freezing = celsius(0);
  assertEquals(valueIn(freezing, kelvin), 273.15);

  const boiling = celsius(100);
  assertEquals(valueIn(boiling, kelvin), 373.15);
});

Deno.test("affine: fahrenheit to kelvin", () => {
  const freezing = fahrenheit(32);
  const kelvinValue = valueIn(freezing, kelvin);
  assertAlmostEquals(kelvinValue, 273.15, 0.01);

  const boiling = fahrenheit(212);
  const boilingKelvin = valueIn(boiling, kelvin);
  assertAlmostEquals(boilingKelvin, 373.15, 0.01);
});

Deno.test("affine: celsius to fahrenheit", () => {
  const c = celsius(100);
  const f = valueIn(c, fahrenheit);
  assertAlmostEquals(f, 212, 0.01);

  const c2 = celsius(0);
  const f2 = valueIn(c2, fahrenheit);
  assertAlmostEquals(f2, 32, 0.01);
});

Deno.test("affine: temperature differences", () => {
  const t1 = celsius(20);
  const t2 = celsius(25);

  // Subtracting affine quantities gives linear delta
  const diff = subtract(t2, t1);
  assertEquals(diff.value, 5); // 5 K
  assertEquals(valueIn(diff, celsius.delta), 5);

  // Adding delta to affine gives affine
  const warmer = add(t1, celsius.delta(10));
  assertEquals(valueIn(warmer, celsius), 30);
});

// === Prefix Constants ===

Deno.test("prefix constants: values", () => {
  assertEquals(KILO, 1000);
  assertEquals(MILLI, 0.001);
  assertEquals(NANO, 1e-9);
});

Deno.test("prefix constants: custom scaling", () => {
  // Users can create their own prefixed units
  const megameter = meter.scaled(1e6);
  assertEquals(megameter.scale, 1e6);

  const m = megameter(1);
  assertEquals(valueIn(m, kilometer), 1000);
});

// === Operations Between Units ===

Deno.test("operations: mixed unit arithmetic", () => {
  const d1 = kilometer(5);
  const d2 = meter(500);

  const total = add(d1, d2);
  assertEquals(valueIn(total, meter), 5500);
  assertEquals(valueIn(total, kilometer), 5.5);
});

Deno.test("operations: velocity calculation", () => {
  const distance = kilometer(100);
  const time = hour(2);

  const speed = divide(distance, time);
  // 100 km / 2 h = 50 km/h = 13.89 m/s
  assertAlmostEquals(valueIn(speed, meterPerSecond), 13.8889, 0.001);
});


