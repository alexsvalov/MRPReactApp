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

function Customer() {

    const [InnAdd, setInnAdd] = useState(null)
    const [NameAdd, setNameAdd] = useState([])
    const [AddressAdd, setAddressAdd] = useState([])
    const [PhoneAdd, setPhoneAdd] = useState([])
    const [EmailAdd, setEmailAdd] = useState([])
    const [ContactAdd, setContactAdd] = useState([])

    const [IdEdit, setIdEdit] = useState([])
    const [InnEdit, setInnEdit] = useState([])
    const [NameEdit, setNameEdit] = useState([])
    const [AddressEdit, setAddressEdit] = useState([])
    const [PhoneEdit, setPhoneEdit] = useState([])
    const [EmailEdit, setEmailEdit] = useState([])
    const [ContactEdit, setContactEdit] = useState([])

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const label = "Заказчик";
    const api = "/api/Customers";

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        handleGetData();
    }

    const handleGetData = () => {
        fetch( api , {
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




    const handleAdd = () => {
        fetch( api , {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inn: InnAdd,
                name: NameAdd,
                address: AddressAdd,
                phone: PhoneAdd,
                email: EmailAdd,
                contact: ContactAdd
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
                setInnEdit(responseJson.inn);
                setNameEdit(responseJson.name);
                setAddressEdit(responseJson.address);
                setPhoneEdit(responseJson.phone);
                setEmailEdit(responseJson.email);
                setContactEdit(responseJson.contact);
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

    useEffect(() => {
        handleGetData();
    }, [])


    const handleUpdate = (id) => {
        fetch(`${api}/${id}`, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                inn: InnEdit,
                name: NameEdit,
                address: AddressEdit,
                phone: PhoneEdit,
                email: EmailEdit,
                contact: ContactEdit
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    const clear = () => {
        setInnAdd('');
        setNameAdd('');
        setAddressAdd('');
        setPhoneAdd('');
        setEmailAdd('');
        setContactAdd('');

        setInnEdit('');
        setNameEdit('');
        setAddressEdit('');
        setPhoneEdit('');
        setEmailEdit('');
        setContactEdit('');

        setIdEdit('');
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите ИНН"
                            value={InnAdd} onChange={(e) => setInnAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите наименование"
                            value={NameAdd} onChange={(e) => setNameAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите адрес"
                            value={AddressAdd} onChange={(e) => setAddressAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите телефон"
                            value={PhoneAdd} onChange={(e) => setPhoneAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите e-mail"
                            value={EmailAdd} onChange={(e) => setEmailAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите контактное лицо"
                            value={ContactAdd} onChange={(e) => setContactAdd(e.target.value)} />
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
                        <th>ИНН</th>
                        <th>Наименование</th>
                        <th>Адрес</th>
                        <th>Телефон</th>
                        <th>e-mail</th>
                        <th>Контактное лицо</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.id}</td>
                                <td>{item.inn}</td>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
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
                        <Form.Label>ИНН</Form.Label>
                        <Form.Control type="text"
                            value={InnEdit} onChange={(e) => setInnEdit(e.target.value)} />
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control type="text"
                            value={NameEdit} onChange={(e) => setNameEdit(e.target.value)} />
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control type="text"
                            value={AddressEdit} onChange={(e) => setAddressEdit(e.target.value)} />
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control type="text"
                            value={PhoneEdit} onChange={(e) => setPhoneEdit(e.target.value)} />
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="text"
                            value={EmailEdit} onChange={(e) => setEmailEdit(e.target.value)} />
                        <Form.Label>Контактное лицо</Form.Label>
                        <Form.Control type="text"
                            value={ContactEdit} onChange={(e) => setContactEdit(e.target.value)} />
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

export default Customer;