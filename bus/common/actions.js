import { types } from "./types";

export const commonActions = {
  toggleIsLoading: (is_loading) => {
    return {
      type: types.TOGGLE_IS_LOADING,
      payload: is_loading
    }
  }
};
