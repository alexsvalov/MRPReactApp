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


function Specification() {

    console.log(useParams());
    const { id } = useParams();

    const [IdEdit, setIdEdit] = useState([])
    const [ProductEdit, setProductEdit] = useState([])
    const [ComponentEdit, setComponentEdit] = useState([])
    const [QuantityEdit, setQuantityEdit] = useState([])

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const label = "Спецификация";
    const api = "/api/Specifications";

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        handleGetData(id);
    }

    const handleGetData = (id) => {
        fetch(`/api/SpecificationsFilter/${id}`, {
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

    const handleEdit = (id) => {
        fetch(`${api}/${id}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setProductEdit(responseJson.product);
                setComponentEdit(responseJson.component);
                setQuantityEdit(responseJson.quantity);

                setIdEdit(id);
            })
            .catch((error) => {
                console.log(error)
            });
        handleShow();
    }

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

    const handleUpdate = (id) => {
        fetch(`${api}/${id}`, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                product: ProductEdit,
                component: ComponentEdit,
                quantity: QuantityEdit
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    const clear = () => {
        setProductEdit('');
        setComponentEdit('');
        setQuantityEdit('');

        setIdEdit('');
    }

    return (
        <div>
            <Container>
                <Row>
                    <div>Продукт {id}</div>
                    <Link to={`/add-product/${id}`}>
                        <Button variant="primary" >Добавить изделие</Button>
                    </Link>
                </Row>
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
                                <td>{item.componentNavigation.code}</td>
                                <td>{item.componentNavigation.name}</td>
                                <td>{item.componentNavigation.typeNavigation.name}</td>
                                <td>{(item.componentNavigation.kindNavigation != null)
                                    ? item.componentNavigation.kindNavigation.name : null}</td>

                                <td>
                                    <Form.Check
                                        checked={item.componentNavigation.purchase} disabled='true' />
                                </td>


                                {/*<td>{(item.componentNavigation.purchase != null)*/}
                                {/*    ? item.componentNavigation.purchase : null}</td>*/}
                                <td>{item.quantity}</td>
                                <td align="right">
                                    <Stack direction="horizontal" gap={3}>
                                        < Button variant="primary"
                                            onClick={() => handleEdit(item.id)}>Изменить</Button>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Количество</Form.Label>
                        <Form.Control type="text"
                            value={QuantityEdit} onChange={(e) => setQuantityEdit(e.target.value)} />
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

export default Specification;