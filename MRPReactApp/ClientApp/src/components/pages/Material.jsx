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

function Material() {

    const [TypeAdd, setTypeAdd] = useState([])
    const [SizeAdd, setSizeAdd] = useState([])
    const [MarkAdd, setMarkAdd] = useState([])

    const [IdEdit, setIdEdit] = useState([])
    const [TypeEdit, setTypeEdit] = useState([])
    const [SizeEdit, setSizeEdit] = useState([])
    const [MarkEdit, setMarkEdit] = useState([])


    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const [typeData, setTypeData] = useState([]);
    const [markData, setMarkData] = useState([]);

    const label = "Материал";
    const api = "/api/Materials";

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
                console.log("getData");
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error)
            });
    }


    const handleGetMaterialType = () => {
        fetch("/api/MaterialTypes", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => { return response.json() })
            .then(responseJson => {
                setTypeData(responseJson);
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleGetMarkSteel = () => {
        fetch("/api/MarkSteels", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => { return response.json() })
            .then(responseJson => {
                setMarkData(responseJson);
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error)
            });
    }


    useEffect(() => {
        handleGetData();
        handleGetMaterialType();
        handleGetMarkSteel();
    }, [])


    const handleAdd = () => {
        fetch(api, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: TypeAdd,
                size: SizeAdd,
                mark: MarkAdd
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
                setTypeEdit(responseJson.type);
                setSizeEdit(responseJson.size);
                setMarkEdit(responseJson.mark);
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
                type: TypeEdit,
                size: SizeEdit,
                mark: MarkEdit
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    const clear = () => {
        setTypeAdd('');
        setSizeAdd('');
        setMarkAdd('');

        setTypeEdit('');
        setSizeEdit('');
        setMarkEdit('');

        setIdEdit('');
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Form.Select multiple={false}
                            value={TypeAdd} onChange={(e) => setTypeAdd(e.target.value)}>
                            <option value={null} >Выберите тип</option>
                            {typeData.map((item) => (
                                <option value={item.id} >{item.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите размер"
                            value={SizeAdd} onChange={(e) => setSizeAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Select multiple={false}
                            value={MarkAdd} onChange={(e) => setMarkAdd(e.target.value)}>
                            <option value={null} >Выберите марку стали</option>
                            {markData.map((item) => (
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
                        <th>Тип</th>
                        <th>Размер</th>
                        <th>Марка стали</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.id}</td>
                                <td>{item.typeNavigation.name}</td>
                                <td>{item.size}</td>
                                <td>{item.markNavigation.name}</td>
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
                        <Form.Label>Тип материала</Form.Label>
                        <Form.Select multiple={false}
                            value={TypeEdit} onChange={(e) => setTypeEdit(e.target.value)}>
                            {typeData.map((item) => (
                                <option value={item.id} >{item.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Label>Размер</Form.Label>
                        <Form.Control type="text"
                            value={SizeEdit} onChange={(e) => setSizeEdit(e.target.value)} />
                        <Form.Label>Марка стали</Form.Label>
                        <Form.Select multiple={false}
                            value={MarkEdit} onChange={(e) => setMarkEdit(e.target.value)}>
                            {markData.map((item) => (
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

export default Material;