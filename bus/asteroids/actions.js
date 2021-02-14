import { types } from "./types";

export const asteroidsActions = {
  fillAsteroids: (asteroids) => {
    return {
      type: types.FILL_ASTEROIDS,
      payload: asteroids,
    }
  },
  // Async
  fetchAsteroidsAsync: () => {
    return {
      type: types.FETCH_ASTEROIDS_ASYNC,
    }
  }
};
