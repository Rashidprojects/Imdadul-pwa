import { useState } from "react";
import { registerWithEmailAndPassword } from "../services/authService";
import { addUserToFirestore } from "../services/firestoreService";

export const useRegister = (username, email, password) => {
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");
      
      // Register the user with email and password
      const user = await registerWithEmailAndPassword(email, password);

      // Store additional user data (username and email) in Firestore
      await addUserToFirestore(user.uid, { username, email });

      console.log("User registered successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, handleRegister };
};
