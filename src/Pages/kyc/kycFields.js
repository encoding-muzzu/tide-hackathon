import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Loader from '../../shade/Loaders/Loaders';

const KycFields
    = (props) => {

        let { load, kycData, handleSubmit, handleInputChange, getSendAmount } = props;

        return (
            <>
                {load && <Loader />}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-group border border-primary rounded">
                        <div className='p-3'>
                            <p>Please complete your KYC.</p>
                        </div>
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label className="">Full Name</Form.Label>{" "}
                        <Form.Control
                            className="form-control"
                            placeholder="Enter your Full Name"
                            id="fullName"
                            type="text"
                            value={kycData?.fullName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Gender</Form.Label>{" "}
                        <Form.Control
                            className="form-control"
                            placeholder="Enter your Address"
                            id="gender"
                            type="text"
                            value={kycData?.gender}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Date of Birth</Form.Label>{" "}
                        <Form.Control
                            className="form-control"
                            placeholder="Enter the DOB"
                            id="amount"
                            type="date"
                            value={kycData?.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Care of </Form.Label>{" "}
                        <Form.Control
                            className="form-control"
                            placeholder="Enter your care of"
                            id="careof"
                            type="text"
                            value={kycData?.careof}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Address </Form.Label>{" "}
                        <Form.Control
                            className="form-control"
                            placeholder="Enter your care of"
                            id="address"
                            type="text"
                            value={kycData?.address}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Aadhaar Number</Form.Label>{" "}
                        <Form.Control
                            className="form-control"
                            placeholder="Enter Aadhaar"
                            id="aadhaar"
                            type="text"
                            value={kycData?.aadhaar}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Pan Number</Form.Label>{" "}
                        <Form.Control
                            className="form-control"
                            placeholder="Enter Aadhaar"
                            id="pan"
                            type="text"
                            value={kycData?.pan}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>



                    <Button
                        variant=""
                        type="submit"
                        className="btn btn-primary btn-block"
                    // disabled={!loginObj.password || !loginObj.email}
                    >
                        Pay
                    </Button>

                </Form>

            </>
        )
    }

export default KycFields



/* 
    heading Details as per aadhaar
    fullname input
    gender input
    dob input
    careof input (ex father)
    address input
    aaddhar input
    pan input

*/