export const loadProgram = (program) => {
  const uniqueId = (new Date()).getTime().toString() + (
    Math.floor(Math.random() * 100)).toString();
  return { pId: uniqueId, ...program };
};

export const updateProgramsData = (data, newProgram) => {
  let newData = { ...data };
  newData[newProgram.pId] = newProgram;
  return newData;
};

export const updateAppsInstances = (data, newProgram) => {
  let newInstances = { ...data };
  const key = newProgram.id;
  if(!(key in data)) newInstances[key] = [];
  newInstances[key] = [...newInstances[key], newProgram.pId];
  return newInstances;
};