import { types } from "./types";

export const catsActions = {
  fillCats: (cats) => {
    return {
      type: types.FILL_CATS,
      payload: cats,
    }
  },
  // Async
  loadCatsAsync: () => {
    return {
      type: types.LOAD_CATS_ASYNC,
    }
  }
};
