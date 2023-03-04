import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginrequest,
  registerUserAction,
} from "../../Store/SagaActions/LoginSagaAction";
import toast from "react-hot-toast";

const Login = () => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const [smShow, setSmShow] = useState(false);
  const userObj = {
    email: "",
    password: "",
  };
  const registerObject = {
    email: "",
    password: "",
    name: "",
    address: "",
    confirmPassword: ""
  }
  const [loginObj, setLoginObj] = useState(userObj);
  const [register, setRegister] = useState(registerObject);
  const [error, showError] = useState("");



  const [registerHere, setRegisterHere] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("account", "0");
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    showError("");
    setLoginObj({ ...loginObj, [name]: value });
  };

  const handleRegisterChange = (e) => {

    const { name, value } = e.target;
    showError("");
    setRegister({ ...register, [name]: value });
  }

  const handleRegisterHereClick = (isRegister = false) => {
    setLoginObj({})
    showError("");
    setRegisterHere(isRegister);
  }

  const movetodashboardpage = (e) => {
    // setLoad(true);
    e.preventDefault();
    setLoad(true);
    const model = {
      email: loginObj.email,
      password: loginObj?.password,
    };
    dispatch(loginrequest({ model, callback: loginRespData }));
  };

  const loginRespData = (data, error) => {
    sessionStorage.setItem("authkey", JSON.stringify(data));
    if (error) {
      toast.error(data?.data?.message);
      setLoad(false);
      return;
    }
    if (data?.data?.message && data.data.status !== 200) {
      toast.error(data?.data?.message);
    } else if (data?.data?.status === 200) {
      toast.success(data?.data?.message)
      sessionStorage.setItem("token", data?.data?.data?.token);
      navigate("dashboard/");
    }
    setLoad(false);
    // if()
  };

  const moveToLoginPage = (e) => {
    // navigate('/login');
    // return;
    e.preventDefault();
    if (register.password !== register.confirmPassword) {
      showError("Password doesn't match")
      return;
    }
    setLoad(true);
    e.preventDefault();
    const registerModel = {
      email: register.email,
      password: register.password,
      name: register.name,
      address: register.address,
    }
    dispatch(registerUserAction({ model: registerModel, callback: registerRespData }))

  }

  const registerRespData = (data, error) => {
    if (error) {
      toast.error(data?.data?.message);
      setLoad(false);
      return;
    }
    if (data?.data?.message && data.data.status !== 200) {
      toast.error(data?.data?.message);
    } else if (data?.data?.status === 200) {
      toast.success(data?.data?.message);
      // navigate('/login');
      setRegisterHere(false)
    }
    setLoad(false);
  }

  // const getUserInfo = () =>{
  //     axios
  //       .get("https://d33rdsqeflhtup.cloudfront.net/profile")
  //       .then((response) => {
  //         return response}
  //       )
  //       .then((users) => {
  //         // this.setState({ users, isLoading: false });
  //       })
  //       .catch((error) => this.setState({ error, isLoading: false }));
  // }


  const isRegisterDisabled = () => {
    return !register.email ||
      !register.password ||
      !register.name ||
      !register.address ||
      !register.confirmPassword
  }


  return (
    <>

      <div
        className="page"
        style={{ backgroundColor: "#ededf5" }}
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
                      <div className="">
                        {!registerHere ? <div className="main-signup-header ">
                          <h4 style={{ color: "#ff6a61" }} className="text-center">
                            Welcome To Tide Bank
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
                                      name="email"
                                      type="text"
                                      value={loginObj.email}
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

                                  <Button
                                    variant=""
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={!loginObj.password || !loginObj.email}
                                  >
                                    Sign In
                                  </Button>

                                  <div className="main-signin-footer text-center mt-3">
                                    <p onClick={() => handleRegisterHereClick(true)} role="button" >
                                      {/* <Link to="#" className="mb-3"> */}
                                      Do not have account?. <span style={{ color: "#ff9f99" }}>Register Here</span>
                                      {/* </Link> */}
                                    </p>

                                  </div>
                                </Form>

                              </div>
                            </div>
                          </div>
                        </div>
                          :
                          <div className="main-signup-header ">
                            {/* <h4 style={{ color: "#ff6a61" }} className="text-center">
                            Welcome To Tide Bank
                          </h4> */}
                            <h4 style={{ color: "#ff6a61" }} className="text-center">
                              Register Here
                            </h4>
                            <div className="panel panel-primary">
                              <div className=" tab-menu-heading mb-2 border-bottom-0">
                                <div className="tabs-menu1">
                                  <Form onSubmit={moveToLoginPage}>
                                    <Form.Group className="form-group">
                                      <Form.Label className="">Name *</Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your email"
                                        name="name"
                                        type="text"
                                        value={register.name}
                                        onChange={handleRegisterChange}
                                        required
                                      />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                      <Form.Label className="">Address *</Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your email"
                                        name="address"
                                        type="text"
                                        value={register.address}
                                        onChange={handleRegisterChange}
                                        required
                                      />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                      <Form.Label className="">Email *</Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your email"
                                        name="email"
                                        type="text"
                                        value={register.email}
                                        onChange={handleRegisterChange}
                                        required
                                      />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                      <Form.Label>Password *</Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your password"
                                        name="password"
                                        type="password"
                                        value={register.password}
                                        onChange={handleRegisterChange}
                                        required
                                      />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                      <Form.Label>Confirm Password *</Form.Label>{" "}
                                      <Form.Control
                                        className="form-control"
                                        placeholder="Enter your password"
                                        name="confirmPassword"
                                        type="password"
                                        value={register.confirmPassword}
                                        onChange={handleRegisterChange}
                                        required
                                      />
                                    </Form.Group>
                                    {error && <p style={{ color: "#f00101" }} className="text-center">

                                      {error}
                                    </p>}

                                    <Button
                                      variant=""
                                      type="submit"
                                      className="btn btn-primary btn-block"
                                      disabled={isRegisterDisabled()}
                                    >
                                      Register
                                    </Button>

                                    <div className="main-signin-footer text-center mt-3" role="button" >
                                      <p onClick={() => handleRegisterHereClick(false)}>
                                        Sign In
                                      </p>

                                    </div>
                                  </Form>
                                </div>
                              </div>
                            </div>
                          </div>}

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
