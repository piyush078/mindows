const writeInIDB = (document) => (db, STORENAME) =>
  new Promise((resolve, reject) => {
    if (!document.id) {
      reject(new Error('No unique key provided to store the document'));
    }

    const transaction = db.transaction(STORENAME, 'readwrite');
    const store = transaction.objectStore(STORENAME);
    const query = store.put(document, document.id);

    query.onsuccess = () => resolve(query.result);
    query.onerror = () => reject(query.error);
  });

export default writeInIDB;
