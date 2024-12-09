import { addDoc, collection, getDocs, query, orderBy, updateDoc } from "firebase/firestore";
import { getAllFromIndexedDB, deleteFromIndexedDB } from "../utils/indexedDb";
import { db } from "../../config/firebase";
import { deleteField } from "firebase/firestore";  // Import deleteField from firebase/firestore

let isSyncing = false; // Flag to prevent concurrent syncs

export const syncOfflineDataToFirestore = async () => {
  if (isSyncing) {
    console.log("Sync already in progress. Skipping duplicate sync.");
    return;
  }

  isSyncing = true; // Set the syncing flag

  try {
    const offlineData = await getAllFromIndexedDB("fundCollectionData");
    if (!offlineData || offlineData.length === 0) {
      console.log("No offline data found to sync.");
      return;
    }

    const fundCollection = collection(db, "fundCollectionData");
    const fundQuery = query(fundCollection, orderBy("siNo", "desc"));
    const querySnapshot = await getDocs(fundQuery);
    const highestSiNo = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[0].data().siNo 
      : 0;

    let currentSiNo = highestSiNo;

    for (const item of offlineData) {
      try {
        // Ensure siNo is set
        if (!item.siNo) {
          currentSiNo += 1;
          item.siNo = currentSiNo;
        }

        // Add the item to Firestore
        const docRef = await addDoc(fundCollection, item);

        // After adding the item, remove the 'id' field from Firestore
        await updateDoc(docRef, {
          id: deleteField() // Use deleteField to delete the 'id' field
        });
        console.log(`Removed 'id' field from Firestore for document: ${docRef.id}`);

        // After adding to Firestore, delete the item from IndexedDB
        await deleteFromIndexedDB("fundCollectionData", item.id); // Ensure item.id exists before calling this
        console.log(`Synced and removed item from IndexedDB: ${item.id}`);
      } catch (innerError) {
        console.error("Error processing item:", item, innerError);
      }
    }

    console.log("All offline data successfully synced to Firestore.");
  } catch (error) {
    console.error("Error syncing offline data to Firestore:", error);
  } finally {
    isSyncing = false; // Reset the syncing flag
  }
};
