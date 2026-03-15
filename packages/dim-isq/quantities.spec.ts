import { defineQuantitySpec } from "@isentropic/dim-quantity/generate";

/**
 * ISQ (International System of Quantities) specification.
 *
 * Base dimensions:
 * - L: Length
 * - M: Mass
 * - T: Time
 * - I: Electric current
 * - Θ: Thermodynamic temperature
 * - N: Amount of substance
 * - J: Luminous intensity
 */
export default defineQuantitySpec({
  name: "isq",
  regenHint: "Regenerate with: deno task generate:quantities",
  dims: ["L", "M", "T", "I", "Θ", "N", "J"],
  quantities: {
    base: {
      length: "L",
      mass: "M",
      time: "T",
      current: "I",
      temperature: "Θ",
      amount: "N",
      luminosity: "J",
    },
    derived: {
      // Geometry
      area: { L: 2 },
      volume: { L: 3 },

      // Mechanics
      velocity: { L: 1, T: -1 },
      acceleration: { L: 1, T: -2 },
      force: { M: 1, L: 1, T: -2 },
      energy: { M: 1, L: 2, T: -2 },
      power: { M: 1, L: 2, T: -3 },
      pressure: { M: 1, L: -1, T: -2 },
      frequency: { T: -1 },
      density: { M: 1, L: -3 },
      specificVolume: { M: -1, L: 3 },
      momentum: { M: 1, L: 1, T: -1 },
      angularVelocity: { T: -1 },
      angularAcceleration: { T: -2 },
      torque: { M: 1, L: 2, T: -2 },
      dynamicViscosity: { M: 1, L: -1, T: -1 },
      kinematicViscosity: { L: 2, T: -1 },
      surfaceTension: { M: 1, T: -2 },
      wavenumber: { L: -1 },

      // Electromagnetism
      charge: { I: 1, T: 1 },
      voltage: { M: 1, L: 2, T: -3, I: -1 },
      resistance: { M: 1, L: 2, T: -3, I: -2 },
      capacitance: { M: -1, L: -2, T: 4, I: 2 },
      inductance: { M: 1, L: 2, T: -2, I: -2 },
      conductance: { M: -1, L: -2, T: 3, I: 2 },
      magneticFlux: { M: 1, L: 2, T: -2, I: -1 },
      magneticFluxDensity: { M: 1, T: -2, I: -1 },
      electricFieldStrength: { M: 1, L: 1, T: -3, I: -1 },
      permittivity: { M: -1, L: -3, T: 4, I: 2 },
      permeability: { M: 1, L: 1, T: -2, I: -2 },
      currentDensity: { I: 1, L: -2 },

      // Photometry
      luminousFlux: { J: 1 },
      illuminance: { J: 1, L: -2 },

      // Radiation and other
      absorbedDose: { L: 2, T: -2 },
      catalyticActivity: { N: 1, T: -1 },

      // Thermal
      thermalConductance: { M: 1, L: 2, T: -3, "Θ": -1 },
      heatCapacity: { M: 1, L: 2, T: -2, "Θ": -1 },
      specificHeatCapacity: { L: 2, T: -2, "Θ": -1 },
      specificEnergy: { L: 2, T: -2 },
      thermalConductivity: { M: 1, L: 1, T: -3, "Θ": -1 },

      // Flow and transport
      volumetricFlowRate: { L: 3, T: -1 },
      massFlowRate: { M: 1, T: -1 },

      // Amount-based
      concentration: { N: 1, L: -3 },
      molarMass: { M: 1, N: -1 },
    },
  },
});
