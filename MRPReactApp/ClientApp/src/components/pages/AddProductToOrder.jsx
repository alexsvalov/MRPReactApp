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


function AddProductToOrder() {

    console.log(useParams());
    let { id } = useParams();

    const [data, setData] = useState([]);
    const [dataQuantity, setDataQuantity] = useState(data)


    const handleGetData = () => {
        fetch(`/api/AddProductToOrder/${id}`, {
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
        fetch(`/api/OrderCompositions`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderProduct: Number(id),
                product: item,
                quantity: dataQuantity.toReversed().find(i => i.component == item).quantity
            }),
        })
            .then(response => response.json())
            .then(() => handleGetData())
            .catch((error) => {
                console.log(error)
            });
    }


    return (
        <div>
            <Container>
                <Row>
                    <div>Продукт {id}</div>
                </Row>

                <Link to={`/order-composition/${id}`}>
                    <Button variant="primary" >Спецификация заказа</Button>
                </Link>

            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Обозначение</th>
                        <th>Наименование</th>
                        <th>Тип изделия</th>
                        <th>Вид изделия</th>
                        <th>Покупное изделие</th>
                        <th>Количество</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.id}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.typeNavigation.name}</td>
                                <td>{(item.kindNavigation != null) ? item.kindNavigation.name : null}</td>
                                <td>
                                    <Form.Check
                                        checked={item.purchase} disabled='true' />
                                </td>
                                <td>
                                    <input type="number" className="form-control"
                                        onChange={(e) => {
                                            setDataQuantity(prevState => [...prevState, {
                                                component: item.id,
                                                quantity: e.target.value
                                            }]);
                                            console.log(dataQuantity)
                                        }} />
                                </td>
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

export default AddProductToOrder;