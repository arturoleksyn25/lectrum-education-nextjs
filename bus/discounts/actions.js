import { types } from "./types";

export const discountsActions = {
  fillDiscounts: (discounts) => {
    return {
      type: types.FILL_DISCOUNTS,
      payload: discounts
    }
  },
};
