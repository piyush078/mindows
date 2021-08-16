export const loadProgram = (program, metadata = {}) => {
  const title = metadata.title || program.config?.initTitle || program.name;
  const uniqueId = new Date().getTime().toString() + Math.floor(Math.random() * 100).toString();

  return { pId: uniqueId, ...metadata, title, ...program };
};

export const updateProgramsData = (data, newProgram) => {
  const newData = { ...data };
  newData[newProgram.pId] = newProgram;
  return newData;
};

export const updateAppsInstances = (data, newProgram) => {
  const newInstances = { ...data };
  const key = newProgram.id;
  if (!(key in data)) newInstances[key] = [];
  newInstances[key] = [...newInstances[key], newProgram.pId];
  return newInstances;
};

export const removeProgram = (data, pId) => {
  const newData = { ...data };
  delete newData[pId];
  return newData;
};

export const removeAppInstance = (data, id, pId) => {
  const newData = {};
  newData[id] = data[id].filter((instanceId) => instanceId !== pId);
  return Object.assign(data, newData);
};
