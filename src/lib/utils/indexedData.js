import { openDB } from 'idb';

const DATABASE_NAME = 'MyAppDatabase';
const DATABASE_VERSION = 1;
const FUND_COLLECTION_STORE = 'fundCollectionData';

export const initializeDB = async () => {
  const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FUND_COLLECTION_STORE)) {
        db.createObjectStore(FUND_COLLECTION_STORE, { keyPath: 'id' });
      }
    },
  });
  return db;
};

// Function to save data to IndexedDB
export const saveToIndexedDB = async (storeName, data) => {
  const db = await initializeDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.put(data); // Saves the data with the correct key
  await tx.done;
};

// Function to fetch all data from IndexedDB
export const getAllFromIndexedDB = async (storeName) => {
  const db = await initializeDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const data = await store.getAll();
  await tx.done;
  return data;
};

// Function to delete data from IndexedDB
export const deleteFromIndexedDB = async (storeName, id) => {
  const db = await initializeDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.delete(id); // Deletes the data based on the ID
  console.log("Deleting from IndexedDB: ", id);
  await tx.done;
};
