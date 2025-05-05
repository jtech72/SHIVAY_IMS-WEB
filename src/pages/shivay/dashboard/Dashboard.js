import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../helpers/PageTitle";
import { getDashboardActions, getDispatchActions, getStockinActions } from "../../../redux/actions";
import { FaLayerGroup, FaUsers, } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { DashboardLoading } from "../../../helpers/loader/Loading";
import { MdFilterList } from "react-icons/md";
import Tab from "./tabs/Tab";
import { PiEye } from "react-icons/pi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { TiArrowLeft } from "react-icons/ti";
import Filter from "./filterSection/Filter";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState('')
  const store = useSelector((state) => state)

  const StockinData = store?.stockinTransListReducer?.stockinList?.data;
  const DispatchData = store?.dispatchListReducer?.dispatchList?.data;
  const DashboardCount = store?.dashboardDataReducer?.dashboardData?.response;

  useEffect(() => {
    dispatch(getDashboardActions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStockinActions({
      limit: '',
      page: '',
      search: search,
    }));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(getDispatchActions({
      limit: '',
      page: '',
      search: '',
    }));
  }, [dispatch]);

  const dashboardItems = [
    {
      title: "Total Warehouse",
      value: DashboardCount?.totalWarehouse,
      icon: <MdOutlineStoreMallDirectory />,
      background: "https://img.freepik.com/free-photo/factory-workers-walking-through-large-production-hall-having-conversation_342744-167.jpg?t=st=1744610960~exp=1744614560~hmac=3a9848632fe4c06c84e920765cca04c97132034c3fd6238bfa595be131e5d0ca&w=996",
      link: "/shivay/warehouse"
    },
    {
      title: "Total Products",
      value: DashboardCount?.productCount,
      icon: <FaLayerGroup />,
      background: "https://img.freepik.com/premium-photo/woman-warehouse-using-computer-manage-inventory_239711-30274.jpg?w=1380",
      link: "/shivay/inventory"
    },
    {
      title: "Total User",
      value: DashboardCount?.userCount,
      icon: <FaUsers />,
      background: "https://img.freepik.com/premium-photo/businessman-showing-virtual-graphic-human-icon-human-development-recruitment-leadership-human-resource-management_55710-1797.jpg?w=996",
      link: "/shivay/user"
    },
    {
      title: "Total Dispatch ",
      value: DashboardCount?.dispatchCount,
      icon: <MdOutlineSell />,
      background: "https://img.freepik.com/premium-photo/manager-coordinating-with-truck-drivers-delivery-focus-streamlined-operations-vibrant-composite-organized-receiving-dock_35669-9100.jpg?w=1380",
      link: "/shivay/dispatch"
    }
  ];

  const connectTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "SHIVAY Dashboard", path: "/shivay/dashboard" },
          { label: "Dashboard", path: "/shivay/dashboard", active: true },
        ]}
        title={"Dashboard"}
      />
      {/* card section */}
      <Row className="g-4 mt-2">
        {dashboardItems?.map((item, index) => (
          <Col key={index} md={6} lg={3}>
            <Link to={item.link} className="text-decoration-none">

              <Card
                className="border-0 text-white card-hover-effect cursor"
                style={{
                  backgroundImage: `url('${item.background}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <Card.Body className="d-flex align-items-center justify-content-between card-body-zoom">
                  <div>
                    <h6 className="fw-bold">{item.title}</h6>
                    <h2 className="fw-bold">{item.value}</h2>
                  </div>
                  <div className="fs-1">{item.icon}</div>
                </Card.Body>
              </Card>
            </Link>

          </Col>
        ))}
        <div>

          {/* List section */}
          <h4 className="text-black">Transaction List</h4>

          <div className="d-flex justify-content-between align-items-start">
            <Tab connectTab={connectTab} />

            {/* Search input aligned to the end */}
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control w-auto me-2"
                style={{ height: '42px', marginTop: '10px' }}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="mt-2 custom-button" onClick={handleShow}>
                <MdFilterList className="fs-3" />
              </Button>

            </div>
          </div>

          <div>
            <Card
              style={{
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                // height: '40vh'
              }}
            >
              <Card.Body className="text-center py-1">

                {activeTab === 0 &&
                  <div>
                    <table className="table table-striped bg-white ">
                      <thead>
                        <tr className="table_header">
                          <th scope="col"><i className="mdi mdi-merge"></i></th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Supplier Name</th>
                          <th scope="col">Code</th>
                          <th scope="col">Stock In</th>
                          <th scope="col">Stock</th>
                        </tr>
                      </thead>
                      {store?.stockinTransListReducer?.loading ? (
                        <tr>
                          <td className='text-center' colSpan={4}>
                            <DashboardLoading />
                          </td>
                        </tr>
                      ) : (
                        <tbody>
                          {StockinData?.length === 0 ? (
                            <tr>
                              <td colSpan={6} className='text-center'>
                                <p className='my-4 py-5'>No stock-in data to show.</p>
                              </td>
                            </tr>
                          ) : (
                            StockinData?.map((data, index) => (
                              <tr key={index} className="text-dark fw-bold text-nowrap highlight-row">
                                <th scope="row">{index + 1}</th>
                                <td className="text-uppercase fw-bold">
                                  {data?.productName || <span className="text-danger">N/A</span>}
                                </td>
                                <td className="text-uppercase fw-bold">
                                  {data?.supplierName !== undefined ? data.supplierName : <span className="text-danger">N/A</span>}
                                </td>
                                <td className="text-uppercase fw-bold">
                                  {data?.code !== undefined ? data.code : <span className="text-danger">N/A</span>}
                                </td>
                                <td className="text-uppercase fw-bold">
                                  {data?.stockIn !== undefined ? data.stockIn : <span className="text-danger">N/A</span>}
                                </td>
                                <td className="text-uppercase fw-bold ">
                                  {data?.stock !== undefined ? data.stock : <span className="text-danger">N/A</span>}
                                </td>
                                <td></td> {/* maintain table structure */}

                                {/* Horizontally centered icons */}
                                <div className="icon-container d-flex  pb-0" >
                                  <span className="icon-wrapper me-4" title="View">
                                    <PiEye className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                  </span>
                                </div>
                              </tr>
                            )))}
                        </tbody>
                      )}
                    </table>
                  </div>
                }
                {activeTab === 1 &&
                  <div>
                    <div>
                      <table className="table table-striped bg-white ">
                        <thead>
                          <tr className="table_header">
                            <th scope="col"><i className="mdi mdi-merge"></i></th>
                            <th scope="col" className="test"> Product Name</th>
                            <th scope="col">Dispatch</th>
                            <th scope="col">Stock</th>
                            {/* <th scope="col">View</th> */}
                          </tr>
                        </thead>
                        {store?.dispatchListReducer?.loading ? (
                          <tr>
                            <td className='text-center' colSpan={4}>
                              <DashboardLoading />
                            </td>
                          </tr>
                        ) : (
                          <tbody>
                            {DispatchData?.length === 0 ? (
                              <tr>
                                <td colSpan={6} className='text-center'>
                                  <p className='my-4 py-5'>No dispatch data to show.</p>
                                </td>
                              </tr>
                            ) : (
                              DispatchData?.map((data, index) => (
                                <tr key={index} className="text-dark fw-bold text-nowrap highlight-row">
                                  <th scope="row">{index + 1}</th>
                                  <td className="text-uppercase fw-bold ">
                                    {data?.productName || <span className="text-danger">N/A</span>}
                                  </td>
                                  <td className="text-uppercase fw-bold ">
                                    {data?.stockOut !== undefined ? data.stockOut : <span className="text-danger">N/A</span>}
                                  </td>
                                  <td className="text-uppercase fw-bold ">
                                    {data?.stock !== undefined ? data.stock : <span className="text-danger">N/A</span>}
                                  </td>
                                  <td ></td>
                                  <div className="icon-container d-flex  pb-0" >
                                    <span className="icon-wrapper me-4" title="View">
                                      <PiEye className="fs-4 text-black" style={{ cursor: 'pointer' }} />
                                    </span>
                                  </div>
                                </tr>
                              )))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                }
              </Card.Body>
            </Card>
          </div>
        </div>
      </Row>
      {/* } */}
      {/* Off Canvas */}
      <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '40rem' }}>
        {/* backdrop="static" */}
        <Offcanvas.Header className="pb-0" closeButton>
          <Offcanvas.Title><TiArrowLeft className="fw-bold fs-3" style={{ cursor: 'pointer' }} onClick={handleClose} />&nbsp;Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          <div>
            <Filter />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Dashboard;
