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


function Blank() {

    const [MaterialAdd, setMaterialAdd] = useState(null)
    const [LenghtAdd, setLenghtAdd] = useState(null)
    const [WidthAdd, setWidthAdd] = useState([])
    const [WeightAdd, setWeightAdd] = useState([])


    const [IdEdit, setIdEdit] = useState([])
    const [MaterialEdit, setMaterialEdit] = useState([])
    const [LenghtEdit, setLenghtEdit] = useState([])
    const [WidthEdit, setWidthEdit] = useState([])
    const [WeightEdit, setWeightEdit] = useState([])

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const [Material, setMaterial] = useState([]);

    const label = "Заготовка";
    const api = "/api/Blanks";

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

    const handleGetMaterial = () => {
        fetch("/api/Materials", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => { return response.json() })
            .then(responseJson => {
                setMaterial(responseJson);
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        handleGetData();
        handleGetMaterial();
    }, [])

    const handleAdd = () => {
        fetch(api, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                material: MaterialAdd,
                lenght: LenghtAdd,
                width: WidthAdd,
                weight: WeightAdd
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
                setMaterialEdit(responseJson.material);
                setLenghtEdit(responseJson.lenght);
                setWidthEdit(responseJson.width);
                setWeightEdit(responseJson.weight);
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
                material: MaterialEdit,
                lenght: LenghtEdit,
                width: WidthEdit,
                weight: WeightEdit
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    const clear = () => {
        setMaterialAdd('');
        setLenghtAdd('');
        setWidthAdd('');
        setWeightAdd('');

        setMaterialEdit('');
        setLenghtEdit('');
        setWidthEdit('');
        setWeightEdit('');

        setIdEdit('');
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Form.Select multiple={false}
                            value={MaterialAdd} onChange={(e) => setMaterialAdd(e.target.value)}>
                            <option value={null} >Выберите материал</option>
                            {Material.map((item) => (
                                <option value={item.id} >{item.typeNavigation.name} {item.size} {item.markNavigation.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <input type="number" className="form-control" placeholder="Введите длину"
                            value={LenghtAdd} onChange={(e) => setLenghtAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="number" className="form-control" placeholder="Введите ширину"
                            value={WidthAdd} onChange={(e) => setWidthAdd(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="number" className="form-control" placeholder="Введите массу"
                            value={WeightAdd} onChange={(e) => setWeightAdd(e.target.value)} />
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
                        <th>Длина, мм</th>
                        <th>Ширина, мм</th>
                        <th>Масса, кг</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.id}</td>
                                <td>{item.materialNavigation.typeNavigation.name}</td>
                                <td>{item.materialNavigation.size}</td>
                                <td>{item.materialNavigation.markNavigation.name}</td>
                                <td>{item.lenght}</td>
                                <td>{item.width}</td>
                                <td>{item.weight}</td>
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
                        <Form.Label>Материал</Form.Label>
                        <Form.Select multiple={false}
                            value={MaterialEdit} onChange={(e) => setMaterialEdit(e.target.value)}>
                            {Material.map((item) => (
                                <option value={item.id} >{item.typeNavigation.name} {item.size} {item.markNavigation.name}</option>
                            ))}
                        </Form.Select>

                        <Form.Label>Длина, мм</Form.Label>
                        <Form.Control type="number"
                            value={LenghtEdit} onChange={(e) => setLenghtEdit(e.target.value)} />


                        <Form.Label>Ширина, мм</Form.Label>
                        <Form.Control type="number"
                            value={WidthEdit} onChange={(e) => setWidthEdit(e.target.value)} />

                        <Form.Label>Масса, кг</Form.Label>
                        <Form.Control type="number"
                            value={WeightEdit} onChange={(e) => setWeightEdit(e.target.value)} />

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

export default Blank;