import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProductActions, updateProductActions } from '../../../../redux/actions';

const AddProductModal = ({ showModal, handleClose, ProductData }) => {

    const { type } = ProductData;
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [threshold, setThreshold] = useState(100);

    const closeModal = () => {
        reset();
        handleClose()
    }

    useEffect(() => {

        if (ProductData?.data) {

            setValue('name', ProductData.data?.name)
            setValue('model', ProductData.data?.modelData?.name)
            setValue('code', ProductData.data?.code)
            setValue('description', ProductData.data?.description)

            setThreshold(Number(ProductData?.data?.lowestStock));

        }
    }, [ProductData]);

    const onSubmit = (data) => {
        const payload = {
            name: data?.name,
            modelName: data?.model,
            code: data?.code,
            description: data?.description,
            lowestStock: threshold,
        };
        if (ProductData?.data?._id) {
            const updatedData = {
                ...payload,
                productId: ProductData?.data?._id,
            };
            dispatch(updateProductActions(updatedData));
        } else {
        dispatch(createProductActions(payload));
        }
        console.log(payload, 'payload')
        closeModal();
    };

    return (
        <div>
            <Modal show={showModal} centered size='lg' onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-black'>{type} Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Your form or content here */}
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Product Name"
                                        name="Product Name"
                                        {...register("name", { required: true })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Model"
                                        name="Model"
                                        {...register("model", { required: true })}
                                        required
                                    />
                                </Form.Group>

                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Code"
                                        name="Code"
                                        {...register("code", { required: true })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-0'>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Description"
                                        name="Description"
                                        {...register("description", { required: true })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-1">
                                    <Form.Label className='mb-5'>Low Stock Threshold</Form.Label>
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