import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomerActions, getLocationActions, updateCustomerActions } from '../../../../redux/actions';
import Select from 'react-select';

const AddCustomerModal = ({ showModal, handleClose, CustomerData }) => {
    console.log(CustomerData, 'CustomerData')
    const { type } = CustomerData;
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const [locationSelected, setLocationSelected] = useState(null);
    const { location } = useSelector((state) => state?.locationReducer || {});
    const locationData = location?.response || [];

    useEffect(() => {
        dispatch(getLocationActions());
    }, [dispatch]);

    const closeModal = () => {
        reset();
        handleClose()
    }

    useEffect(() => {

        if (CustomerData.data) {

            setValue('name', CustomerData.data?.name)
            setValue('email', CustomerData.data?.email)
            setValue('primaryPhoneNumber', CustomerData.data?.primaryPhoneNumber)
            setValue('secondaryPhoneNumber', CustomerData.data?.secondaryPhoneNumber)
            setValue('address', CustomerData.data?.address)

            setLocationSelected({
                label: CustomerData?.data?.location,
                value: CustomerData?.data?.location,
            });
        }
    }, [CustomerData]);

    const onSubmit = (data) => {
        const payload = {
            name: data?.name,
            email: data?.email,
            primaryPhoneNumber: data?.primaryPhoneNumber,
            secondaryPhoneNumber: data?.secondaryPhoneNumber,
            address: data?.address,
            location: locationSelected?.value,
        };
        if (CustomerData?.data?._id) {
            const updatedData = {
                ...payload,
                customerId: CustomerData?.data?._id,
            };
            dispatch(updateCustomerActions(updatedData));
        } else {
            dispatch(createCustomerActions(payload));
        }
        closeModal();
    };

    return (
        <div>
            <Modal show={showModal} centered size='lg' onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-black'>{type} Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Your form or content here */}
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Customer Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Customer Name"
                                        name="Customer Name"
                                        {...register("name", { required: true })}
                                        // value={faq.question}
                                        // onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Email Id</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Email Id"
                                        name="Email Id"
                                        {...register("email", { required: true })}
                                        // value={faq.question}
                                        // onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Phone 1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Phone"
                                        name="Phone"
                                        {...register("primaryPhoneNumber", { required: true })}
                                        // value={faq.question}
                                        // onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Phone 2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Phone"
                                        name="Phone"
                                        {...register("secondaryPhoneNumber", { required: true })}
                                        // value={faq.question}
                                        // onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className="mb-0">Location</Form.Label>
                                    <Select
                                        options={locationData?.map((loc) => ({
                                            label: loc.name,
                                            value: loc.name,
                                        }))}
                                        placeholder="Select Location"
                                        onChange={(selectedOption) => {
                                            console.log(selectedOption, 'gfxdcghbjk')
                                            setLocationSelected(selectedOption);
                                            setValue('location', selectedOption?.value);
                                        }}
                                        value={locationSelected}
                                        isSearchable
                                    />
                                    {errors.location && <small className="text-danger">Location is required</small>}
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Full Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Full Address"
                                        name="Full Address"
                                        {...register("address", { required: true })}
                                        // value={faq.question}
                                        // onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='cancel-button' onClick={handleClose}>
                            Close
                        </Button>
                        <Button className='custom-button' type='submit' >
                            {type === 'Add' ? 'Save' : 'Update'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default AddCustomerModal