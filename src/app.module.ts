import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploaderModule } from './uploader/uploader.module';
import { SharedModule } from './shared/shared.module';


@Module({

    controllers: [AppController],
    providers: [AppService],
    imports: [UploaderModule, SharedModule],
})
export class AppModule { }
