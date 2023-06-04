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


function AddBlankToDetail() {

    console.log(useParams());
    let { id } = useParams();

    const [data, setData] = useState([]);

    const handleGetData = () => {
        fetch(`/api/AddBlankToDetail/${id}`, {
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
        fetch(`/api/DetailCompositions`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: Number(id),
                blank: item
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

                <Link to={`/detail-composition/${id}`}>
                    <Button variant="primary" >Заготовка</Button>
                </Link>

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

export default AddBlankToDetail;
