import { indexedDB, connectIDB } from './disk.connect';

const dispatchIDB = async ({ DB_NAME, DB_VERSION }, STORENAME, action) =>
  new Promise((resolve, reject) => {
    let db = null;
    try {
      if (!indexedDB) {
        reject(new Error('IndexedDb not supported in the browser'));
      } else if (!DB_NAME || !DB_VERSION || !STORENAME || !action) {
        reject(new Error('Required values not provided. Cannot perform the action.'));
      } else {
        connectIDB(DB_NAME, DB_VERSION, STORENAME)
          .then((connectRes) => {
            db = connectRes;
            action(db, STORENAME)
              .then((data) => resolve(data))
              .catch((error) => reject(error));
          })
          .catch((error) => reject(error));
      }
    } catch (err) {
      reject(err);
    } finally {
      if (db) db.close();
    }
  });

export default dispatchIDB;
