const memoryState = (store) => store.memory;

export const selectAppsInstances = (store) => memoryState(store).appsInstances;

export const selectProgramsData = (store) => memoryState(store).programsData;
