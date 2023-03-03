import React from 'react'
import { Button, Form } from 'react-bootstrap';
import Loader from '../../shade/Loaders/Loaders';

const InputFields = (props) => {

    let { load, userData, handleSubmit, handleInputChange, getSendAmount } = props;

    return (
        <>
            {load && <Loader />}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group border border-primary rounded">
                    <div className='p-3'>
                        <Form.Label>Available Balance</Form.Label>{" "}
                        <h3>{userData?.balance - (getSendAmount?.amount || 0)}<span>&#8377;</span></h3>
                        <p>This is your current available balance.</p>
                    </div>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label className="">From Address</Form.Label>{" "}
                    <Form.Control
                        className="form-control"
                        id="fromAddress"
                        type="text"
                        value={userData?.email}
                        disabled={true}
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>To Address</Form.Label>{" "}
                    <Form.Control
                        className="form-control"
                        placeholder="Enter your Address"
                        id="toAddress"
                        type="text"
                        value={getSendAmount?.toAddress}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Enter Amount</Form.Label>{" "}
                    <Form.Control
                        className="form-control"
                        placeholder="Enter the Amount"
                        id="amount"
                        type="number"
                        value={getSendAmount?.amount}
                        onChange={handleInputChange}
                        max={userData?.amount}
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

export default InputFields