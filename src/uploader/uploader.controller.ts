import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { ApiTags } from '@nestjs/swagger';
import ApiResponse from 'src/shared/dto/api-response.dto';


@ApiTags('upload apis')
@Controller('uploader')
export class UploaderController {
    constructor(private readonly uploaderService: UploaderService) { }

    @Post('/uploadFile')
    async uploadFile(@Req() req): Promise<any> {
        const response = await this.uploaderService.uploadFile(req)
        return new ApiResponse(true, response, 'File uploaded')
    }

}
