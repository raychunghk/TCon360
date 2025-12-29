import { Injectable } from '@nestjs/common';
import fs from 'fs';
//import * as Docxtemplater from 'docxtemplater';
//import * as PizZip from 'pizzip';
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
@Injectable()
export class DocxService {
  async writeFieldsToDocx(
    fields: Record<string, string>,
    templatePath: string,
    outputPath: string,
  ): Promise<void> {
    // Read the contents of the DOCX file into a buffer
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    //JSZip
    //doc.loadZip(new JSZip(content));

    // Set the values of the fields to the provided values
    doc.setData(fields);

    // Render the document and write it to the specified output path
    const output = doc.render();
    fs.writeFileSync(outputPath, output, 'binary');
  }
}
