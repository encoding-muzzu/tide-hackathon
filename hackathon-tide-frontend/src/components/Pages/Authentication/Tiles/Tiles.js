import React from 'react';
import { Breadcrumb, Card, Col, ProgressBar, Row } from "react-bootstrap";

const Tiles = (props) => {

  return (

         <Row className="row-sm">
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card>
            <Card.Body className="iconfont text-start cursor-pointer" onClick={props?.tilesClicked}>
              <div className="d-flex justify-content-between">
                <h4 className="card-title mb-3">Total</h4>
              </div>
              <div className="d-flex mb-0" style={{ margin: "-5px" }}>
                <div className="">
                  <h4 className="mb-1 font-weight-bold" style={{ marginLeft: "4px" }}>
                    70393
                    {/* <span className="text-success tx-13 ms-2">(+0.98%)</span> */}
                  </h4>
                </div>
                <div className="card-chart ms-auto mt-0" style={{
                  width: "86px",
                  borderRadius: "5px",
                  boxShadow: "2px 1px 7px rgb(154 154 204 / 10%)",
                }}>
                 <img src="/Images/TotalStaff.png" />
                </div>
              </div>

              <div className="progress progress-sm" style={{ marginTop: "-18px", width: "50%" }}>
                <ProgressBar
                  now={70}
                  variant="teal"
                  className="progress-bar bg-teal wd-100p"
                  role="progressbar"
                ></ProgressBar>
              </div>
              <small className="mb-0 mt-2 text-muted">
                {/* Monthly */}
                <span className="float-start text-muted">100%</span>
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card>
            <Card.Body className="iconfont text-start cursor-pointer" onClick={props?.tilesClicked}>
              <div className="d-flex justify-content-between">
                <h4 className="card-title mb-3">Aprooved</h4>
              </div>
              <div className="d-flex mb-0" style={{ margin: "-5px" }}>
                <div className="">
                  <h4 className="mb-1 font-weight-bold"  style={{ marginLeft: "4px" }}>
                    58627
                    {/* <span className="text-danger tx-13 ms-2 ">(-16.71%)</span> */}
                  </h4>
                </div>
                <div className="card-chart ms-auto mt-0" style={{
                  width: "86px",
                  borderRadius: "5px",
                  boxShadow: "2px 1px 7px rgb(154 154 204 / 10%)",
                }}>
                    <img src="/Images/EnrolledStaff.png" />
                </div>
              </div>

              <div className="progress progress-sm" style={{ marginTop: "-18px", width: "50%" }}>
                <ProgressBar
                  now={83}
                  variant="primary"
                  className="progress-bar bg-primary wd-80p"
                  role="progressbar"
                ></ProgressBar>
              </div>
              <small className="mb-0  text-muted">
                {/* Monthly */}
                <span className="float-start text-muted ">83.29%</span>
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card>
            <Card.Body className="iconfont text-start cursor-pointer" onClick={props?.tilesClicked}>
              <div className="d-flex justify-content-between">
                <h4 className="card-title mb-3">Rejected</h4>
              </div>
              <div className="d-flex mb-0" style={{ margin: "-5px" }}>
                <div className="">
                  <h4 className="mb-1 font-weight-bold" style={{ marginLeft: "4px" }}>
                    11766
                    {/* <span className="text-danger tx-13 ms-2">(-83.29%)</span> */}
                  </h4>
                  
                </div>
                <div className="card-chart ms-auto mt-0"  style={{
                  width: "86px",
                  borderRadius: "5px",
                  boxShadow: "2px 1px 7px rgb(154 154 204 / 10%)",
                }}>
                    <img src="/Images/NotEnrolledStaff.png" />
                </div>
              </div>

              <div className="progress progress-sm" style={{ marginTop: "-18px", width: "50%" }}>
                {/* <ProgressBar
                  now={60}
                  variant="danger"
                  className="progress-bar bg-danger wd-20p"
                  role="progressbar"
                ></ProgressBar> */}
              </div>
              <small className="mb-0  text-muted">
                <span className="float-start text-muted">16.71%</span>
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>


  )
}


export default Tiles;
