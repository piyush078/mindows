const memoryState = store => store.memory;

export const selectAppsInstances = store => {
  return memoryState(store).appsInstances;
}

export const selectProgramsData = store => {
  return memoryState(store).programsData;
};