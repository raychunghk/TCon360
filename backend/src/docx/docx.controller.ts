import { Body, Controller, Post } from '@nestjs/common';
import { DocxService } from './docx.service.js';

@Controller()
export class DocxController {
  constructor(private readonly docxService: DocxService) {}

  @Post('/write-fields-to-docx')
  async writeFieldsToDocx(
    @Body() fields: Record<string, string>,
  ): Promise<void> {
    await this.docxService.writeFieldsToDocx(
      fields,
      'path/to/template.docx',
      'path/to/output.docx',
    );
  }
}
