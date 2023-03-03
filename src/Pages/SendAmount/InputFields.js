import React from 'react'
import { Button, Form } from 'react-bootstrap';

const InputFields = (props) => {

    let { isDisabled, fromAddress, handleSubmit, errors, handleInputChange, getSendAmount, btnName, handleFormSubmit, handleDropDownChange } = props;
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                    <Form.Label className="">From Address</Form.Label>{" "}
                    <Form.Control
                        className="form-control"
                        // placeholder="Enter your email"
                        id="fromAddress"
                        type="text"
                        value={fromAddress}
                        disabled={true}
                    // onChange={handleUserChange}
                    // required
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
                <Form.Group className="form-group border border-primary rounded">
                    <div className='p-3'>
                        <Form.Label>Amount</Form.Label>{" "}
                        <h3>300<span>&#8377;</span></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, beatae.</p>
                    </div>
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