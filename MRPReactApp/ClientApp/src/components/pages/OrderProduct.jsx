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


function OrderProduct() {

    const [OrderNumberAdd, setOrderNumberAdd] = useState([])
    const [OrderDateAdd, setOrderDateAdd] = useState([])
    const [ExecutionDateAdd, setExecutionDateAdd] = useState([])
    const [CustomerAdd, setCustomerAdd] = useState([])


    const [IdEdit, setIdEdit] = useState([])
    const [OrderNumberEdit, setOrderNumberEdit] = useState([])
    const [OrderDateEdit, setOrderDateEdit] = useState([])
    const [ExecutionDateEdit, setExecutionDateEdit] = useState([])
    const [CustomerEdit, setCustomerEdit] = useState([])

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const [customer, setCustomer] = useState([]);

    const label = "Заказ";
    const api = "/api/OrderProducts";

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        handleGetData();
    }

    const handleGetData = () => {
        fetch(api, {
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

    const handleGetCustomer = () => {
        fetch("/api/Customers", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => { return response.json() })
            .then(responseJson => {
                setCustomer(responseJson);
                console.log("Customer");
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error)
            });
    }



    useEffect(() => {
        handleGetData();
        handleGetCustomer();
    }, [])


    const handleAdd = () => {
        fetch(api, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderNumber: OrderNumberAdd,
                orderDate: OrderDateAdd,
                executionDate: ExecutionDateAdd,
                customer: CustomerAdd
            }),
        })
            .then(response => response.json())
            .then(() => handleGetData())
            .catch((error) => {
                console.log(error)
            });
        clear();
    }

    const handleEdit = (id) => {
        fetch(`${api}/${id}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setOrderNumberEdit(responseJson.orderNumber);
                setOrderDateEdit(new Date(responseJson.orderDate));
                setExecutionDateEdit(responseJson.executionDate);
                setCustomerEdit(responseJson.customer);
                setIdEdit(id);
            })
            .catch((error) => {
                console.log(error)
            });
        handleShow();

        console.log("OrderDateEdit")
        console.log(OrderDateEdit)
    }

    const handleDelete = (id) => {
        if (window.confirm("Вы уверены что хотите удалить элемент?")) {
            fetch(`${api}/${id}`, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(() => handleGetData())
                .then(response => response.json())
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    const handleUpdate = (id) => {
        fetch(`${api}/${id}`, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                orderNumber: OrderNumberEdit,
                orderDate: OrderDateEdit,
                executionDate: ExecutionDateEdit,
                customer: CustomerEdit
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    const clear = () => {
        setOrderNumberAdd('');
        setOrderDateAdd('');
        setExecutionDateAdd('');
        setCustomerAdd('');

        setOrderNumberEdit('');
        setOrderDateEdit('');
        setExecutionDateEdit('');
        setCustomerEdit('');

        setIdEdit('');
    }

    const formatDate = (d) => {
        return new Date(d).toLocaleDateString()
    }

    const formatDateEdit = (d) => {
        return new Date(d).toLocaleDateString('en-CA')
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите номер заказа"
                            value={OrderNumberAdd} onChange={(e) => setOrderNumberAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="date" className="form-control" placeholder="Введите дату заказа"
                            value={OrderDateAdd} onChange={(e) => setOrderDateAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="date" className="form-control" placeholder="Введите дату выполнения заказа"
                            value={ExecutionDateAdd} onChange={(e) => setExecutionDateAdd(e.target.value)} />
                    </Col>

                    <Col>
                        <Form.Select multiple={false}
                            value={CustomerAdd} onChange={(e) => setCustomerAdd(e.target.value)}>
                            <option value={null} >Выберите заказчика</option>
                            {customer.map((item) => (
                                <option value={item.id} >{item.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        < Button variant="success" onClick={() => handleAdd()}>Добавить</Button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Номер</th>
                        <th>Дата</th>
                        <th>Дата выполнения</th>
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
                                <td align="right">
                                    <Stack direction="horizontal" gap={3}>
                                        < Button variant="primary"
                                            onClick={() => handleEdit(item.id)}>Изменить</Button>
                                        < Button variant="danger"
                                            onClick={() => handleDelete(item.id)} >Удалить</Button>
                                        <Link to={`/order-composition/${item.id}`}>
                                            <Button variant="primary" >Состав</Button>
                                        </Link>
                                    </Stack>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Номер заказа</Form.Label>
                        <Form.Control type="text"
                            value={OrderNumberEdit} onChange={(e) => setOrderNumberEdit(e.target.value)} />
                        <Form.Label>Дата заказа</Form.Label>
                        <Form.Control type="date"
                            value={formatDateEdit(OrderDateEdit)} onChange={(e) => setOrderDateEdit(e.target.value)} />
                        <Form.Label>Дата выполнения заказа</Form.Label>
                        <Form.Control type="date"
                            value={formatDateEdit(ExecutionDateEdit)} onChange={(e) => setExecutionDateEdit(e.target.value)} />
                        <Form.Label>Заказчик</Form.Label>
                        <Form.Select multiple={false}
                            value={CustomerEdit} onChange={(e) => setCustomerEdit(e.target.value)}>
                            {customer.map((item) => (
                                <option value={item.id} >{item.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate(IdEdit)}>
                        Изменить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default OrderProduct;