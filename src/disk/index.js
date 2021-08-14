import dispatchIDB from './disk.dispatch';
import writeInIDB from './disk.write';
import searchInIDB from './disk.read';
import deleteFromIDB from './disk.delete';

export const updateDocument = (STORENAME, data, callback) => (DISK) => {
  dispatchIDB(DISK, STORENAME, writeInIDB(data))
    .then((data) => callback({ data: data }))
    .catch((err) => callback({ error: err }));
};

export const getDocument = (STORENAME, key, callback) => (DISK) => {
  dispatchIDB(DISK, STORENAME, searchInIDB(key))
    .then((data) => callback({ data: data }))
    .catch((err) => callback({ error: err }));
};

export const deleteDocument = (STORENAME, key, callback) => (DISK) => {
  dispatchIDB(DISK, STORENAME, deleteFromIDB(key))
    .then((data) => callback({ data: data }))
    .catch((err) => callback({ error: err }));
};

export const initDisk = (DB_NAME, DB_VERSION) => ({
  DB_NAME: DB_NAME,
  DB_VERSION: DB_VERSION
});