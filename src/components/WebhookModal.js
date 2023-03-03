import React from "react";
import { Button, Card, Col, Modal, ProgressBar, Row } from "react-bootstrap";
import ReportTable from "./Pages/Authentication/ReportTable"
import { useState } from "react";


const WebhookModal = (props) => {
    console.log(props.modalData1)
    var columns
    var tabledata
    const [data, setdisplayData] = useState([])
    const [columndata, setcdisplayData] = useState([])
    if (props.modalData1 && props.modalData1.length > 0) {
        var { accname, datecreated, dateupdated, vcipid, mobilenumber, type, eventtype, eventremark, m2ptoken, eventstatus } = props.modalData1
    }


    const colorStyle = {
        textAlign: "center", maxWidth: 250, textOverflow: 'clip', overflow: 'scroll'
    }
    return (


        <Col lg={4} md={6} sm={4}>
            {props.modalData1 && props.modalData1.length > 0 ?

                <Modal
                    style={{ width: "100%" }}
                    size="lg"
                    show={props.state}

                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header>
                        <Modal.Title>Webhook Details</Modal.Title>
                        <Button
                            variant=""
                            className="btn btn-close ms-auto"
                            onClick={() => props.setState(false)}
                        >
                            <i className="si si-close"></i>
                        </Button>
                    </Modal.Header>
                    <Modal.Body style={{ overflow: "scroll" }}>
                        <div className="table table-bordered">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Account Name</th>
                                        <th scope="col">VCIP Id</th>
                                        <th scope="col">Date Created</th>
                                        <th scope="col">Date Updated</th>
                                        <th scope="col">Event <br></br>Type</th>
                                        <th scope="col">Event Status</th>
                                        <th scope="col">Event Remark</th>
                                        <th scope="col">M2P <br></br> Token</th>
                                        <th scope="col">Contact Number</th>
                                        <th scope="col">Type</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {props.modalData1.map((tableData) => {
                                        return (
                                            <tr>
                                                <td style={colorStyle}>{tableData.accname}</td>
                                                <td style={colorStyle}>{tableData.vcipid}</td>
                                                <td style={colorStyle}>{tableData.datecreated}</td>
                                                <td style={colorStyle}>{tableData.dateupdated}</td>
                                                <td style={colorStyle}>{tableData.eventtype}</td>
                                                <td style={colorStyle}>{tableData.eventstatus}</td>
                                                <td style={colorStyle}>{tableData.eventremark}</td>
                                                <td style={colorStyle}>{tableData.m2ptoken}</td>
                                                <td style={colorStyle}>{tableData.mobilenumber}</td>
                                                <td style={colorStyle}>{tableData.type}</td>
                                            </tr>

                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>


                    </Modal.Footer>
                </Modal>

                : <Modal
                    style={{ width: "100%" }}
                    size="lg"
                    show={props.state}

                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header>
                        <Modal.Title>Webhook Details</Modal.Title>
                        <Button
                            variant=""
                            className="btn btn-close ms-auto"
                            onClick={() => props.setState(false)}
                        >
                            <i className="si si-close"></i>
                        </Button>
                    </Modal.Header>
                    <Modal.Body style={{ overflow: "scroll" }}>
                        <div className="table table-bordered">
                            <table>

                                <tbody>
                                    <tr>
                                        <td style={colorStyle}>No Data Found</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>


                    </Modal.Footer>
                </Modal>}


        </Col >


    )
}
export default WebhookModal;