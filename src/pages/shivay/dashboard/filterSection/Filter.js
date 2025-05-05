import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Form, Row } from 'react-bootstrap'
import { TiArrowRight } from 'react-icons/ti'
import PerformanceChart from '../chart/PerformanceChart';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getLowStockActions, getRecentTransactionActions, getStockReportActions, getWarehouseListActions } from '../../../../redux/actions';
import Select from 'react-select';

const Filter = () => {

  const dispatch = useDispatch();
  const { handleSubmit, register, setValue } = useForm();
  const store = useSelector((state) => state);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const StockReport = store?.stockReportReducer?.stockReport;
  const TopSelling = store?.recentTransactionReducer?.recentTransaction?.getTopSellingProduct;
  console.log(TopSelling, 'TopSelling')
  const RecentTransaction = store?.recentTransactionReducer?.recentTransaction?.recentTransaction;
  console.log(RecentTransaction, 'RecentTransaction')
  const Warehouse = store?.getWarehouseListReducer?.searchWarehouse?.response;
  const warehouseOptions = Warehouse?.map((warehouse) => ({
    value: warehouse._id,
    label: warehouse.name,
  }));

  useEffect(() => {
    dispatch(getWarehouseListActions());
  }, [dispatch]);

  const handleWarehouseChange = (selectedOption) => {
    setSelectedWarehouse(selectedOption);
  };

  const handleProductsSearch = () => {
    const payload = {
      warehouseId: selectedWarehouse?.value,
      search: '',
      page: 1,
      limit: 10,
      type: "",
      startDate: '',
      endDate: '',
      stockFilter: '',
    }
    dispatch(getLowStockActions(payload));
    dispatch(getStockReportActions(payload));
    dispatch(getRecentTransactionActions(payload));
  }

  const SellingProducts = [
    { productName: 'Smartphone', stockIn: 150 },
    { productName: 'Laptop', stockIn: 75 },
    { productName: 'Tablet', stockIn: 120 },
    { productName: 'Smartwatch', stockIn: 200 },
  ];

  return (
    <div>
      <Form>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-1">
              <Form.Label className='mb-0'>Warehouse <span className='text-danger'>*</span></Form.Label>
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
          <Col sm={6}>
            <Form.Group className="mb-1">
              <Form.Label className='mb-0'>Date Range</Form.Label>
              <Form.Control
                type="date"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-1">
              <Form.Label className='mb-0'>Product </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                name="Product Search"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-1">
              <Form.Label className='mb-0'>Transaction Type</Form.Label>
              <Form.Select
                name="transactionType"
              >
                <option value="">Select a transaction type</option>
                <option value="purchase">Purchase</option>
                <option value="refund">Refund</option>
                <option value="transfer">Transfer</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <div className="d-flex justify-content-end mb-2">
            <Button className="fw-bold custom-button" onClick={handleProductsSearch} disabled={!selectedWarehouse}>Search</Button>
          </div>
          <Col sm={6} className="mb-2">
            <div
              className="d-flex justify-content-between align-items-center px-3 py-2 rounded-2"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px 2px 5px'
              }}
            >
              <h3 className="text-success">{StockReport?.totalStockIn || '-'}</h3>
              <p className="mb-0">Total Stock In</p>
              <TiArrowRight className="fs-4" />
            </div>
          </Col>
          <Col sm={6} className="mb-2">
            <div
              className="d-flex justify-content-between align-items-center px-3 py-2 rounded-2"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px 2px 5px'
              }}
            >
              <h3 className="text-danger">{StockReport?.totalStockOut || '-'}</h3>
              <p className="mb-0">Total Dispatch today</p>
              <TiArrowRight className="fs-4" />
            </div>
          </Col>
          <div className="d-flex flex-wrap">
            <Col sm={6} className="mb-2 d-flex pe-2">
              <div
                className="px-1 py-0 rounded-2 w-100"
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px 2px 5px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h5>Total Stock Summary</h5>
                <div>
                  <PerformanceChart />
                </div>
              </div>
            </Col>

            {/* Top Selling Products Table */}
            <Col sm={6} className="mb-2 d-flex ps-2">
              <div
                className="px-1 py-0 rounded-2 w-100"
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px 2px 5px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div>
                  <div className="d-flex justify-content-between">
                    <h5>Top Selling Products</h5>
                    <p className="mb-0 mt-1 text-primary fs-6">View All</p>
                  </div>
                  <div className="table-responsive mb-0 flex-grow-1">
                    <table className="table table-striped bg-white mb-0">
                      <thead>
                        <tr style={{ color: '#703133' }}>
                          <th scope="col"><i className="mdi mdi-merge"></i></th>
                          <th scope="col">Name</th>
                          <th scope="col">Units</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TopSelling?.map((data, index) => (
                          <tr key={index} className="text-dark fw-bold text-nowrap">
                            <th scope="row" className="fs-6">{index + 1}</th>

                            <td className="text-uppercase fw-bold fs-6 text-primary">
                              {data?.name || <span className="text-black">-</span>}
                            </td>

                            <td className="text-uppercase fw-bold fs-6 text-success">
                              {data?.unitsSold || <span className="text-black">-</span>}
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>

            {/* Recent Transaction Table */}
            <Col sm={6} className="d-flex pe-2">
              <div
                className="px-1 py-0 rounded-2 w-100"
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px 2px 5px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div>
                  <div className="d-flex justify-content-between">
                    <h5>Recent Transaction</h5>
                    <p className="mb-0 mt-1 text-primary fs-6">View All</p>
                  </div>
                  <div className="table-responsive mb-0 flex-grow-1">
                    <table className="table table-striped bg-white mb-0">
                      <thead>
                        <tr style={{ color: '#703133' }}>
                          <th scope="col">Date</th>
                          <th scope="col">Invoice</th>
                          <th scope="col">Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RecentTransaction?.slice(0, 4).map((data, index) => (
                          <tr key={index} className="text-dark fw-bold text-nowrap">
                            <td className="text-uppercase text-success fs-6">
                              {data?.date || <span className="text-danger">-</span>}
                            </td>
                            <td className="text-primary fs-6" title={data?.invoiceAttachment}>
                              {data?.invoiceAttachment
                                ? `${data.invoiceAttachment.slice(0, 20)}${data.invoiceAttachment.length > 20 ? '...' : ''}`
                                : <span className="text-danger">-</span>}
                            </td>
                            <td className="text-uppercase fw-bold text-primary fs-6">
                              {data?.location || <span className="text-danger">-</span>}
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>

            {/* Low Stock Alert Table */}
            <Col sm={6} className=" d-flex ps-2">
              <div
                className="px-1 py-0 rounded-2 w-100"
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px 2px 5px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div>
                  <div className="d-flex justify-content-between">
                    <h5>Low Stock Alert</h5>
                    <p className="mb-0 mt-1 text-primary fs-6">View All</p>
                  </div>
                  <div className="table-responsive mb-0 flex-grow-1">
                    <table className="table table-striped bg-white mb-0">
                      <thead>
                        <tr style={{ color: '#703133' }}>
                          <th scope="col"><i className="mdi mdi-merge"></i></th>
                          <th scope="col">Name</th>
                          <th scope="col">Units</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SellingProducts?.map((data, index) => (
                          <tr key={index} className="text-dark fw-bold text-nowrap">
                            <th scope="row" className="fs-6">{index + 1}</th>
                            <td className="text-uppercase fw-bold text-primary fs-6">
                              {data?.productName || <span className="text-danger">N/A</span>}
                            </td>
                            <td className="text-uppercase fw-bold text-success fs-5">
                              <Badge className="bg-danger text-white" style={{ width: '2rem' }}>
                                {data?.stockIn !== undefined ? data.stockIn : <span className="text-danger">N/A</span>}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} className="mt-3 mb-2">
              <div
                className="text-center px-3 py-2 rounded-2"
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px 2px 5px'
                }}
              >
                <h5 className="text-secondary mb-0">Today’s Dispatch</h5>
                <p className="mb-0 fs-6">20 Orders Dispatch Today.</p>
              </div>
            </Col>
          </div>

        </Row>
      </Form>
    </div>
  )
}

export default Filter