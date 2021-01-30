export const setCurrentDate = (arr) => {
  return arr.map((item) => {
    return {...item, dateOfReceiving: (new Date()).toDateString()}
  })
}