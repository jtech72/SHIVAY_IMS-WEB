import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { createWarehouseActions, getLocationActions, updateWarehouseActions } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

const AddWarehouseModal = ({ showModal, handleClose, warehouseData }) => {
    const { type } = warehouseData;
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

   

    const { location } = useSelector((state) => state?.locationReducer || {});
    const [locationSelected, setLocationSelected] = useState(null)
    const locationData = location?.response || [];

    const closeModal = () => {
        reset();
        handleClose();
        setLocationSelected(null);
    }

    useEffect(() => {
        dispatch(getLocationActions());
    }, [dispatch]);

    useEffect(() => {
        if (warehouseData.data && locationData) {
            const selectedLocation = locationData.find(
                (loc) => loc._id === warehouseData.data?.locationId?._id
            );

            setValue('warehouse', warehouseData.data?.name)
            setValue('address', warehouseData.data?.address)

            if (selectedLocation) {
                setLocationSelected({
                    label: selectedLocation.name,
                    value: selectedLocation._id,
                });
            }
        }
    }, [warehouseData, locationData]);

    const onSubmit = (data) => {
        const payload = {
            name: data?.warehouse,
            address: data?.address,
            locationId: locationSelected?.value,
        };

        if (warehouseData?.data?._id) {
            const updatedData = {
                ...payload,
                warehouseId: warehouseData?.data?._id,
            };
            dispatch(updateWarehouseActions(updatedData));
        } else {
            dispatch(createWarehouseActions(payload));
        }

        closeModal();
    };

    return (
<Modal show={showModal} centered size='lg' onHide={closeModal} backdrop="static" keyboard={false}>
<Modal.Header closeButton>
                <Modal.Title className='text-black'>{type} Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-1">
                                <Form.Label className='mb-0'>Warehouse <span className='text-danger'>*</span></Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Warehouse"
                                    {...register('warehouse', {
                                        required: 'Warehouse is required',
                                        validate: value => value.trim() !== '' || 'Warehouse cannot be empty spaces'
                                    })}
                                />
                                {errors.warehouse && <small className="text-danger">{errors.warehouse.message}</small>}

                            </Form.Group>
                        </Col>

                        <Col sm={6}>
                            <Form.Group className="mb-1">
                                <Form.Label className="mb-0">Location</Form.Label>
                                <Select
                                    options={locationData?.map((loc) => ({
                                        label: loc.name,
                                        value: loc._id,
                                    }))}
                                    placeholder="Select Location"
                                    onChange={(selectedOption) => {
                                        setLocationSelected(selectedOption);
                                        setValue('location', selectedOption?.value);
                                    }}
                                    value={locationSelected}
                                    isSearchable
                                // isMulti
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
                                    {...register('address', { required: true })}
                                />
                                {errors.address && <small className="text-danger">Address is required</small>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Modal.Footer>
                        <Button className='cancel-button' onClick={closeModal}>
                            Close
                        </Button>
                        <Button className='custom-button' type='submit'>
                            {type === 'Add' ? 'Save' : 'Update'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddWarehouseModal;
