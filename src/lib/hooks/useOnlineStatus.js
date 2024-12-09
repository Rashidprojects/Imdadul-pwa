import { useState, useEffect } from "react";
import { syncOfflineDataToFirestore } from "../services/syncOfflineData";

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(() => {
    console.log("Initial navigator.onLine:", navigator.onLine);
    return navigator.onLine; // Logs the initial state
  });

  useEffect(() => {
    const handleOnline = async () => {
      console.log("Went Online");
      setIsOnline(true);
      try {
        await syncOfflineDataToFirestore();
        console.log("Offline data synced successfully");
      } catch (err) {
        console.error("Sync error on online:", err);
      }
    };
    const handleOffline = () => {
      console.log("Went Offline");
      setIsOnline(false);
    };


      

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};
