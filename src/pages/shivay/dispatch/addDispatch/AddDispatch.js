import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../helpers/PageTitle'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Select from 'react-select'; // Import React Select
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import AddProductModal from '../../openingStock/addStock/AddProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { createDispatchActions, getWarehouseListActions, listingCustomerActions, listingUsersActions } from '../../../../redux/actions';
import { useForm } from 'react-hook-form';

const AddDispatch = () => {

    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm()
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const store = useSelector((state) => state)
    const today = new Date().toISOString().split('T')[0];
    const [openingProducts, setOpeningProducts] = useState([])
    console.log(openingProducts, 'openingProducts')

    const Warehouse = store?.getWarehouseListReducer?.searchWarehouse?.response;
    const UsersList = store?.listingUsersReducer?.listingUsers?.response;
    const CustomerList = store?.listingCustomerReducer?.listingCustomer?.response;

    const warehouseOptions = Warehouse?.map((warehouse) => ({
        value: warehouse._id,
        label: warehouse.name,
    }));

    const usersOptions = UsersList?.map((users) => ({
        value: users._id,
        label: users.name,
    }));

    const customerOptions = CustomerList?.map((customer) => ({
        value: customer._id,
        label: customer.name,
    }));

    // State to handle selected warehouse
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const handleAccordionToggle = () => {
        setIsAccordionOpen(prevState => !prevState);
    };
    const handleWarehouseChange = (selectedOption) => {
        setSelectedWarehouse(selectedOption);
    };

    const handleUserChange = (selectedUser) => {
        setSelectedUser(selectedUser);
    };

    const handleCustomerChange = (selectedCustomer) => {
        setSelectedCustomer(selectedCustomer);
    };

    useEffect(() => {
        dispatch(getWarehouseListActions());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listingUsersActions());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listingCustomerActions());
    }, [dispatch]);

    const onSubmit = (data) => {

        const cleanedProducts = openingProducts.map(({ product, ...rest }) => rest);

        const formData = new FormData();
        if (data?.attachmentGRfile?.[0] instanceof File) {
            formData.append('attachmentGRfile', data.attachmentGRfile[0]);
        }

        formData.append('warehouseId', selectedWarehouse?.value)
        formData.append('dispatchBy', selectedUser?.value);
        formData.append('customerId', selectedCustomer?.value);
        formData.append('productDispatchQty', JSON.stringify(cleanedProducts));
        formData.append('description', data?.description);
        formData.append('date', data?.date);
        formData.append('grNumber', data?.grNumber);

        dispatch(createDispatchActions(formData));
        console.log(formData, 'formData');
    };

    return (
        <div>
            <PageTitle
                breadCrumbItems={[
                    { label: "SHIVAY Dispatch List", path: "/shivay/dispatch" },
                    { label: "Add Dispatch ", path: "/shivay/dispatch", active: true },
                ]}
                title={"Add Dispatch"}
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="accordion mb-3" id="accordionExample">
                    <div className="accordion-item" style={{ border: '2px solid #6655D9' }}>
                        <h2 className="accordion-header mt-0">
                            <button
                                className="accordion-button py-1 d-flex justify-content-between align-items-center w-100"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded={isAccordionOpen ? "true" : "false"}
                                aria-controls="collapseOne"
                                onClick={handleAccordionToggle}
                            >
                                <div className="flex-grow-1 text-black fw-bold"> Add Dispatch Details</div>

                                <div className="d-flex">
                                    <Button
                                        className="fw-bold custom-button me-2"
                                        onClick={handleShow}
                                        disabled={!isAccordionOpen}
                                    >
                                        <IoIosAdd className="fs-3" />&nbsp;Product
                                    </Button>
                                </div>
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className={`accordion-collapse collapse ${isAccordionOpen ? "show" : ""}`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body py-1">
                                <Form>
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
                                                <Form.Label className="mb-0">Customer</Form.Label>
                                                <Select
                                                    value={selectedCustomer}
                                                    onChange={handleCustomerChange}
                                                    options={customerOptions}
                                                    placeholder="Select a Customer"
                                                    isClearable
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Group className="mb-1">
                                                <Form.Label className="mb-0">Dispatch By</Form.Label>
                                                <Select
                                                    value={selectedUser}
                                                    onChange={handleUserChange}
                                                    options={usersOptions}
                                                    placeholder="Select a User"
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
                                                <Form.Label className="mb-0">GR Number</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Invoice Number"
                                                    {...register('grNumber', { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Group className="mb-1">
                                                <Form.Label className="mb-0">Attach GR File</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    placeholder="Upload file"
                                                    required
                                                    {...register('attachmentGRfile', { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mb-1">
                                                <Form.Label className="mb-0">Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={1}
                                                    placeholder="Enter Description"
                                                    {...register('description', { required: true })}
                                                />
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

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
                                        <th scope="col">Modal</th>
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
                                                    {data?.product?.modelId?.name || <span className="text-danger">N/A</span>}
                                                </td>
                                                <td className="fw-bold">
                                                    {data?.product?.code || <span className="text-danger">N/A</span>}
                                                </td>
                                                <td className="fw-bold">
                                                    {data?.quantity || <span className="text-danger">N/A</span>}
                                                </td>
                                                <td></td>
                                                {/* <td></td> */}
                                                <div className="icon-container d-flex pb-0">
                                                    <span className="icon-wrapper" title="Edit">
                                                        <AiOutlineEdit className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                                    </span>
                                                    <span className="icon-wrapper" title="Delete">
                                                        <RiDeleteBinLine className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                                    </span>
                                                </div>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted py-3">
                                                No products added yet. Please add products to add dispatch.
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

            <AddProductModal selectedWarehouse={selectedWarehouse} openingProducts={openingProducts} setOpeningProducts={setOpeningProducts} showModal={showModal} handleClose={handleClose} />
        </div>
    )
}

export default AddDispatch