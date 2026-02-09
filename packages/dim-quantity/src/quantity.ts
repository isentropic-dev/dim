/** A quantity: a numeric value tagged with a phantom dimension type. */
export type Quantity<D> = {
  readonly value: number;
  readonly _dim?: D;
};
