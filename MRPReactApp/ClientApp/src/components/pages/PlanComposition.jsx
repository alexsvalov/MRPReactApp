import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";


function PlanComposition() {

    console.log(useParams());
    const { id } = useParams();

    const [data, setData] = useState([]);

    const api = "/api/PlanCompositions";

    const handleGetData = (id) => {
        fetch(`/api/PlanCompositionsFilter/${id}`, {
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


    const handleDelete = (id_delete) => {
        if (window.confirm("Вы уверены что хотите удалить элемент?")) {
            fetch(`${api}/${id_delete}`, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(() => handleGetData(id))
                .then(response => response.json())
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    const formatDate = (d) => {
        return new Date(d).toLocaleDateString()
    }

    return (
        <div>
            <Container>
                <Row>
                    <div>Продукт {id}</div>
                    <Link to={`/add-plan-order/${id}`}>
                        <Button variant="primary" >Добавить заказ</Button>
                    </Link>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>План</th>
                        <th>Номер заказа</th>
                        <th>Дата заказа</th>
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
                                <td>{item.planProduct}</td>
                                <td>{item.orderProductNavigation.orderNumber}</td>
                                <td>{formatDate(item.orderProductNavigation.orderDate)}</td>
                                <td>{item.orderProductNavigation.customerNavigation.name}</td>
                                <td align="right">
                                    <Stack direction="horizontal" gap={3}>
                                        < Button variant="danger"
                                            onClick={() => handleDelete(item.id)} >Удалить</Button>
                                    </Stack>
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

export default PlanComposition;