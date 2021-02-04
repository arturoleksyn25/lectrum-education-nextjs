export const setCurrentDate = (arr) => {
  if (!arr) {
    return [];
  }
  return arr.map((item) => {
    return {...item, dateOfReceiving: (new Date()).toDateString()}
  })
}