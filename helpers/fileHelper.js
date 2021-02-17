import fs from 'fs';
import {reject} from "ramda";

export const getFile = (url) => {
  return new Promise((resolve) => {
    fs.readFile(url, {encoding: 'utf-8'}, (err, data) => {
      resolve(err ? [] : JSON.parse(data))
    });
  });
}

export const setFile = (url, data) => {
  return new Promise((resolve) => {
    fs.writeFile(url, JSON.stringify(data), (err) => {
      if (err) {
        reject(err)
        throw err;
      }
      resolve('file was saved successful')
    });
  });
}