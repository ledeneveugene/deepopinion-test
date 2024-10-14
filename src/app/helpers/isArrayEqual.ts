import isEmpty from "lodash/isEmpty";
import xorWith from "lodash/xorWith";
import isEqual from "lodash/isEqual";

export const isArrayEqual = (
  x?: Record<string, unknown>[],
  y?: Record<string, unknown>[]
) => {
  if (!x || !y) {
    return false;
  }
  
  return isEmpty(xorWith(x, y, isEqual));
};

