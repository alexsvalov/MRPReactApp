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


function Product() {

    const [CodeAdd, setCodeAdd] = useState([])
    const [NameAdd, setNameAdd] = useState([])
    const [TypeAdd, setTypeAdd] = useState([])
    const [KindAdd, setKindAdd] = useState(null)
    const [PurchaseAdd, setPurchaseAdd] = useState(false)

    const [IdEdit, setIdEdit] = useState([])
    const [CodeEdit, setCodeEdit] = useState([])
    const [NameEdit, setNameEdit] = useState([])
    const [TypeEdit, setTypeEdit] = useState([])
    const [KindEdit, setKindEdit] = useState(null)
    const [PurchaseEdit, setPurchaseEdit] = useState(false)

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const [typeData, setTypeData] = useState([]);
    const [kindData, setKindData] = useState([]);


    const label = "Изделие";
    

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        handleGetData();
    }


    const api = "/api/Products";
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


    const handleGetProductType = () => {
        fetch("/api/ProductTypes", {
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

    const handleGetProductKind = () => {
        fetch("/api/ProductKinds", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => { return response.json() })
            .then(responseJson => {
                setKindData(responseJson);
                console.log("Kind");
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        handleGetData();
        handleGetProductType();
        handleGetProductKind();
    }, [])


    const handleAdd = () => {
        fetch(api, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: CodeAdd,
                name: NameAdd,
                type: TypeAdd,
                kind: KindAdd,
                purchase: PurchaseAdd
            }),
        })
            .then(response => response.json())
            .then(() => handleGetData())
            .catch((error) => {
                console.log(error)
            });
        clear();
        console.log(TypeAdd)
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
                setCodeEdit(responseJson.code);
                setNameEdit(responseJson.name);
                setTypeEdit(responseJson.type);
                setKindEdit(responseJson.kind);
                setPurchaseEdit(responseJson.purchase);
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
                code: CodeEdit,
                name: NameEdit,
                type: TypeEdit,
                kind: KindEdit,
                purchase: PurchaseEdit
             }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    const clear = () => {
        setCodeAdd('');
        setNameAdd('');
        setTypeAdd('');
        setKindAdd(null);
        setPurchaseAdd(false);
 
        setCodeEdit('');
        setNameEdit('');
        setTypeEdit('');
        setKindEdit(null);
        setPurchaseEdit(false);
 
        setIdEdit('');
    }


    const handleLink = (type, item) => {
        return (type == 1) ? `/detail-composition/${item}` : `/specification/${item}`;
    }

    const handleLinkLabel = (type) => {
        return (type == 1) ? `Заготовка` : `Состав`;
    }

    const handleHidden = (purchase) => {
        return (purchase) ? true : false;
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите обозначение"
                            value={CodeAdd} onChange={(e) => setCodeAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Введите наименование"
                            value={NameAdd} onChange={(e) => setNameAdd(e.target.value)} />
                    </Col>
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
                        <Form.Select multiple={false}
                            value={KindAdd} onChange={(e) => setKindAdd(e.target.value)}>
                            <option value={null} >Выберите вид</option>
                            {kindData.map((item) => (
                                <option value={item.id} >{item.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Check
                            label='Покупное изделие'
                            value={PurchaseAdd} onChange={(e) => setPurchaseAdd(e.target.checked)}
                        />
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
                        <th>Обозначение</th>
                        <th>Наименование</th>
                        <th>Тип</th>
                        <th>Вид</th>
                        <th>Покупное изделие</th>
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
                                <td align="right">
                                    <Stack direction="horizontal" gap={3}>
                                        < Button variant="primary"
                                            onClick={() => handleEdit(item.id)}>Изменить</Button>
                                        < Button variant="danger"
                                            onClick={() => handleDelete(item.id)} >Удалить</Button>

                                        <Link to={handleLink(item.type, item.id)}>
                                            <Button variant="primary" hidden={handleHidden(item.purchase)} >{handleLinkLabel(item.type)}</Button>
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
                        <Form.Label>Обозначение</Form.Label>
                        <Form.Control type="text"
                            value={CodeEdit} onChange={(e) => setCodeEdit(e.target.value)} />
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control type="text"
                            value={NameEdit} onChange={(e) => setNameEdit(e.target.value)} />
                        {/*<Form.Label>Тип изделия</Form.Label>*/}
                        {/*<Form.Select multiple={false}*/}
                        {/*    value={TypeEdit} onChange={(e) => setTypeEdit(e.target.value)}>*/}
                        {/*    {typeData.map((item) => (*/}
                        {/*        <option value={item.id} >{item.name}</option>*/}
                        {/*    ))}*/}
                        {/*</Form.Select>*/}
                        {/*<Form.Label>Вид изделия</Form.Label>*/}
                        {/*<Form.Select multiple={false}*/}
                        {/*    value={KindEdit} onChange={(e) => setKindEdit(e.target.value)}>*/}
                        {/*    {kindData.map((item) => (*/}
                        {/*        <option value={item.id} >{item.name}</option>*/}
                        {/*    ))}*/}
                        {/*</Form.Select>*/}
                        {/*<Form.Check*/}
                        {/*    label='Покупное изделие'*/}
                        {/*    checked={PurchaseEdit} onChange={(e) => setPurchaseEdit(e.target.checked)}*/}
                        {/*/>*/}
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

export default Product;