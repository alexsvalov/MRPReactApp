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


function AddOrderToPlan() {

    console.log(useParams());
    let { id } = useParams();

    const [data, setData] = useState([]);

    const handleGetData = () => {
        fetch(`/api/AddOrderToPlan/${id}`, {
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
        handleGetData();
    }, [])


    const handleAdd = (item) => {
        fetch(`/api/PlanCompositions`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                planProduct: Number(id),
                orderProduct: item
            }),
        })
            .then(response => response.json())
            .then(() => handleGetData())
            .catch((error) => {
                console.log(error)
            });
    }

    const formatDate = (d) => {
        return new Date(d).toLocaleDateString()
    }

    return (
        <div>
            <Container>
                <Row>
                    <div>Продукт {id}</div>
                </Row>

                <Link to={`/plan-composition/${id}`}>
                    <Button variant="primary" >Состав плана</Button>
                </Link>

            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Номер заказа</th>
                        <th>Дата заказа</th>
                        <th>Дата выполнения заказа</th>
                        <th>Заказчик</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.id}</td>
                                <td>{item.orderNumber}</td>
                                <td>{formatDate(item.orderDate)}</td>
                                <td>{formatDate(item.executionDate)}</td>
                                <td>{item.customerNavigation.name}</td>
                                <td>
                                    < Button variant="success" onClick={() => handleAdd(item.id)} >Добавить</Button>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default AddOrderToPlan;

