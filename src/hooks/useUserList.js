// custom hook 
import { useState, useEffect } from 'react';
import { getUsers } from '../services/userService.mjs';

const useUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  return users;
};

export default useUserList;
