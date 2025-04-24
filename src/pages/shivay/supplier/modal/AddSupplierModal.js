import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSupplierActions, getLocationActions, updateSupplierActions } from '../../../../redux/actions';

const AddSupplierModal = ({ showModal, handleClose, SupplierData }) => {

    const { type } = SupplierData;
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
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

        if (SupplierData.data) {

            setValue('name', SupplierData.data?.name)
            setValue('email', SupplierData.data?.email)
            setValue('phoneNumber', SupplierData.data?.phoneNumber)
            setValue('address', SupplierData.data?.address)

            setLocationSelected({
                label: SupplierData?.data?.location,
                value: SupplierData?.data?.location,
            });
        }
    }, [SupplierData]);

    const onSubmit = (data) => {
        const payload = {
            name: data?.name,
            email: data?.email,
            phoneNumber: data?.phoneNumber,
            address: data?.address,
            location: locationSelected?.value,
        };
        if (SupplierData?.data?._id) {
            const updatedData = {
                ...payload,
                supplierId: SupplierData?.data?._id,
            };
            dispatch(updateSupplierActions(updatedData));
        } else {
            dispatch(createSupplierActions(payload));
        }
        console.log(payload, 'payload')
        closeModal();
    };

    return (
        <div>
            <Modal show={showModal} centered size='lg' onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-black'>{type} Supplier</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Your form or content here */}
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Supplier Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Customer Name"
                                        name="Customer Name"
                                        {...register("name", { required: true })}
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
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Phone </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Phone"
                                        name="Phone"
                                        {...register("phoneNumber", { required: true })}
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
                            <Col sm={12}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Full Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Full Address"
                                        name="Full Address"
                                        {...register("address", { required: true })}
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
                        <Button className='custom-button' type='submit'>
                            {type === 'Add' ? 'Save' : 'Update'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default AddSupplierModal