import { setDoc, doc, addDoc, collection, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";
import { saveToIndexedDB, getAllFromIndexedDB } from "../utils/indexedDb";
import { db } from "../../config/firebase";

// Function to add user data to Firestore
export const addUserToFirestore = async (uid, userData) => {
    try {
        // Save the user data under the 'users' collection using the user UID as the document ID
        await setDoc(doc(db, 'users', uid), userData);
        console.log('User data saved successfully');
    } catch (error) {
        console.error('Error saving user data to Firestore:', error);
        throw error;  // Rethrow the error to be handled by the caller
    }
};

export const initializeCounter = async () => {
    try {
        await setDoc(doc(db, "counters", "fundCollectionCounter"), { value: 0 });
        console.log("Counter initialized successfully");
    } catch (error) {
        console.error("Error initializing counter:", error);
    }
};

// Function to save data to IndexedDB
export const saveToIndexedDBData = async (newData) => {
  try {
    await saveToIndexedDB('fundCollectionData', newData);
    console.log('Data successfully saved to IndexedDB:', newData);
  } catch (error) {
    console.error('Error saving to IndexedDB:', error.message);
    throw new Error('Failed to save data to IndexedDB');
  }
};


// Service function to submit data
export const submitFundData = async (data) => {

    try {
      const fundCollection = collection(db, "fundCollectionData");
  
      // Query to fetch the highest siNo
      const fundQuery = query(fundCollection, orderBy("siNo", "desc"));
      const querySnapshot = await getDocs(fundQuery);
  
      // Determine the new siNo
      const highestSiNo = querySnapshot.docs.length > 0 
        ? querySnapshot.docs[0].data().siNo 
        : 0;
      const newSiNo = highestSiNo + 1;

      // Add new document with the calculated siNo
      const newData = { ...data, siNo: newSiNo };

      await addDoc(fundCollection, newData);
      console.log(`Document added successfully with siNo: ${newSiNo}`);
      
      return newData;
    } catch (error) {
      throw new Error("Error adding document: " + error.message);
    }
  };


// Function to fetch data from the fundCollectionData collection
export const fetchFundData = async () => {
    try {
      const fundQuery = query(collection(db, "fundCollectionData"), orderBy("siNo", "asc"));
      const querySnapshot = await getDocs(fundQuery);
  
      const firestoreData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID
        ...doc.data(),
      }));

      console.log('currently firestiore data after remove idb : ', firestoreData);
      
  
      // Check if the app is online or offline
      if (navigator.onLine) {
        // If online, return only the Firestore data
        return firestoreData;
      } else {
        // If offline, merge IndexedDB data with Firestore data
        const indexedDBData = await getAllFromIndexedDB("fundCollectionData");
        return [...indexedDBData, ...firestoreData];
      }
    } catch (error) {
      throw new Error("Error fetching fund data: " + error.message);
    }
  };
  

// Function to update data in the fundCollectionData collection
export const updateFundData = async (id, updatedData) => {
    try {
        await setDoc(doc(db, 'fundCollectionData', id), updatedData);
        console.log("Document updated successfully");
    } catch (error) {
        throw new Error("Error updating document: " + error.message);
    }
};

// Function to delete data from the fundCollectionData collection
export const deleteFundData = async (id) => {
    try {
        await deleteDoc(doc(db, 'fundCollectionData', id));
        console.log("Document deleted successfully");
    } catch (error) {
        throw new Error("Error deleting document: " + error.message);
    }
};

