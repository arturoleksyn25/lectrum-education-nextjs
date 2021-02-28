import fs from 'fs';
const path = require('path');
import {reject} from "ramda";

export const getFile = (url) => {
  return new Promise((resolve) => {
    fs.readFile(path.resolve(url), {encoding: 'utf-8'}, (err, data) => {
      resolve(err ? [] : JSON.parse(data))
    });
  });
}

export const setFile = (url, data) => {
  return new Promise((resolve) => {
    fs.writeFile(path.resolve(url), JSON.stringify(data), (err) => {
      if (err) {
        reject(err)
        throw err;
      }
      resolve('file was saved successful')
    });
  });
}