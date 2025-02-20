import { useEffect } from "react";

const KeepServerAwake = () => {
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 

    const pingServer = async () => {
      try {
        await fetch(`${backendUrl}/ping`);
        console.log("Ping sent to keep server awake");
      } catch (error) {
        console.error("Error pinging server:", error);
      }
    };

  
    pingServer();
    const interval = setInterval(pingServer, 200000);

    return () => clearInterval(interval); 
  }, []);

  return null; 
};

export default KeepServerAwake;
