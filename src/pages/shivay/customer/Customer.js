import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { IoIosAdd } from "react-icons/io";
import PageTitle from '../../../helpers/PageTitle';
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import AddCustomerModal from './modal/AddCustomerModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomerActions, getCustomerListActions } from '../../../redux/actions';
import { FaRegCopy } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import Pagination from '../../../helpers/Pagination';

const Customer = () => {

  const dispatch = useDispatch();
  const [search, setSearch] = useState('')
  const store = useSelector((state) => state)
  const [showConfirm, setShowConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const totalRecords = '0';
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / pageSize));

  const CustomerData = store?.customerListReducer?.customerList?.data;
  const createResponse = store?.createCustomerReducer?.createCustomer?.status;
  const updateResponse = store?.updateCustomerReducer?.updateCustomer?.status;
  const deleteResponse = store?.deleteCustomerReducer?.deleteCustomer?.status;

  const handleDelete = () => {
    dispatch(deleteCustomerActions({ customerId: customerToDelete }));
    setShowConfirm(false);
  };

  useEffect(() => {
    if (createResponse === 200 || updateResponse === 200 || deleteResponse === 200) {
      dispatch(getCustomerListActions({
        limit: pageSize,
        page: pageIndex,
        search: search,
        stockFilter: true,
      }));
    }
  }, [createResponse, updateResponse, deleteResponse]);

  useEffect(() => {
    dispatch(getCustomerListActions({
      limit: pageSize,
      page: pageIndex,
      search: search,
      stockFilter: true,
    }));
  }, [dispatch, search, pageSize, pageIndex]);

  const [showCustomerModal, setShowCustomerModal] = useState({
    data: null,
    type: null,
    status: false
  })

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageSize));
  },
    [totalRecords, pageSize]);

  const handleCustomerModal = (customerDetails, modalType, modalStatus) => {
    setShowCustomerModal({ ...showCustomerModal, data: customerDetails, type: modalType, status: modalStatus })
  }

  const handleClose = () => {
    setShowCustomerModal({ ...showCustomerModal, data: null, status: false })
  }

  return (
    <div>
      <PageTitle
        breadCrumbItems={[
          { label: "SHIVAY Customer List", path: "/shivay/customer" },
          { label: "Customer List", path: "/shivay/customer", active: true },
        ]}
        title={"Customer List"}
      />
      <Form>
        <Row>
          <Col sm={12}>
            <div className='d-flex justify-content-end mt-1'>
              <input
                type="text"
                className="form-control w-auto me-2"
                style={{ height: '42px', marginTop: '10px' }}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="mt-2 fw-bold custom-button" onClick={() => handleCustomerModal(null, 'Add', true)}>
                <IoIosAdd className="fs-3" />&nbsp;Customer
              </Button>
            </div>
          </Col>

          <div className='mt-2'>
            <Card
              style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}
            >
              <Card.Body className="text-center py-1">
                <table className="table table-striped bg-white mb-0">
                  <thead>
                    <tr className="table_header">
                      <th scope="col"><i className="mdi mdi-merge"></i></th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Email ID</th>
                      <th scope="col">Phone Number</th>
                      {/* <th scope="col">Location</th> */}

                      {/* <th scope="col">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {CustomerData?.map((data, index) => (
                      <tr key={index} className="text-dark fw-bold text-nowrap highlight-row">
                        <th scope="row">{index + 1}</th>
                        <td className="text-uppercase fw-bold ">
                          {data?.name || <span className="text-danger">N/A</span>}
                        </td>
                        <td className="fw-bold text-primary">
                          {data?.email ? (
                            <>
                              <span>{data.email}</span>
                              <FaRegCopy
                                style={{ cursor: 'pointer' }}
                                title="Copy Email"
                                className='text-muted ms-2 fs-6'
                                onClick={() => {
                                  navigator.clipboard.writeText(data.email);
                                  alert('Email copied to clipboard!');
                                }}
                              />
                            </>
                          ) : (
                            <span className="text-danger">N/A</span>
                          )}
                        </td>
                        <td className="fw-bold">
                          {data?.primaryPhoneNumber || <span className="text-danger">N/A</span>}
                        </td>
                        {/* <td className="fw-bold">
                          {data?.location || <span className="text-danger">N/A</span>}
                        </td> */}
                        <td></td>
                        <td></td>
                        <div className="icon-container d-flex  pb-0" >
                          {/* <span className="icon-wrapper" title="View">
                            <PiEye className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                          </span> */}
                          <span className="icon-wrapper" title="Edit">
                            <AiOutlineEdit
                              className="fs-4 text-black"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleCustomerModal(data, 'Edit', true)}
                            />
                          </span>
                          <span className="icon-wrapper" title="Delete" onClick={() => { setCustomerToDelete(data?._id); setShowConfirm(true); }}>
                            <RiDeleteBinLine className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                          </span>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  totalPages={useSelector((state) => state?.customerListReducer?.customerList?.totalPages)}
                  setPageIndex={setPageIndex}
                  onChangePageSize={setPageSize}
                />
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Form>

      <AddCustomerModal showModal={showCustomerModal?.status} handleClose={handleClose} CustomerData={showCustomerModal} />

      {/* delete modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} >
        <Modal.Body className='text-center'>
          <h4 className='text-black'>Confirm Deletion</h4>
          <p className='mt-2 mb-3'> Are you sure you want to delete this Customer?</p>
          <span className='bg-light rounded-circle p-3 '>
            <MdDeleteOutline className='fs-1  text-danger' />
          </span>
          <div className='d-flex justify-content-center mt-3 gap-2'>
            <Button className='cancel-button' onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button className='custom-button' onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Customer