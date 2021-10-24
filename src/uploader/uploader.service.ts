import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
//Below modules are needed for file processing
import * as fs from 'fs';
import stream = require('stream');
import fastify = require('fastify')
import * as util from 'util';


@Injectable()
export class UploaderService {
    async uploadFile(req: fastify.FastifyRequest): Promise<any> {
        //Check request is multipart
        if (!req.isMultipart()) {
            return new BadRequestException('Request not multi-part')
        }
        const mp = await req.multipart(this.handler, onEnd);
        // for key value pairs in request
        mp.on('field', function (key: any, value: any) {
            console.log('form-data', key, value);
        });
        // Uploading finished
        async function onEnd(err: any) {
            if (err) {
                return new InternalServerErrorException()
            }
            return true
        }
    }
    //Save files in directory
    async handler(field: string, file: any, filename: string, encoding: string, mimetype: string): Promise<void> {
        const pipeline = util.promisify(stream.pipeline);
        console.log("mimetype: ", mimetype)
        console.log("------------field", field)
        console.log("encoding:", encoding)
        console.log("file:", file)
        const writeStream = fs.createWriteStream(`uploads/${filename}`); //File path
        try {
            await pipeline(file, writeStream);
        } catch (err) {
            console.error('Pipeline failed', err);
        }
    }
}
