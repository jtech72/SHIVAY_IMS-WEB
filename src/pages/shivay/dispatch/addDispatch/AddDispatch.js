import React, { useEffect, useRef, useState } from 'react'
import PageTitle from '../../../../helpers/PageTitle'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Select from 'react-select';
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import AddProductModal from '../../openingStock/addStock/AddProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { createDispatchActions, getWarehouseListActions, listingCustomerActions, listingUsersActions, updateDispatchActions } from '../../../../redux/actions';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CgCloseO } from "react-icons/cg";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { ButtonLoading } from '../../../../helpers/loader/Loading';

const AddDispatch = () => {
    const [searchParams] = useSearchParams();
    const stockId = searchParams.get('id')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, register, setValue, resetField } = useForm()
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const store = useSelector((state) => state)
    const [today, setToday] = useState(new Date().toISOString().split('T')[0]);
    const [attachmentType, setAttachmentType] = useState("");
    const fileInputRef = useRef();
    const [openingProducts, setOpeningProducts] = useState([])
    console.log(openingProducts, 'openingProducts')
    const DispatchData = store?.getDispatchDataReducer?.dispatchList?.response;
    console.log(DispatchData, 'DispatchData')
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
    console.log(selectedWarehouse, 'selectedWarehouse')
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedQuantity, setEditedQuantity] = useState('');
    const inputRef = useRef(null);
    console.log(editedQuantity, 'editedQuantity')
    const createResponse = store?.createDispatchReducer?.createDispatch?.status;
    const handleQuantityChange = (e) => {
        setEditedQuantity(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };
    // console.log(selectedStock, 'selectedStock34534r')

    useEffect(() => {
        if (createResponse === 200) {
            navigate("/shivay/dispatch");
        }
    }, [createResponse]);

    const handleAttachmentTypeChange = (e) => {
        const type = e.target.value;
        setAttachmentType(type);
        setValue("invoiceAttachmentType", type);
    };

    const resetAttachmentType = () => {
        setAttachmentType("");
        setValue("invoiceAttachmentType", "");
        resetField("invoiceAttachment");
        if (fileInputRef.current) fileInputRef.current.value = "";
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
        if (stockId && DispatchData?.length > 0) {
            const foundStock = DispatchData?.find(item => item._id === stockId);
            setSelectedStock(foundStock);
        }
    }, [stockId, DispatchData]);
    useEffect(() => {
        if (stockId && selectedStock) {
            console.log(selectedStock, '2345432')
            setToday(selectedStock?.createdAt ? new Date(selectedStock?.createdAt).toISOString().split('T')[0] : '')
            const updateWarehouses = selectedStock?.warehouseData
                ? { value: selectedStock.warehouseId, label: selectedStock.warehouseData?.find((ele) => ele?._id === selectedStock?.warehouseId)?.name }
                : {};
            setSelectedWarehouse(updateWarehouses)

            const updatedUser = selectedStock?.customerData ? { value: selectedStock?.customerId, label: selectedStock.customerData?.find((ele) => ele?._id === selectedStock?.customerId)?.name }
                : {}
            setSelectedCustomer(updatedUser)

            const updatedSupplier = selectedStock?.dispatchId ? { value: selectedStock?.dispatchId, label: selectedStock.dispatchByData?.[0]?.name }
                : {}
            setSelectedUser(updatedSupplier)

            setValue('invoiceNumber', selectedStock?.invoiceNumber || '');
            setValue('description', selectedStock?.description || '');
            setValue('invoiceValue', selectedStock?.fright || '');
            setValue('attachmentGRfile', selectedStock?.attachmentGRfile || '');
            setValue('invoiceAttachment', selectedStock?.invoiceAttachment || '');
            setValue('grNumber', selectedStock?.grNumber || '');
            setEditedQuantity(selectedStock?.productData?.[0]?.stockOutQty || '');
            setAttachmentType(selectedStock?.invoiceAttachmentType || '')
        }

    }, [stockId, selectedStock])
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
        if (data?.invoiceAttachment?.[0] instanceof File) {
            formData.append('invoiceAttachment', data.invoiceAttachment?.[0]);
        }

        formData.append('warehouseId', selectedWarehouse?.value)
        formData.append('dispatchBy', selectedUser?.value);
        formData.append('customerId', selectedCustomer?.value);
        formData.append('description', data?.description);
        formData.append('date', data?.date);
        formData.append('grNumber', data?.grNumber);
        formData.append('invoiceAttachmentType', data?.invoiceAttachmentType);

        if (stockId) {
            formData.append('quantity', stockId ? editedQuantity : JSON.stringify(cleanedProducts));
        } else {
            formData.append('productDispatchQty', stockId ? editedQuantity : JSON.stringify(cleanedProducts));
        }
        if (stockId) {
            formData.append('_id', stockId);
            formData.append('productId', selectedStock?.productData?.[0]?._id)
        }
        if (stockId) {
            dispatch(updateDispatchActions(formData))
        } else {
            dispatch(createDispatchActions(formData));
        }
        // console.log(formData, 'formData');
    };

    return (
        <div>
            <PageTitle
                breadCrumbItems={[
                    { label: "SHIVAY Dispatch List", path: "/shivay/dispatch" },
                    { label: stockId ? "Edit Dispatch" : "Add Dispatch", path: "/shivay/dispatch", active: true },
                ]}
                title={stockId ? "Edit Dispatch" : "Add Dispatch"}
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
                                <div className="flex-grow-1 text-black fw-bold"> {stockId ? "Edit" : "Add"} Dispatch Details</div>

                                <div className="d-flex">
                                    <Button
                                        className="fw-bold custom-button me-2"
                                        onClick={handleShow}
                                        disabled={!selectedWarehouse}
                                    >
                                        <IoIosAdd className="fs-3" />&nbsp;Product
                                    </Button>
                                </div>
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className={`accordion-collapse collapse ${isAccordionOpen ? "" : "show"}`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body py-1">
                                <Form>
                                    <Row>
                                        <Col sm={3}>
                                            <Form.Group className="mb-1">
                                                <Form.Label className='mb-0'>Warehouse {!stockId && <span className='text-danger'>*</span>}</Form.Label>
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
                                                <Form.Label className="mb-0">Customer {!stockId && <span className='text-danger'>*</span>}</Form.Label>
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
                                                <Form.Label className="mb-0">Dispatch By {!stockId && <span className='text-danger'>*</span>}</Form.Label>
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
                                                    {...register('date')}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Group className="mb-1">
                                                <Form.Label className="mb-0">GR Number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Invoice Number"
                                                    {...register('grNumber')}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Group className="mb-1">
                                                <Form.Label className="mb-0">Attach GR File {!stockId && <span className='text-danger'>*</span>}
                                                    {selectedStock?.attachmentGRfile && (
                                                        <a
                                                            href={selectedStock.attachmentGRfile}
                                                            target="_blank"
                                                            title='Download GR File'
                                                            rel="noopener noreferrer"
                                                        >
                                                            <HiOutlineFolderDownload className='ms-1 fs-4' />
                                                        </a>
                                                    )}
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    placeholder="Upload file"
                                                    {...register('attachmentGRfile', {
                                                        required: !selectedStock?.attachmentGRfile, // only require if no existing
                                                    })}
                                                />

                                            </Form.Group>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Group className="mb-1">
                                                <Form.Label className="mb-0">
                                                    Attachment
                                                    {attachmentType && (
                                                        <span className="text-capitalize"> ({attachmentType})</span>
                                                    )}
                                                    {selectedStock?.invoiceAttachment && (
                                                        <a
                                                            href={selectedStock?.invoiceAttachment}
                                                            target="_blank"
                                                            title='Download Attachment'
                                                            rel="noopener noreferrer"
                                                        // style={{position:'absolute', top:'20px'}}
                                                        >
                                                            <HiOutlineFolderDownload className='ms-1 fs-4' />
                                                        </a>
                                                    )}
                                                    {!stockId && <span className="text-danger"> *</span>}
                                                </Form.Label>

                                                {!attachmentType ? (
                                                    <Form.Select
                                                        className="mb-0"
                                                        // defaultValue=""
                                                        value={attachmentType}
                                                        onChange={handleAttachmentTypeChange}

                                                    >
                                                        <option value="">Select Attachment Type</option>
                                                        <option value="Invoice">Invoice</option>
                                                        <option value="Delivery Challan">Delivery Challan</option>
                                                    </Form.Select>
                                                ) : (
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Form.Control
                                                            type="file"
                                                            placeholder="Upload file"
                                                            // required={!stockId}
                                                            {...register("invoiceAttachment")}
                                                        // ref={fileInputRef}
                                                        />
                                                        <CgCloseO
                                                            size={20}
                                                            className='text-danger'
                                                            style={{ cursor: "pointer" }}
                                                            onClick={resetAttachmentType}
                                                            title="Change attachment type"
                                                        />
                                                    </div>
                                                )}


                                            </Form.Group>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Group className="mb-1">
                                                <Form.Label className="mb-0">Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={1}
                                                    placeholder="Enter Description"
                                                    {...register('description')}
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
                                        <th scope="col">Model Name</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                {!stockId &&
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
                                                <td colSpan="6" className="text-center text-danger py-3">
                                                    Note : No products added yet. Please select a warehouse and add products to add dispatch.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                }
                                {stockId &&
                                    <tbody>
                                        {selectedStock?.productData?.map((data, index) => (
                                            <tr key={index} className="text-dark fw-bold text-nowrap highlight-row">
                                                <td>{index + 1}</td>
                                                <td>{data?.name}</td>
                                                <td>{selectedStock?.modelData?.find((ele) => ele?._id === data?.modelId)?.name}</td>
                                                <td>{data?.code}</td>
                                                <td>
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
                                                        <span onClick={handleEditClick} > {editedQuantity}</span> || <span className="text-black">-</span>
                                                    )}
                                                </td>
                                                {/* <td>{data?.stockOutQty}</td> */}
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
                                        ))}
                                    </tbody>
                                }
                            </table>

                        </Card.Body>
                    </Card>
                    <div className="text-end">
                        <Button
                            className="fw-bold cancel-button me-2"
                            onClick={() => navigate("/shivay/dispatch")}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="custom-button fw-bold"
                            disabled={store?.createDispatchReducer?.loading}
                            style={{ width: '100px' }}
                        >
                            {store?.createDispatchReducer?.loading ? (
                                <ButtonLoading color="white" />
                            ) : stockId ? (
                                'Update'
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </div>
                </div>
            </Form>

            <AddProductModal selectedWarehouse={selectedWarehouse} openingProducts={openingProducts} setOpeningProducts={setOpeningProducts} showModal={showModal} handleClose={handleClose} />
        </div>
    )
}

export default AddDispatch