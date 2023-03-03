import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Alert, Card, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MultiSelect from "react-multiple-select-dropdown-lite";
import { CFormFeedback } from "@coreui/react";

import { useDispatch } from "react-redux";
import {
  loginrequest,
  loginSagaAction,
  UserProfilereq,
} from "../../Store/SagaActions/LoginSagaAction";
import { actionGetDepartmentDetails } from "../../Store/SagaActions/TableSagaAction";
import base64 from "base-64";
import toast from "react-hot-toast";
import Select from "react-select";
import { positions } from "@mui/system";
// import { oneDaySagaAction } from "../../Store/SagaActions/DataSagaActions";

const Login = () => {
  const [code, setCode] = useState("");
  const [load, setLoad] = useState(false);
  const [options, setOptions] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("");
  const dispatch = useDispatch();
  const [smShow, setSmShow] = useState(false);
  const userObj = {
    username: "",
    password: "",
  };
  const [loginObj, setLoginObj] = useState(userObj);

  const [dpvalue, setDpvalue] = useState(false);
  const [validatedCustom, setValidatedCustom] = useState(false);
  const [continueButtonDisable, setcontinueButtonDisable] = useState(false);
  const LoginOptions = [
    { value: "0", label: "UAT" },
    { value: "1", label: "PRODUCTION" },
  ];

  // const LoginIssureOptions = [
  //   { value: "0", label: "LIVQUIK" },
  //   { value: "1", label: "TRANSCORP" },
  // ];

  const [loginoptionState, setLoginOptionState] = useState({
    value: "0",
    label: "UAT",
  });

  // const [issureoptionState, setissureoptionStateState] = useState({
  //   value: "0",
  //   label: "LIVQUIK",
  // });
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("account", "0");
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setLoginObj({ ...loginObj, [name]: value });
  };

  const movetodashboardpage = (e) => {
    setLoad(true);
    e.preventDefault();
    setLoad(true);

    const encodePwd = base64.encode(loginObj?.password);
    const model = {
      username: loginObj.username,
      password: encodePwd,
      callback: loginRespData,
    };
    dispatch(loginrequest(model));
    // dispatch(UserProfilereq());
  };

  const loginRespData = (data) => {
    sessionStorage.setItem("authkey", JSON.stringify(data));
    // sessionStorage.setItem("authkey", data?.authkey);

    if (data?.authkey) {
      setcontinueButtonDisable(true);

      toast.success("Login Success");
      setLoad(false);
      navigate("/dashboard");
    } else if (data?.respcode == "468") {
      viewDemoShow();
    } else {
      setLoad(false);
      toast.error("Invalid Username or Password");
    }
  };

  let viewDemoShow = () => {
    setSmShow(true);
  };
  let viewDemoClose = () => {
    setLoad(false);
    setSmShow(false);
  };

  const handleAccountChange = (e) => {
    setLoginOptionState(e);
    sessionStorage.setItem("account", e.value);
  };
  return (
    <>
      <Modal show={smShow}>
        <Modal.Header>
          <Modal.Title>Already Logged in another Session/Browser.</Modal.Title>
          <Button
            variant=""
            className="btn btn-close"
            onClick={() => {
              viewDemoClose("Basic");
            }}
          >
            <i className="si si-close"></i>
          </Button>
        </Modal.Header>
        <Modal.Body className="d-flex">
          <p>Are you sure you want to continue?</p>
        </Modal.Body>
        <Modal.Footer>
          {/* <link href="#" onClick={(event) => { func1(event); func2();}}>Trigger here</link> */}

          <Button
            style={{ backgroundColor: "#ff6a61" }}
            onClick={(event) => {
              movetodashboardpage(event);
              setcontinueButtonDisable(true);
            }}
            disabled={continueButtonDisable}
          >
            Continue
          </Button>
          {/* <Button
            variant="secondary"
            onClick={() => {
              viewDemoClose("Basic");
            }}
          >
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>

      <div
        className="page"
        style={{ backgroundColor: "#ededf5" }}
        // style={{
        //   backgroundImage: `url("/Images/loginBackground.svg")`,
        //   backgroundPosition: "center",
        //   // backgroundSize: "100% 100%",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        {load && (
          <div className="text-center main-loader">
            <div className="lds-dual-ring"></div>
          </div>
        )}
        <div className="page-single">
          <div className="container">
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={10}
                xs={12}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
              >
                <div
                  className="card-sigin"
                  style={{
                    boxShadow: "0.5px 0.5px 1px 1px lightgrey",
                    paddingBottom: "50px",
                    // position:"absolute",
                    // top:'-25px'
                  }}
                >
                  {/* <!-- Demo content--> */}
                  <div className="main-card-signin d-md-flex ">
                    <div className="wd-100p">
                      <img
                        src="/Images/synizenLogo.svg"
                        className="main-logo  desktop-logo  mt-7"
                        height={290}
                        alt="logo"
                        style={{ width: "40%" }}
                      />
                      <div className="d-flex mb-4"></div>
                      <div className="">
                        <div className="main-signup-header">
                          <h4 style={{ color: "#ff6a61" }}>
                            Welcome To VCIP ID Dashboard
                          </h4>
                          <h6 className="font-weight-semibold mb-4">
                            Please sign in to continue.
                          </h6>
                          <div className="panel panel-primary">
                            <div className=" tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                <Form onSubmit={movetodashboardpage}>
                                  <Form.Group className="form-group">
                                    <Form.Label className="">Email</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Enter your email"
                                      name="username"
                                      type="text"
                                      value={loginObj.username}
                                      onChange={handleUserChange}
                                      required
                                    />
                                  </Form.Group>
                                  <Form.Group className="form-group">
                                    <Form.Label>Password</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Enter your password"
                                      name="password"
                                      type="password"
                                      value={loginObj.password}
                                      onChange={handleUserChange}
                                      required
                                    />
                                  </Form.Group>
                                  {/* <Form.Group className="form-group">
                                    <Select
                                      options={LoginIssureOptions}
                                      // placeholder="Select Account"
                                       //defaultValue={0}
                                       value={issureoptionState}
                                      // onChange={handleAccountChange}
                                    />
                                  </Form.Group> */}

                                  <Form.Group className="form-group">
                                    <Select
                                      options={LoginOptions}
                                      // placeholder="Select Account"
                                      // defaultValue={0}
                                      value={loginoptionState}
                                      onChange={handleAccountChange}
                                    />
                                  </Form.Group>

                                  <Button
                                    variant=""
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    // onClick={movetodashboardpage}
                                  >
                                    Sign In
                                  </Button>

                                  {/* <div className="main-signin-footer text-center mt-3">
                                    <p></p>
                                      <Link to="#" className="mb-3">
                                        Forgot password?
                                      </Link>
                                    </p>
                                  </div> */}
                                </Form>
                                <p
                                  style={{
                                    color: "lightgrey",
                                    position: "absolute",
                                    bottom: "-73px",
                                    right: "0px",
                                  }}
                                >
                                  Powered by<br></br>{" "}
                                  <span style={{ color: "#ff6a61" }}>
                                    {" "}
                                    <img
                                      src="/Images/synizenLogo.svg"
                                      height={45}
                                      className="mobile-logo logo-1 "
                                      alt="logo"
                                      style={{
                                        width: "27%",
                                        marginTop: "-18px",
                                        marginLeft: "8px",
                                      }}
                                    />
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
