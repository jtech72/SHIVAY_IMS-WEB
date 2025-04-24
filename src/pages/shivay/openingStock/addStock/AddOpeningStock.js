import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../helpers/PageTitle'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Select from 'react-select';
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import AddProductModal from './AddProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { createStockActions, getWarehouseListActions } from '../../../../redux/actions';
import { useForm } from 'react-hook-form';

const AddOpeningStock = () => {

    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm()
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const store = useSelector((state) => state)
    const today = new Date().toISOString().split('T')[0];

    const Warehouse = store?.getWarehouseListReducer?.searchWarehouse?.response;

    const warehouseOptions = Warehouse?.map((warehouse) => ({
        value: warehouse._id,
        label: warehouse.name,
    }));
    const [openingProducts, setOpeningProducts] = useState([])

    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const handleWarehouseChange = (selectedOption) => {
        setSelectedWarehouse(selectedOption);
    };

    useEffect(() => {
        dispatch(getWarehouseListActions());
    }, [dispatch]);

    const onSubmit = (data) => {
        const cleanedProducts = openingProducts.map(({ product, ...rest }) => rest);

        const payload = {
            warehouseId: selectedWarehouse?.value,
            productStock: cleanedProducts,
            description: data?.description,
            date: data?.date
        };
        dispatch(createStockActions(payload));
        // console.log(payload, 'payload');
    };

    const handleDeleteProduct = (indexToRemove) => {
        const updatedProducts = openingProducts.filter((_, index) => index !== indexToRemove);
        setOpeningProducts(updatedProducts);
    };

    return (
        <div>
            <PageTitle
                breadCrumbItems={[
                    { label: "SHIVAY Opening Stock List", path: "/shivay/openingStock" },
                    { label: "Add Opening Stock ", path: "/shivay/openingStock", active: true },
                ]}
                title={"Add Opening Stock"}
            />

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={3}>
                        <Form.Group className="mb-1">
                            <Form.Label className='mb-0'>Warehouse</Form.Label>
                            <Select
                                value={selectedWarehouse}
                                onChange={handleWarehouseChange}
                                options={warehouseOptions}
                                placeholder="Select a warehouse"
                                isClearable
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group className="mb-1">
                            <Form.Label className='mb-0'>Date Range</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={today}
                                {...register('date', { required: true })}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group className="mb-1">
                            <Form.Label className='mb-0'>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={1}
                                {...register('description', { required: true })}
                                placeholder='Enter Description'
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3} className='text-end mt-1'>
                        {/* <Button className="mt-2 fw-bold cancel-button me-2"
                            onClick={handleBack}
                        >
                            Back
                        </Button> */}
                        <Button className="mt-2 fw-bold custom-button"
                            onClick={handleShow}
                        >
                            <IoIosAdd className="fs-3" />&nbsp;Product
                        </Button>
                    </Col>
                </Row>

                <div className='mt-2'>
                    <Card
                        style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}
                    >
                        <Card.Body className="text-center py-1">
                            <table className="table table-striped bg-white">
                                <thead>
                                    <tr className="table_header">
                                        <th scope="col"><i className="mdi mdi-merge"></i></th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {openingProducts && openingProducts.length > 0 ? (
                                        openingProducts.map((data, index) => (
                                            <tr key={index} className="text-dark fw-bold text-nowrap highlight-row">
                                                <th scope="row">{index + 1}</th>
                                                <td className="text-uppercase fw-bold">
                                                    {data?.product?.name || <span className="text-danger">N/A</span>}
                                                </td>
                                                <td className="fw-bold">
                                                    {data?.product?.code || <span className="text-danger">N/A</span>}
                                                </td>
                                                <td className="fw-bold">
                                                    {data?.quantity || <span className="text-danger">N/A</span>}
                                                </td>

                                                <div className="icon-container d-flex pb-0">
                                                    <span className="icon-wrapper" title="Edit">
                                                        <AiOutlineEdit className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                                    </span>
                                                    <span className="icon-wrapper" title="Delete" onClick={() => handleDeleteProduct(index)}>
                                                        <RiDeleteBinLine className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                                    </span>
                                                </div>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted py-3">
                                                No products added yet. Please add products to add opening stock.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </Card.Body>
                    </Card>
                    <div className="text-end">
                        <Button
                            className="fw-bold cancel-button me-2"
                        >
                            Cancel
                        </Button>
                        <Button className="fw-bold custom-button" type='submit'>Submit</Button>
                    </div>
                </div>
            </Form>

            <AddProductModal openingProducts={openingProducts} setOpeningProducts={setOpeningProducts} showModal={showModal} handleClose={handleClose} />

        </div>
    )
}

export default AddOpeningStock