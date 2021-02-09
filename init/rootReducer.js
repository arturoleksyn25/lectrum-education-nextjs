import { combineReducers } from 'redux';

import { userReducer as user } from "bus/user/reducer";
import { discountsReducer as discounts } from "bus/discounts/reducer";
import { newsReducer as news } from "bus/news/reducer";
import { carsReducer as cars } from "bus/cars/reducer";


export const rootReducer = combineReducers({
  user,
  discounts,
  news,
  cars
});