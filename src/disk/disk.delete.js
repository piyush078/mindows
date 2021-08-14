const deleteFromIDB = (key) => (db, STORENAME) =>
  new Promise((resolve, reject) => {
    if (!key) {
      reject('No key provided to delete from the store');
    }

    const transaction = db.transaction(STORENAME, 'readwrite');
    const store = transaction.objectStore(STORENAME);
    const query = store.delete(key);

    query.onsuccess = () => resolve(query.result);
    query.onerror = () => reject(query.error);
  });

export default deleteFromIDB;
