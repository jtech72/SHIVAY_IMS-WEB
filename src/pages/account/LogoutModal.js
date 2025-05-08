import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosLogOut } from "react-icons/io";

const LogoutModal = ({ show, onConfirm, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header className='d-flex justify-content-center pb-0'>
                <Modal.Title className='text-black'>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
               <span className='bg-light p-2 rounded-circle'> <IoIosLogOut className='text-danger fs-2'/></span>
               <p className='mb-0 mt-2'> Are you sure you want to logout?</p>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button className='cancel-button fw-bold' onClick={onCancel}>
                    Cancel
                </Button>
                <Button className='custom-button fw-bold' onClick={onConfirm}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LogoutModal;
