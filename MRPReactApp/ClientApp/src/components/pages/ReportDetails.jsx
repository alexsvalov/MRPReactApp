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

const ExcelJS = require('exceljs');



function ReportDetails() {

    console.log(useParams());
    let { id } = useParams();

    const [data, setData] = useState([]);

    const handleGetData = (id) => {
        fetch(`/api/ReportDetailsInPlan/${id}`, {
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

    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet();

        sheet.autoFilter = 'A1:H1';
        sheet.columns = [
            {
                header: "#",
                key: "index",
            },
            {
                header: "Id",
                key: "id",
            },
            {
                header: "Обозначение",
                key: "code",
                width: 15,
            },
            {
                header: "Наименование",
                key: "name",
                width: 25,
            },

            {
                header: "Тип изделия",
                key: "type",
                width: 20,
            },
            {
                header: "Вид изделия",
                key: "kind",
                width: 20,
            },
            {
                header: "Покупное изделие",
                key: "purchase",
                width: 20,
            },
            {
                header: "Количество",
                key: "quantity",
                width: 15,
            },
        ];
        data?.map((item, index) => {
            sheet.addRow({
                index: ++index,
                id: item?.id,
                code: item?.code,
                name: item?.name,
                type: item?.typeName,
                kind: item?.kindName,
                purchase: item?.purchase,
                quantity: item?.quantity
            })
        });
        workbook.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "products.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
        })
    }

    return (
        <div>
            <Container>
                <Row>
                    <div>Продукт {id}</div>

                    < Button variant="primary"
                        onClick={() => exportExcelFile()}>Export</Button>
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
                                <td>{item.typeName}</td>
                                <td>{(item.kindName != null) ? item.kindName : null}</td>
                                <td>
                                    <Form.Check
                                        checked={item.purchase} disabled='true' />
                                </td>
                                <td>{item.quantity}</td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </Table>
            {/*{ExportToExcel(data)}*/}
        </div>
    );
}

export default ReportDetails;
