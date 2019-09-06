const BigNumber = require("bignumber.js");

const RBTCtcUnits = {};

import rawUnits from "./units.json";
const units = {};

Object.keys(rawUnits).map(function(unit) {
  units[unit] = new BigNumber(rawUnits[unit], 10);
});

RBTCtcUnits.units = rawUnits;

const re = RegExp(/^[0-9]+\.?[0-9]*$/);
RBTCtcUnits.convert = function(value, from, to) {
  if (!re.test(value)) {
    throw new Error("Unsupported value");
  }
  from = from.toLowerCase();
  if (!units[from]) {
    throw new Error("Unsupported input unit");
  }

  if (!units[to]) {
    throw new Error("Unsupported output unit");
  }

  return new BigNumber(value, 10)
    .multipliedBy(units[from])
    .dividedBy(units[to])
    .decimalPlaces(2)
    .toString(10);
};

RBTCtcUnits.lazyConvert = function(value, to) {
  const tmp = value.split(" ");
  if (tmp.length !== 2) {
    throw new Error("Invalid input");
  }
  return RBTCtcUnits.convert(tmp[0], tmp[1], to) + " " + to;
};
export default RBTCtcUnits;
