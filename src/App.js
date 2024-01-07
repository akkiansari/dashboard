
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import UsersList from './components/UsersList';
import UserDetails from './pages/UserDetails';
import { getUsers } from './services/userService.mjs';

const App = () => {
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

  const handleAddUser = (newUser) => {
    
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <Router>
    
      <Navbar  bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <h1 >User Dashboard</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
       
        <Routes>
          <Route
            path="/"
            element={<UsersList users={users} onAddUser={handleAddUser} />}
          />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
