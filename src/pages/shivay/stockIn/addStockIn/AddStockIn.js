import React, { useEffect, useRef, useState } from 'react'
import PageTitle from '../../../../helpers/PageTitle'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Select from 'react-select'; // Import React Select
import { IoIosAdd } from 'react-icons/io';
import { PiEye } from 'react-icons/pi';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import AddProductModal from '../../openingStock/addStock/AddProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { createStockInActions, getWarehouseListActions, listingSupplierActions, listingUsersActions, updateStockInActions } from '../../../../redux/actions';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const AddStockIn = () => {
    const [searchParams] = useSearchParams();
    const stockId = searchParams.get('id')
    const dispatch = useDispatch();
    const { handleSubmit, register, setValue } = useForm()
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const store = useSelector((state) => state)
    const [today, setToday] = useState(new Date().toISOString().split('T')[0]);
    const [openingProducts, setOpeningProducts] = useState([])
    const StockInData = store?.stockInListReducer?.stockInList?.response;
    const [selectedStock, setSelectedStock] = useState(null);
    const Warehouse = store?.getWarehouseListReducer?.searchWarehouse?.response;
    const UsersList = store?.listingUsersReducer?.listingUsers?.response;
    const SupplierList = store?.listingSupplierReducer?.listingSupplier?.response;
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuantity, setEditedQuantity] = useState('');
    const inputRef = useRef(null);
    console.log(editedQuantity, 'editedQuantity')
    const handleQuantityChange = (e) => {
        setEditedQuantity(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    // Handle save (when clicking outside or pressing Enter)
    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically also call an API to update the quantity in your backend
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                handleSave();
            }
        };


        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isEditing]);

    useEffect(() => {
        if (stockId && StockInData?.length > 0) {
            const foundStock = StockInData?.find(item => item._id === stockId);
            setSelectedStock(foundStock);
        }
    }, [stockId, StockInData]);

    const warehouseOptions = Warehouse?.map((warehouse) => ({
        value: warehouse._id,
        label: warehouse.name,
    }));

    const usersOptions = UsersList?.map((users) => ({
        value: users._id,
        label: users.name,
    }));

    const supplierOptions = SupplierList?.map((users) => ({
        value: users._id,
        label: users.name,
    }));

    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    console.log(selectedWarehouse, 'selectedWarehouse')
    useEffect(() => {
        if (stockId && selectedStock) {
            console.log(selectedStock, '2345432')
            setToday(selectedStock?.createdAt ? new Date(selectedStock?.createdAt).toISOString().split('T')[0] : '')
            const updateWarehouses = selectedStock?.warehouseData
                ? { value: selectedStock.warehouseId, label: selectedStock.warehouseData?.find((ele) => ele?._id === selectedStock?.warehouseId)?.name }
                : {};
            setSelectedWarehouse(updateWarehouses)

            const updatedUser = selectedStock?.receivedByData ? { value: selectedStock?.receivedBy, label: selectedStock.receivedByData?.find((ele) => ele?._id === selectedStock?.receivedBy)?.name }
                : {}
            setSelectedUser(updatedUser)

            const updatedSupplier = selectedStock?.supplierId ? { value: selectedStock?.supplierId, label: selectedStock.supplierData?.find((ele) => ele?._id === selectedStock?.supplierId)?.name }
                : {}
            setSelectedSupplier(updatedSupplier)

            setValue('invoiceNumber', selectedStock?.invoiceNumber || '');
            setValue('description', selectedStock?.description || '');
            setValue('invoiceValue', selectedStock?.fright || '');
            setValue('invoiceAttachment', selectedStock?.invoiceAttachment || '');
            setEditedQuantity(selectedStock?.productData?.stockInQty || '');
        }

    }, [stockId, selectedStock])
    console.log(selectedWarehouse, 'selectedWarehouse')
    const handleAccordionToggle = () => {
        setIsAccordionOpen(prevState => !prevState);
    };
    const handleWarehouseChange = (selectedOption) => {
        setSelectedWarehouse(selectedOption);
    };

    const handleUserChange = (selectedUser) => {
        setSelectedUser(selectedUser);
    };

    const handleSupplierChange = (selectedSupplier) => {
        setSelectedSupplier(selectedSupplier);
    };

    useEffect(() => {
        dispatch(getWarehouseListActions());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listingUsersActions());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listingSupplierActions());
    }, [dispatch]);

    const onSubmit = (data) => {

        const cleanedProducts = openingProducts.map(({ product, ...rest }) => rest);
        const formData = new FormData();
        if (data?.invoiceAttachment?.[0] instanceof File) {
            formData.append('invoiceAttachment', data.invoiceAttachment[0]);
        }

        formData.append('warehouseId', selectedWarehouse?.value)
        formData.append('receivedBy', selectedUser?.value);
        formData.append('supplierId', selectedSupplier?.value);
        formData.append('stockInQty', stockId ? parseInt(editedQuantity) : JSON.stringify(cleanedProducts));
        formData.append('description', data?.description);
        formData.append('date', data?.date);
        formData.append('invoiceNumber', data?.invoiceNumber);
        formData.append('fright', data?.invoiceValue);
        if (stockId) {
            formData.append('_id', stockId);
        }
        if (stockId) {
            alert('update')
            dispatch(updateStockInActions(formData))
        } else {
            dispatch(createStockInActions(formData));
        }
        // console.log(formData, 'formData');
    };

    return (
        <div>
            <PageTitle
                breadCrumbItems={[
                    { label: "SHIVAY Stock In List", path: "/shivay/stockIn" },
                    { label: "Add Stock In ", path: "/shivay/stockIn", active: true },
                ]}
                title={"Add Stock In"}
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
                                onClick={handleAccordionToggle}  // Toggle the accordion open state
                            >
                                <div className="flex-grow-1 text-black fw-bold"> Add Stock In Details</div>

                                {/* Right-aligned buttons */}
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
                                            <Form.Label className="mb-0">Received By</Form.Label>
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
                                            <Form.Label className="mb-0">Supplier</Form.Label>
                                            <Select
                                                value={selectedSupplier}
                                                onChange={handleSupplierChange}
                                                options={supplierOptions}
                                                placeholder="Select a Supplier"
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
                                                value={today}
                                                {...register('date', { required: true })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group className="mb-1">
                                            <Form.Label className="mb-0">Invoice Number</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Invoice Number"
                                                {...register('invoiceNumber', { required: true })}

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group className="mb-1">
                                            <Form.Label className="mb-0">Attach Invoice</Form.Label>
                                            <Form.Control
                                                type="file"
                                                placeholder="Upload file"
                                                {...register('invoiceAttachment', {
                                                    required: !selectedStock?.invoiceAttachment, // only require if no existing
                                                })}
                                            />
                                            {selectedStock?.invoiceAttachment && (
                                                <div className="mt-2">
                                                    <a
                                                        href={selectedStock.invoiceAttachment}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View Existing Invoice
                                                    </a>
                                                </div>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col sm={3}>
                                        <Form.Group className="mb-1">
                                            <Form.Label className="mb-0">Invoice Value</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('invoiceValue', { required: true })}
                                                placeholder="Enter Invoice Value"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group className="mb-1">
                                            <Form.Label className="mb-0">Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={1}
                                                {...register('description', { required: true })}
                                                placeholder="Enter Description"
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
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
                                        <th scope="col">Code</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!stockId ? (
                                        openingProducts && openingProducts.length > 0 ? (
                                            openingProducts.map((data, index) => (
                                                <tr key={index} className="text-dark fw-bold text-nowrap highlight-row">
                                                    <th scope="row">{index + 1}</th>
                                                    <td className="text-uppercase fw-bold">
                                                        {data?.product?.name || <span className="text-black">-</span>}
                                                    </td>
                                                    <td className="fw-bold">
                                                        {data?.product?.code || <span className="text-black">-</span>}
                                                    </td>
                                                    <td className="fw-bold">
                                                        {data?.quantity || <span className="text-black">-</span>}
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <div className="icon-container d-flex pb-0">
                                                            <span className="icon-wrapper" title="View">
                                                                <PiEye className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                                            </span>
                                                            <span className="icon-wrapper" title="Edit">
                                                                <AiOutlineEdit className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                                            </span>
                                                            <span className="icon-wrapper" title="Delete">
                                                                <RiDeleteBinLine className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted py-3">
                                                    No products added yet. Please add products to add stockIn.
                                                </td>
                                            </tr>
                                        )
                                    ) : (
                                        <tr>
                                            <th scope="row">1</th>
                                            <td className="text-uppercase fw-bold">
                                                {selectedStock?.productData?.name || <span className="text-black">-</span>}
                                            </td>
                                            <td className="fw-bold">
                                                {selectedStock?.productData?.code || <span className="text-black">-</span>}
                                            </td>
                                            <td className="fw-bold">
                                                {isEditing ? (
                                                    <input
                                                        ref={inputRef}
                                                        type="number"  // or "text" depending on your needs
                                                        value={editedQuantity}
                                                        onChange={handleQuantityChange}
                                                        onKeyPress={handleKeyPress}
                                                        // autoFocus
                                                        className="form-control form-control-md"
                                                        style={{ width: '5vw', display: 'inline-block', marginTop: '-10px' }}
                                                    />
                                                ) : (
                                                    <span onClick={handleEditClick} > {editedQuantity}</span>
                                                )}

                                            </td>
                                            <td></td>
                                            <div className="icon-container d-flex pb-0">
                                                <span
                                                    className="icon-wrapper me-4"
                                                    title="Edit"
                                                    onClick={handleEditClick}
                                                >
                                                    <AiOutlineEdit className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                                </span>
                                            </div>
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
                        <Button className="fw-bold custom-button" type='submit'>{stockId ? 'Update' : "Submit"}</Button>
                    </div>
                </div>
            </Form>
            <AddProductModal openingProducts={openingProducts} setOpeningProducts={setOpeningProducts} showModal={showModal} handleClose={handleClose} />
        </div >
    )
}

export default AddStockIn