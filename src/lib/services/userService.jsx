import { query, where, getDocs, collection, doc, getDoc } from "firebase/firestore"; // Import additional functions for querying Firestore
import { db } from "../../config/firebase";

// Function to fetch the UID using the username
export const fetchUserUidByUsername = async (username) => {
    try {
        // Query the "users" collection for the document where the username matches
        const q = query(collection(db, "users"), where("username", "==", username)); 
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            throw new Error('Username not found');
        }
        
        // Assuming usernames are unique, return the UID of the first document found
        const userDoc = querySnapshot.docs[0];
        return userDoc.id;  // The document ID is the UID
    } catch (err) {
        console.error('Error fetching UID by username:', err);
        throw new Error(err.message || 'Error fetching user UID');
    }
};

// Function to fetch the email using the UID
export const fetchUserEmailByUid = async (uid) => {
    try {
        const userDocRef = doc(db, "users", uid); // Access the document by UID
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
            throw new Error('User not found');
        }

        return userDoc.data().email; // Return the email stored in Firestore
    } catch (err) {
        console.error('Error fetching user email:', err);
        throw new Error(err.message || 'Error fetching user email');
    }
};
