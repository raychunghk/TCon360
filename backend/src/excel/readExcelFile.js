const XLSX = require('xlsx');
const fs = require('fs');
function readExcelFile() {
    //T26TimeSheet.xlsx
    const filePath = './timesheet/T26TimeSheet.xlsx';
    const response =   fetch(filePath);
    if (!response.ok) {
      throw new Error('File not found');
    }
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(worksheet);
    return excelData;
}

module.exports = { readExcelFile };