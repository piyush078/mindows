const checkBrowserSupport = () =>
  window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

export const indexedDB = checkBrowserSupport();

export const connectIDB = (DB_NAME, DB_VERSION, STORENAME) => {
  const onupgradeneeded = (db) => {
    console.log('IndexedDb OnUpgradeNeeded');
    if (!db.objectStoreNames.contains(STORENAME)) {
      db.createObjectStore(STORENAME);
    }
  };

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => onupgradeneeded(request.result);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('IndexedDb Blocked'));
  });
};
