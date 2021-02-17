import { combineReducers } from 'redux';

import { userReducer as user } from "bus/user/reducer";
import { discountsReducer as discounts } from "bus/discounts/reducer";
import { newsReducer as news } from "bus/news/reducer";
import { carsReducer as cars } from "bus/cars/reducer";
import { asteroidsReducer as asteroids } from "bus/asteroids/reducer";
import { catsReducer as cats } from "bus/cats/reducer";


export const rootReducer = combineReducers({
  user,
  discounts,
  news,
  cars,
  asteroids,
  cats
});
