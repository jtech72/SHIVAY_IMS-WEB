import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomerActions, getLocationActions, updateCustomerActions } from '../../../../redux/actions';
import Select from 'react-select';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';

const AddCustomerModal = ({ showModal, handleClose, CustomerData }) => {
    console.log(CustomerData, 'CustomerData')
    const { type } = CustomerData;
    const {
        handleSubmit,
        register,
        setValue,
        control,
        reset,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const [locationSelected, setLocationSelected] = useState(null);
    const [copyChecked, setCopyChecked] = useState(false);
    const { location } = useSelector((state) => state?.locationReducer || {});
    const locationData = location?.response || [];
    const billingAddress = useWatch({ control, name: "billingAddress" });
    const billingGstNumber = useWatch({ control, name: "billingGstNumber" });

    useEffect(() => {
        dispatch(getLocationActions());
    }, [dispatch]);

    const closeModal = () => {
        reset();
        handleClose();
        setLocationSelected(null);
        setCopyChecked(false);
    }

    useEffect(() => {

        if (CustomerData.data) {

            setValue('name', CustomerData.data?.name)
            setValue('email', CustomerData.data?.email)
            setValue('primaryPhoneNumber', CustomerData.data?.primaryPhoneNumber)
            setValue('billingAddress', CustomerData.data?.billingAddress)
            setValue('deliveryAddress', CustomerData.data?.deliveryAddress)
            setValue('billingGstNumber', CustomerData.data?.billingGstNumber)
            setValue('deliveryGstNumber', CustomerData.data?.deliveryGstNumber)
            setValue('address', CustomerData.data?.address)

            setCopyChecked(CustomerData.data?.billingAndDeliveryAddress || false);
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
            billingAddress: data?.billingAddress,
            deliveryAddress: data?.deliveryAddress,
            billingGstNumber: data?.billingGstNumber,
            deliveryGstNumber: data?.deliveryGstNumber,
            billingAndDeliveryAddress: copyChecked,
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
            // console.log(payload, 'payload')
        }
        closeModal();
    };

    useEffect(() => {
        if (copyChecked) {
            setValue("deliveryAddress", billingAddress || "");
            setValue("deliveryGstNumber", billingGstNumber || "");
        } else {
            setValue("deliveryAddress", "");
            setValue("deliveryGstNumber", "");
        }
    }, [copyChecked, billingAddress, billingGstNumber, setValue]);

    return (
        <div>
            <Modal show={showModal} centered size='lg' onHide={handleClose} backdrop="static" keyboard={false}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-black'>{type} Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Your form or content here */}
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className='mb-0'>
                                        Customer Name <span className='text-danger'>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Customer Name"
                                        {...register("name", {
                                            required: "Customer Name is required",
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/, // Only letters and spaces
                                                message: "Only letters are allowed"
                                            }
                                        })}
                                        onKeyPress={(e) => {
                                            if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                                e.preventDefault(); // block non-letter keys
                                            }
                                        }}
                                    />
                                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
                                </Form.Group>


                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className='mb-0'>Email Id  <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email Id"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && <small className="text-danger">{errors.email.message}</small>}
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                            <Form.Group className="mb-2">
    <Form.Label className="mb-0">
        Phone Number <span className="text-danger">*</span>
    </Form.Label>
    <InputGroup>
        <InputGroupText>+91</InputGroupText>
        <Form.Control
            type="text"
            placeholder="Enter 10-digit phone number"
            maxLength={10}
            onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
            }}
            {...register("primaryPhoneNumber", {
                required: "Phone number is required",
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be exactly 10 digits"
                }
            })}
        />
    </InputGroup>
    {errors.primaryPhoneNumber && (
        <small className="text-danger">{errors.primaryPhoneNumber.message}</small>
    )}
</Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-2">
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
                        </Row>
                        <hr className='mb-2 mt-1 text-secondary' />
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className="mb-0">Billing Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Billing Address"
                                        {...register("billingAddress")}
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className="mb-0">GST Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter GST Number"
                                        {...register("billingGstNumber")}
                                    />
                                </Form.Group>
                            </Col>
                            <div className='mb-2'>
                                <Form.Check
                                    type="checkbox"
                                    label="Same as Billing Address"
                                    checked={copyChecked}
                                    onChange={(e) => setCopyChecked(e.target.checked)}
                                />
                            </div>
                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className="mb-0">Delivery Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Delivery Address"
                                        {...register("deliveryAddress")}
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className="mb-0">GST Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter GST Number"
                                        {...register("deliveryGstNumber")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr className='mb-2 mt-1 text-secondary' />
                        <Row>
                            <Col sm={12}>
                                <Form.Group className="mb-2">
                                    <Form.Label className='mb-0'>Full Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Full Address"
                                        name="Full Address"
                                        {...register("address")}
                                    // value={faq.question}
                                    // onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='cancel-button' onClick={closeModal}>
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