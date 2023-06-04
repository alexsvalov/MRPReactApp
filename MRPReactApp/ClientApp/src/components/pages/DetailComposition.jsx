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


function Blank() {


    console.log(useParams());
    const { id } = useParams();

    const [IdEdit, setIdEdit] = useState([])
    const [ProductEdit, setProductEdit] = useState([])
    const [BlankEdit, setBlankEdit] = useState([])

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);


    const label = "Спецификация заказа";
    const api = "/api/DetailCompositions";

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        handleGetData();
    }

    const handleGetData = () => {
        fetch(`/api/DetailCompositionsFilter/${id}`, {
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
                setBlankEdit(responseJson.blank);
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
                product: ProductEdit,
                blank: BlankEdit
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    const clear = () => {
        setProductEdit('');
        setBlankEdit('');

        setIdEdit('');
    }

    return (
        <div>
            <Container>
                <Row>
                    <div>Продукт {id}</div>
                    <Link to={`/add-blank-detail/${id}`}>
                        <Button variant="primary" >Добавить заготовку</Button>
                    </Link>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Деталь</th>
                        <th>Тип материала</th>
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
                                <td>{item.product}</td>
                                <td>{item.blankNavigation.materialNavigation.typeNavigation.type}</td>
                                <td>{item.blankNavigation.materialNavigation.markNavigation.name}</td>
                                <td>{(item.blankNavigation.lenght != null)
                                    ? item.blankNavigation.lenght : null}</td>
                                <td>{(item.blankNavigation.width != null)
                                    ? item.blankNavigation.width : null}</td>
                                <td>{(item.blankNavigation.weight != null)
                                    ? item.blankNavigation.weight : null}</td>
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

export default Blank;