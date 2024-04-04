import React, { useState, useEffect } from "react"; 
import {getUsersRank } from "../utils/api";
function SharedLayout(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const data = await getUsersRank();
          setUsers(data); // Accédez directement à response.data
          // console.log(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }, []);
}

export default SharedLayout;