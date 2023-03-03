import React from "react";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import '../../src/assets/css/style.css';
const ReportCards = (props) => {

  return (
    <Row className="row-sm" style={{ marginTop: "10px" }}>
      <Col xl={4} lg={6} sm={6} md={6}>
        <Card className=" text-center">
          <Card.Body>
            <div className="feature widget-2 text-center mt-0 mb-3">
              <i className="mdi mdi-account-plus  project bg-primary-transparent mx-auto text-info "></i>
            </div>
            <h6 className="mb-1 text-muted"> VCIP ID Created</h6>
            <h3 className="font-weight-semibold"> {props.total_vcips_creations ? props.total_vcips_creations : 0}</h3>
          </Card.Body>
        </Card>

      </Col>
      <Col xl={4} lg={6} sm={6} md={6}>
        <Card className=" text-center">
          <Card.Body>
            <div className="feature widget-2 text-center mt-0 mb-3">
              <i className="mdi mdi-account-settings-variant  project bg-primary-transparent mx-auto  " style={{ color: "#e3a39f" }}></i>
            </div>
            <h6 className="mb-1 text-muted">In Progress</h6>
            <h3 className="font-weight-semibold">  {props?.in_progress ? props.in_progress : 0}</h3>
          </Card.Body>
        </Card>

      </Col>
      {process.env.REACT_APP_ISSURENAME=="livquik"?null:<Col xl={4} lg={6} sm={6} md={6}>
        <Card className=" text-center">
          <Card.Body>
            <div className="feature widget-2 text-center mt-0 mb-3">
              <i className="si si-earphones-alt  project bg-primary-transparent mx-auto text-success "></i>
            </div>
            <h6 className="mb-1 text-muted">Agent Approved</h6>
            <h3 className="font-weight-semibold">  {props?.agent_approved ? props.agent_approved : 0}</h3>
          </Card.Body>
        </Card>

      </Col>}
      <Col xl={4} lg={6} sm={6} md={6}>
        <Card className=" text-center">
          <Card.Body>
            <div className="feature widget-2 text-center mt-0 mb-3">
              <i className="fe fe-phone-off  project bg-primary-transparent mx-auto text-muted "></i>
            </div>
            <h6 className="mb-1 text-muted"> Agent Discrepancy</h6>
            <h3 className="font-weight-semibold">  {props?.agent_descripency ? props.agent_descripency : 0}</h3>
          </Card.Body>
        </Card>

      </Col>
     { process.env.REACT_APP_ISSURENAME=="livquik"?null:<Col xl={4} lg={6} sm={6} md={6}>
        <Card className=" text-center">
          <Card.Body>
            <div className="feature widget-2 text-center mt-0 mb-3">
              <i className="si  si-earphones  project bg-primary-transparent mx-auto text-danger "></i>
            </div>
            <h6 className="mb-1 text-muted">Agent Rejected</h6>
            <h3 className="font-weight-semibold">  {props?.agent_rejected ? props.agent_rejected : 0}</h3>
          </Card.Body>
        </Card>

      </Col>}
      <Col xl={4} lg={6} sm={6} md={6}>
        <Card className=" text-center">
          <Card.Body>
            <div className="feature widget-2 text-center mt-0 mb-3">
              <i className="mdi mdi-account-check  project bg-primary-transparent mx-auto text-success "></i>
            </div>
            <h6 className="mb-1 text-muted">Auditor Approved</h6>
            <h3 className="font-weight-semibold">  {props?.auditor_approved ? props.auditor_approved : 0}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={4} lg={6} sm={6} md={6}>
        <Card className=" text-center">
          <Card.Body>
            <div className="feature widget-2 text-center mt-0 mb-3">
              <i className="mdi mdi-account-alert project bg-primary-transparent mx-auto text-warning "></i>
            </div>
            <h6 className="mb-1 text-muted">Auditor Pending</h6>

            {/* <h3 className="font-weight-semibold"> {`${(+props?.agent_approved) + (+props?.agent_rejected)}`}</h3> */}
            <h3 className="font-weight-semibold"> {props?.auditor_pending ? props.auditor_pending : 0}</h3>

          </Card.Body>
        </Card>
      </Col>
      <Col xl={4} lg={6} sm={6} md={6}>
        <Card className=" text-center">
          <Card.Body>
            <div className="feature widget-2 text-center mt-0 mb-3">
              <i className="mdi mdi-account-remove  project bg-primary-transparent mx-auto text-danger"></i>
            </div>
            <h6 className="mb-1 text-muted">Auditor Rejected</h6>
            <h3 className="font-weight-semibold">{props?.auditor_rejected ? props.auditor_rejected : 0}</h3>
          </Card.Body>
        </Card>
      </Col>

    </Row>
  );
};

export default ReportCards;
