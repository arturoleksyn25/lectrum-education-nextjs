import fs from 'fs';
const path = require('path');
import {reject} from "ramda";

export const getFile = (url) => {
  return new Promise((resolve) => {
    fs.readFile(path.resolve(`/tmp/${url}`), {encoding: 'utf-8'}, (err, data) => {
      resolve(err ? [] : JSON.parse(data))
    });
  });
}

export const setFile = (url, data) => {
  return new Promise((resolve) => {
    fs.writeFile(path.resolve(`/tmp/${url}`), JSON.stringify(data), (err) => {
      if (err) {
        reject(err)
        throw err;
      }
      resolve('file was saved successful')
    });
  });
}