export const serverDispatch = async (store, execute) => {
  const { dispatch } = store;

  execute(dispatch);
};
