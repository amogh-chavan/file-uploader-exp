import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
//Below modules are needed for file processing
import * as fs from 'fs';
import stream = require('stream');
import fastify = require('fastify')
import * as util from 'util';
import { ApiResponse } from '@nestjs/swagger';
import { AppResponseDto } from './dto/app-response.dto';

@Injectable()
export class UploaderService {
    async uploadFile(req: fastify.FastifyRequest, res: fastify.FastifyReply<any>): Promise<any> {
        //Check request is multipart
        if (!req.isMultipart()) {
            res.send(new BadRequestException(
                new AppResponseDto(400, undefined, 'Request is not multipart'),

            ))
            return
        }
        const mp = await req.multipart(this.handler, onEnd);
        // for key value pairs in request
        mp.on('field', function (key: any, value: any) {
            console.log('form-data', key, value);
        });
        // Uploading finished
        async function onEnd(err: any) {
            if (err) {
                res.send(new HttpException('Internal server error', 500))
                return 'error'
            }
            res.code(200).send(new AppResponseDto(200, undefined, 'Data uploaded successfully'))

        }
    }
    //Save files in directory
    async handler(field: string, file: any, filename: string, encoding: string, mimetype: string): Promise<void> {
        const pipeline = util.promisify(stream.pipeline);
        const writeStream = fs.createWriteStream(`uploads/${filename}`); //File path
        try {
            await pipeline(file, writeStream);
        } catch (err) {
            console.error('Pipeline failed', err);
        }
    }
}
