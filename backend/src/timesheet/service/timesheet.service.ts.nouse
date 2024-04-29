import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
@Injectable()
export class TimesheetService {
    private readonly xlsfilename: string;
    constructor() {

        this.xlsfilename = 'T26TimeSheet.xlsx';
    }
    async getContent() {
        const filePath = this.getFilePath(this.xlsfilename);
        const fileContent = fs.readFileSync(filePath);
        const workbook = xlsx.read(fileContent);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(sheet);
        return json;

    }
    getFilePath(filename) {

        return `${__dirname}/../../../../timesheet/${filename}`;
    }
    getTimeSheetFilePath() {
        return this.getFilePath(this.xlsfilename)
    }
    async copyFile() {
        const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const sourcePath = this.getFilePath('T26TimeSheet.xlsx');
        const destPath = this.getFilePath(`T26TimeSheet_${formattedDate}.xlsx`);
        console.log(destPath);
        if (fs.existsSync(destPath)) {
            console.log('Destination file already exists!');
            return false;
        }
        try {
            const data = await fs.promises.readFile(sourcePath);
            await fs.promises.writeFile(destPath, data);
            console.log('File copied successfully!');
            return true;
        } catch (err) {
            console.error('Error copying file:', err);
            return false;
        }
    }
}
