const searchInIDB = (key) => (db, STORENAME) =>
  new Promise((resolve, reject) => {
    if (!key) {
      reject(new Error('No key provided to search the store'));
    }

    const transaction = db.transaction(STORENAME, 'readonly');
    const store = transaction.objectStore(STORENAME);
    const query = store.get(key);

    query.onsuccess = () => resolve(query.result);
    query.onerror = () => reject(query.error);
  });

export default searchInIDB;
