
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/userService.mjs';
import { Spinner } from 'react-bootstrap';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (id.startsWith('temp-id-')) {
          // For locally added users -- adding extra fields if required 
          setUser({
            id,
            name: newUserName,
            email: '', 
            address: {
              city: '',
              street: '',
            },
          });
        } else {
          // For users fetched from the API
          const userData = await getUserById(id);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id, newUserName]);

  if (!user) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }}>
     
    </Spinner>
  </div>;
  }

  return (
    <div>
      <h2 className="mb-4">User Details for User ID: {id}</h2>

      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{user.name}</h4>
          <br />
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="card-text">
            <strong>Address:</strong> {user.address?.city}, {user.address?.street}
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
