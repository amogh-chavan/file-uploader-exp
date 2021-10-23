import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploaderModule } from './uploader/uploader.module';


@Module({

    controllers: [AppController],
    providers: [AppService],
    imports: [UploaderModule],
})
export class AppModule { }
