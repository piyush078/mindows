const generateRandomId = (len) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  return [...Array(len)]
    .map(() => characters[Math.floor(Math.random() * characters.length)])
    .join('');
};

const Directory = (name, modifiedTime, createdTime) => ({
  id: generateRandomId(5),
  name,
  modifiedTime: modifiedTime || new Date().getTime(),
  createdTime: createdTime || new Date().getTime(),
  isDir: true,
});

const File = (name, modifiedTime, createdTime) => ({
  id: generateRandomId(5),
  name: name.indexOf('.') !== -1 ? name.substr(0, name.lastIndexOf('.')) : name,
  extension: name.indexOf('.') !== -1 ? name.substring(name.lastIndexOf('.') + 1) : '',
  modifiedTime: modifiedTime || new Date().getTime(),
  createdTime: createdTime || new Date().getTime(),
  isDir: false,
});

const Node = (name, isDir, parent, children = [], mTime = null, id = null) => {
  const time = mTime || new Date().getTime();
  const node = isDir ? Directory(name, time, time) : File(name, time, time);
  node.id = id || node.id;
  return {
    node,
    parent,
    children: [...children],
  };
};

export default Node;
