import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Select from 'react-select';
import { PiEye } from 'react-icons/pi';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import PageTitle from '../../../helpers/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getReportActions, getWarehouseListActions } from '../../../redux/actions';
import ToastContainer from '../../../helpers/toast/ToastContainer';

const Report = () => {

  const dispatch = useDispatch();
  const store = useSelector((state) => state)
  const Warehouse = store?.getWarehouseListReducer?.searchWarehouse?.response;

  const warehouseOptions = Warehouse?.map((warehouse) => ({
    value: warehouse._id,
    label: warehouse.name,
  }));

  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [stockType, setStockType] = useState(null)
  console.log(stockType, selectedWarehouse, 'dbhujiuhyfghuj')
  const handleWarehouseChange = (selectedOption) => {
    setSelectedWarehouse(selectedOption);
  };

  useEffect(() => {
    dispatch(getWarehouseListActions());
  }, [dispatch]);

  const ReportData = store?.reportReducer?.report?.response || []
  console.log({ ReportData })

  const resp = store?.reportReducer?.report?.status;
  console.log(resp, 'response')

  useEffect(()=>{
    if(stockType&&selectedWarehouse?.value){
      const payload = {
        warehouseId: selectedWarehouse?.value,
        search: '',
        page: '',
        limit: '',
        type: "",
        stockFilter: stockType
      }
      dispatch(getReportActions(payload))
    }
  },[stockType])
  const handleProductsSearch = () => {
    const payload = {
      warehouseId: selectedWarehouse?.value,
      search: '',
      page: '',
      limit: '',
      type: "",
      stockFilter: '',
    }
    dispatch(getReportActions(payload))
  }
  const [toast, setToast] = useState(false)
  const handleSendMail = () => {
    const payload = {
      warehouseId: selectedWarehouse?.value,
      search: '',
      page: '',
      limit: '',
      type: "sendMail",
      stockFilter: stockType
    }
    setToast(true)
    dispatch(getReportActions(payload))
  }

  useEffect(() => {
    if (resp === 200 && toast) {
      setToast(false);
      ToastContainer('Email sent successfully', 'success')
    } else if (resp&&resp !== 200) {
      setToast(false);
      ToastContainer('Email not sent ', 'danger')
    }
  }, [resp ,toast])

  return (
    <div>
      <PageTitle
        breadCrumbItems={[
          { label: "SHIVAY Report List", path: "/shivay/report" },
          { label: "Report List", path: "/shivay/report", active: true },
        ]}
        title={"Report List"}
      />
      {/* <Form> */}
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
            <Form.Label className="mb-0">Stock Type</Form.Label>
            <Form.Select onChange={(e) => setStockType(e.target.value)}>
              <option value="">Select Stock Type</option>
              <option value="In Stock">In Stock</option>
              <option value="Low on Stock">Low on Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </Form.Select>
          </Form.Group>
        </Col>


        <Col sm={6} className='text-end' style={{ marginTop: '10px' }}>
          <Button onClick={handleSendMail} disabled={ReportData?.length === 0} className="mt-2 fw-bold custom-button me-2">
            Send Mail
          </Button>
          <Button onClick={handleProductsSearch} disabled={!selectedWarehouse} className="mt-2 fw-bold custom-button">
            Search
          </Button>
        </Col>
      </Row>
      {/* </Form> */}

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
                {ReportData && ReportData.length > 0 ? (
                  ReportData.map((data, index) => (
                    <tr key={index} className="text-dark fw-bold text-nowrap highlight-row">
                      <th scope="row">{index + 1}</th>
                      <td className="text-uppercase fw-bold">
                        {data?.productName || <span className="text-black">-</span>}
                      </td>
                      <td className="fw-bold">
                        {data?.modelName || <span className="text-black">-</span>}
                      </td>
                      <td className="fw-bold">
                        {data?.code || <span className="text-black">-</span>}
                      </td>
                      <td className="fw-bold">
                        {data?.quantity || <span className="text-black">-</span>}
                      </td>
                      <td className="fw-bold"></td>
                      <div className="icon-container d-flex pb-0">
                        {/* <span className="icon-wrapper" title="View">
                          <PiEye className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                        </span> */}
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
                      Please select a warehouse and search to view report data.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Report