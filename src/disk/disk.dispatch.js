import { checkBrowserSupport, connectIDB } from './disk.connect';

const ifIDBExists = checkBrowserSupport();

const dispatchIDB = async ({ DB_NAME, DB_VERSION }, STORENAME, action) =>
  new Promise((resolve, reject) => {
    let db = null;

    try {
      if (!ifIDBExists) {
        reject('IndexedDb not supported in the browser');
      } else if(!DB_NAME || !DB_VERSION || !STORENAME || !action) {
        reject('Required values not provided. Can\'t perform the action.')
      } else {
        connectIDB(DB_NAME, DB_VERSION, STORENAME)
          .then((db) =>
            action(db, STORENAME)
              .then((data) => resolve(data))
              .catch((error) => reject(error))
          )
          .catch((error) => reject(error));
      }
    } catch (err) {
      reject(err);
    } finally {
      if (db) db.close();
    }
  });

export default dispatchIDB;
