import React from 'react'
import { Badge, Button, Col, Form, Row } from 'react-bootstrap'
import { TiArrowRight } from 'react-icons/ti'
import PerformanceChart from '../chart/PerformanceChart';

const Filter = () => {

  const SellingProducts = [
    { productName: 'Smartphone', stockIn: 150 },
    { productName: 'Laptop', stockIn: 75 },
    { productName: 'Tablet', stockIn: 120 },
    { productName: 'Smartwatch', stockIn: 200 },
  ];

  const RecentTransaction = [
    { date: '2025-04-05', invoice: 'INV-1001' },
    { date: '2025-04-06', invoice: 'INV-1002' },
    { date: '2025-04-07', invoice: 'INV-1003' },
    { date: '2025-04-08', invoice: 'INV-1004' },
  ];

  return (
    <div>
      <Form>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-1">
              <Form.Label className='mb-0'>Warehouse</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Enter question"
                name="Warehouse"
                // value={faq.question}
                // onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-1">
              <Form.Label className='mb-0'>Date Range</Form.Label>
              <Form.Control
                type="date"
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-1">
              <Form.Label className='mb-0'>Product </Form.Label>
              <Form.Control
                type="text"
                // placeholder="Enter question"
                name="Product Search"
                // value={faq.question}
                // onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-1">
              <Form.Label className='mb-0'>Transaction Type</Form.Label>
              <Form.Select
                name="transactionType"
                required
              // value={selectedTransactionType}
              // onChange={handleChange}
              >
                <option value="">Select a transaction type</option>
                <option value="purchase">Purchase</option>
                <option value="refund">Refund</option>
                <option value="transfer">Transfer</option>
                {/* Add more options as needed */}
              </Form.Select>
            </Form.Group>
          </Col>
          <div className="d-flex justify-content-end mb-2">
            <Button className="fw-bold custom-button">Search</Button>
          </div>
          <Col sm={6} className="mb-2">
            <div
              className="d-flex justify-content-between align-items-center px-3 py-2 rounded-2"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px 2px 5px'
              }}
            >
              <h3 className="text-success">1500</h3>
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
              <h3 className="text-danger">200</h3>
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
                        {SellingProducts?.map((data, index) => (
                          <tr key={index} className="text-dark fw-bold text-nowrap">
                            <th scope="row" className="fs-6">{index + 1}</th>
                            <td className="text-uppercase fw-bold text-primary fs-6">
                              {data?.productName || <span className="text-danger">N/A</span>}
                            </td>
                            <td className="text-uppercase fw-bold text-success fs-6">
                              {data?.stockIn !== undefined ? data.stockIn : <span className="text-danger">N/A</span>}
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
                          <th scope="col"><i className="mdi mdi-merge"></i></th>
                          <th scope="col">Date</th>
                          <th scope="col">Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RecentTransaction?.map((data, index) => (
                          <tr key={index} className="text-dark fw-bold text-nowrap">
                            <th scope="row" className="fs-6">{index + 1}</th>
                            <td className="text-uppercase fw-bold text-success fs-6">
                              {data?.date || <span className="text-danger">N/A</span>}
                            </td>
                            <td className="text-uppercase fw-bold text-primary fs-6">
                              {data?.invoice || <span className="text-danger">N/A</span>}
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