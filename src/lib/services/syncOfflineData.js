import { addDoc, collection, getDocs, query, orderBy, updateDoc, doc, deleteField } from "firebase/firestore";
import { db } from "../../config/firebase";
import { deleteFromIndexedDB, getAllFromIndexedDB } from "../utils/indexedData";

let isSyncing = false; // Flag to prevent concurrent syncs

export const syncOfflineDataToFirestore = async () => {
    if (isSyncing) {
        return;
    }

    isSyncing = true; // Set the syncing flag   

    try {
        const offlineData = await getAllFromIndexedDB("fundCollectionData");
        if (!offlineData || offlineData.length === 0) {
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

        if (item.id) {
          await updateDoc(doc(db, "fundCollectionData", item.id), item);
        } else {
          currentSiNo += 1;
          item.siNo = currentSiNo;

          const docRef = await addDoc(fundCollection, item);

          await updateDoc(docRef, {
            id: deleteField() // Use deleteField to delete the 'id' field
          });
        }

        // After adding to Firestore, delete the item from IndexedDB
        await deleteFromIndexedDB("fundCollectionData", item.id || item.siNo); // Ensure item.id exists before calling this
        console.log(`Synced and removed item from IndexedDB: ${item.id}`);
      } catch (innerError) {
        console.error("Error processing item:", item, innerError);
      }
    }

    } catch (error) {
        console.error("Error syncing offline data to Firestore:", error);
    } finally {
        isSyncing = false; // Reset the syncing flag
    }
};

