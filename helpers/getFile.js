import fs from 'fs';

export const getFile = (url) => {
  return new Promise((resolve) => {
    fs.readFile(url, {encoding: 'utf-8'}, (err, data) => {
      resolve(err ? [] : JSON.parse(data))
    });
  });
}