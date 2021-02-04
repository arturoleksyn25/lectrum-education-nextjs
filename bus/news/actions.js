import { types } from "./types";

export const newsActions = {
  fillNews: (news) => {
    return {
      type: types.FILL_NEWS,
      payload: news
    }
  },
};
