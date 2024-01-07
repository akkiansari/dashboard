
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import './user.css';

const UsersList = ({ users, onAddUser }) => {
    const [showModal, setShowModal] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserAddress, setNewUserAddress] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleAddUser = () => {
        if (!newUserName || !newUserEmail || !newUserAddress) {
            setValidationError('All fields are required');
            return;
        }
        setValidationError('');
        const newUser = {
            id: Math.random(),
            name: newUserName,
            email: newUserEmail,
            address: {
                city: newUserAddress,
                street: '',
            },
        };
        onAddUser(newUser);

        // to Reset the form fields and hide the modal
        setNewUserName('');
        setNewUserEmail('');
        setNewUserAddress('');
        setShowModal(false);
    };

    return (
        <div data-testid="users-list">
            <h4>User List</h4>
            <ul className="list-group">
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id} className="list-group-item">
                            <Link to={`/user/${user.id}`} className="user-link">
                                {user.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No users found.</li>
                )}
            </ul>

            {/* Add new user section */}
            <div>
                <br />
                <h3>Add New User</h3>
                <Button className='btn btn-success' variant="primary" onClick={() => setShowModal(true)}>
                    Add User
                </Button>

                {/* New User Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Display validation error message */}
                        {validationError && <Alert variant="danger">{validationError}</Alert>}

                        <Form>
                            <Form.Group controlId="formUserName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={newUserName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUserEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={newUserEmail}
                                    onChange={(e) => setNewUserEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUserAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter address"
                                    value={newUserAddress}
                                    onChange={(e) => setNewUserAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddUser}>
                            Add User
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
};

export default UsersList;
