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

function PlanProduct() {

    const [VersionAdd, setVersionAdd] = useState(null)
    const [PlanDateAdd, setPlanDateAdd] = useState([])

    const [IdEdit, setIdEdit] = useState([])
    const [VersionEdit, setVersionEdit] = useState(null)
    const [PlanDateEdit, setPlanDateEdit] = useState([])

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const label = "План производства";
    const api = "/api/PlanProducts";

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

    useEffect(() => {
        handleGetData();
    }, [])


    const handleAdd = () => {
        fetch(api, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version: VersionAdd,
                planDate: PlanDateAdd
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
                setVersionEdit(responseJson.version);
                setPlanDateEdit(responseJson.planDate);
                setIdEdit(id);
            })
            .catch((error) => {
                console.log(error)
            });
        handleShow();
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
                version: VersionEdit,
                planDate: PlanDateEdit
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    const clear = () => {
        setVersionAdd('');
        setPlanDateAdd('');

        setVersionEdit('');
        setPlanDateEdit('');
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
                        <input type="text" className="form-control" placeholder="Введите версию плана"
                            value={VersionAdd} onChange={(e) => setVersionAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="date" className="form-control" placeholder="Введите дату плана"
                            value={PlanDateAdd} onChange={(e) => setPlanDateAdd(e.target.value)} />
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
                        <th>Версия</th>
                        <th>Дата</th>
                        <th>Действие</th>
                        <th>Отчетность</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.id}</td>
                                <td>{item.version}</td>
                                <td>{formatDate(item.planDate)}</td>
                                <td align="right">
                                    <Stack direction="horizontal" gap={3}>
                                        < Button variant="primary"
                                            onClick={() => handleEdit(item.id)}>Изменить</Button>
                                        < Button variant="danger"
                                            onClick={() => handleDelete(item.id)} >Удалить</Button>
                                        <Link to={`/plan-composition/${item.id}`}>
                                            <Button variant="primary" >Состав</Button>
                                        </Link>
                                    </Stack>
                                </td>
                                <td>
                                    <Stack direction="horizontal" gap={3}>

                                    <Link to={`/report-product/${item.id}`}>
                                            <Button variant="secondary" >Изделия</Button>
                                    </Link>

                                    <Link to={`/report-details/${item.id}`}>
                                            <Button variant="secondary" >Детали</Button>
                                        </Link>

                                        <Link to={`/report-purchases/${item.id}`}>
                                            <Button variant="secondary" >Покупные изделия</Button>
                                        </Link>


                                        <Link to={`/report-blanks/${item.id}`}>
                                            <Button variant="secondary" >Заготовки</Button>
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
                        <Form.Label>Версия</Form.Label>
                        <Form.Control type="text"
                            value={VersionEdit} onChange={(e) => setVersionEdit(e.target.value)} />
                        <Form.Label>Дата</Form.Label>
                        <Form.Control type="date"
                            value={formatDateEdit(PlanDateEdit)} onChange={(e) => setPlanDateEdit(e.target.value)} />
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

export default PlanProduct;