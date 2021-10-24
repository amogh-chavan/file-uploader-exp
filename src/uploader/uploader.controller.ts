import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('upload apis')
@Controller('uploader')
export class UploaderController {
    constructor(private readonly uploaderService: UploaderService) { }

    @Post('/uploadFile')
    async uploadFile(@Req() req, @Res() res): Promise<any> {
        return await this.uploaderService.uploadFile(req, res)
    }

    // @Get()
    // findAll() {
    //     return this.uploaderService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.uploaderService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUploaderDto: UpdateUploaderDto) {
    //     return this.uploaderService.update(+id, updateUploaderDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.uploaderService.remove(+id);
    // }
}
