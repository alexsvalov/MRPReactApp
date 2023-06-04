import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


function ReportBlanks() {

    console.log(useParams());
    let { id } = useParams();

    const [data, setData] = useState([]);

    const handleGetData = (id) => {
        fetch(`/api/ReportBlanksInPlan/${id}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => { return response.json() })
            .then(responseJson => {
                setData(responseJson);
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        handleGetData(id);
    }, [])


    return (
        <div>
            <Container>
                <Row>
                    <div>Продукт {id}</div>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Материал</th>
                        <th>Количество</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.id}</td>
                                <td>{item.material}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default ReportBlanks;
