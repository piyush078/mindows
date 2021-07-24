const bootState = state => state.boot;

export const selectBootBackgrounds = store => {
  return bootState(store).backgrounds;
};
