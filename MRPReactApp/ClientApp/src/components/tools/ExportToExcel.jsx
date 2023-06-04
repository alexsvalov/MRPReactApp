const ExcelJS = require('exceljs');


function ExportToExcel(data, columns, name) {

    //const exportExcelFile = () => {


    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(name);
    sheet.columns = columns;
    data?.map(item => {
        sheet.addRow({
            id: item?.id,
            name: item?.name,
            type: item?.type,
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
        anchor.download = "download.xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
    })
    //}

}

export default ExportToExcel;