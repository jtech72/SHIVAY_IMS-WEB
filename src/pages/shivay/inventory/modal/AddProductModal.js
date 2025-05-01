import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProductActions, updateProductActions } from '../../../../redux/actions';
import StockIn from '../../stockIn/StockIn';

const AddProductModal = ({ showModal, handleClose, ProductData }) => {

    const { type } = ProductData;
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
        watch,
    } = useForm();

    const [threshold, setThreshold] = useState(100);

    const closeModal = () => {
        reset();
        handleClose();
    };

    useEffect(() => {
        if (ProductData?.data) {
            setValue('name', ProductData.data?.name);
            setValue('model', ProductData.data?.modelData?.name);
            setValue('code', ProductData.data?.code);
            setValue('description', ProductData.data?.description);
            setThreshold(Number(ProductData?.data?.lowestStock));
        }
    }, [ProductData, setValue]);

    const onSubmit = (data) => {
        const payload = {
            name: data?.name,
            modelName: data?.model,
            code: data?.code,
            description: data?.description,
            lowestStock: threshold,
        };

        if (StockIn) {
            const updatedData = {
                ...payload,
                productId: ProductData?.data?._id,
            };
            dispatch(updateProductActions(updatedData));
        } else {
            dispatch(createProductActions(payload));
        }

        console.log(payload, 'payload');
        closeModal();
    };
    const modelValue = watch("model");
    const codeValue = watch("code");

    return (
        <div>
            <Modal show={showModal} centered size='lg' onHide={handleClose} backdrop="static" keyboard={false}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-black'>{type} Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Your form or content here */}
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className="mb-0">
                                        Product Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Product Name"
                                        {...register('name', {
                                            required: 'Product Name is required',
                                            validate: value =>
                                                value?.trim() !== '' || 'Product Name cannot be only spaces',
                                        })}
                                    />
                                    {errors.name && (
                                        <small className="text-danger">{errors.name.message}</small>
                                    )}
                                </Form.Group>

                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className='mb-0'>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Model"
                                        {...register("model", {
                                            validate: (value) => {
                                                if (!value?.trim() && !codeValue?.trim()) {
                                                    return "Either Model or Code is required";
                                                }
                                                return true;
                                            }
                                        })}
                                    />
                                    {errors.model && (
                                        <small className="text-danger">{errors.model.message}</small>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className='mb-0'>Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Code"
                                        {...register("code", {
                                            validate: (value) => {
                                                if (!value?.trim() && !modelValue?.trim()) {
                                                    return "Either Code or Model is required";
                                                }
                                                return true;
                                            }
                                        })}
                                    />
                                    {errors.code && (
                                        <small className="text-danger">{errors.code.message}</small>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-2">
                                    <Form.Label className=''>Low Stock Threshold</Form.Label>
                                    <div className="d-flex justify-content-between">
                                        <span>0</span>
                                        <input
                                            type="range"
                                            className="w-75"
                                            min="0"
                                            max="1000"
                                            step="100"
                                            defaultValue="100"
                                            onChange={(e) => setThreshold(Number(e.target.value))}
                                        />
                                        <span>1000</span>
                                    </div>
                                    {/* Display the current value */}
                                    <div className="text-center mt-2">
                                        <strong>Current Threshold: {threshold}</strong>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col sm={12}>

                                <Form.Group className="">
                                    <Form.Label className='mb-0'>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Enter Description"
                                        name="Description"
                                        {...register("description")}
                                    // required
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

export default AddProductModal