import { addDoc, collection, getDocs, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { deleteFromIndexedDB, getAllFromIndexedDB } from "../utils/indexedData";

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
            if (item.id) {
                // Existing item: update
                await updateDoc(doc(db, "fundCollectionData", item.id), item);
                console.log(`Document with id: ${item.id} updated successfully.`);
            } else {
                // New item: add with new siNo
                currentSiNo++;
                const newData = { ...item, siNo: currentSiNo };
                const docRef = await addDoc(fundCollection, newData);
                console.log(`Document added successfully with new id: ${docRef.id} and siNo: ${currentSiNo}`);
                await updateDoc(doc(db, "fundCollectionData", docRef.id), { id: docRef.id });
            }
            await deleteFromIndexedDB("fundCollectionData", item.id || item.siNo);
        }
    } catch (error) {
        console.error("Error syncing offline data to Firestore:", error);
    } finally {
        isSyncing = false; // Reset the syncing flag
    }
};

