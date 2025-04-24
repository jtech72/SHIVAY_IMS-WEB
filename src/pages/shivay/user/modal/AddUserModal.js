import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { createUsersActions, getLocationActions, getWarehouseActions, updateUsersActions } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const AddUserModal = ({ showModal, handleClose, UserData }) => {
    
    const { type } = UserData;
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [selectedWarehouse, setSelectedWarehouse] = useState([]);
    const [locationSelected, setLocationSelected] = useState(null);
    // console.log(selectedWarehouse, 'selectedWarehouseselectedWarehouse')
    const { location } = useSelector((state) => state?.locationReducer || {});
    const locationData = location?.response || [];
    const WarehouseData = useSelector((state) => state?.getWarehouseReducer?.warehouseList?.response || []);

    useEffect(() => {
        dispatch(getLocationActions());
        dispatch(getWarehouseActions({
            limit: '',
            page: '',
            search: '',
            stockFilter: true,
        }));
    }, [dispatch]);

    const closeModal = () => {
        reset();
        handleClose()
    }

    useEffect(() => {

        if (UserData.data) {
            const updateWarehouses = UserData?.data?.warehouseData?.map((data) => (
                {
                    value: data?._id, label: data?.name
                }
            ))
            setSelectedWarehouse(updateWarehouses)

            setValue('name', UserData.data?.name)
            setValue('email', UserData.data?.email)
            setValue('password', UserData.data?.password)
            setValue('phoneNumber', UserData.data?.phoneNumber)
            setValue('address', UserData.data?.address)

            setLocationSelected({
                label: UserData?.data?.location,
                value: UserData?.data?.location,
            });
        }
    }, [UserData]);

    const onSubmit = (data) => {
        const payload = {
            name: data?.name,
            email: data?.email,
            password: data?.password,
            phoneNumber: data?.phoneNumber,
            address: data?.address,
            location: locationSelected?.value,
            warehouseIds: selectedWarehouse?.map((item) => item.value),
        };
        if (UserData?.data?._id) {
            const updatedData = {
                ...payload,
                userId: UserData?.data?._id,
            };
            dispatch(updateUsersActions(updatedData));
        } else {
            dispatch(createUsersActions(payload));
        }
        // console.log(payload,'payload')
        closeModal();
    };

    return (
        <Modal show={showModal} centered size='lg' onHide={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-black'>{type} User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-1">
                                <Form.Label className="mb-0">Warehouse</Form.Label>
                                <Select
                                    value={selectedWarehouse}
                                    onChange={(selectedOption) => setSelectedWarehouse(selectedOption)}
                                    options={WarehouseData?.map((data) => ({
                                        label: data.name,
                                        value: data._id,
                                    }))}
                                    placeholder="Select a warehouse"
                                    isClearable
                                    isMulti
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-1">
                                <Form.Label className='mb-0'>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter User Name"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <small className="text-danger">User Name is required</small>}
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-1">
                                <Form.Label className='mb-0'>Email Id</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email Id"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <small className="text-danger">Email is required</small>}
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-1">
                                <Form.Label className='mb-0'>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <small className="text-danger">Password is required</small>}
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-1">
                                <Form.Label className='mb-0'>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Phone"
                                    {...register("phoneNumber", { required: true })}
                                />
                                {errors.phoneNumber && <small className="text-danger">Phone is required</small>}
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
                                    {...register("address", { required: true })}
                                />
                                {errors.address && <small className="text-danger">Address is required</small>}
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
    );
};

export default AddUserModal;
