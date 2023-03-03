import { Module } from '@nestjs/common';
import { ComminiqueController } from './comminique.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comminique, ComminiqueSchema } from './entities/comminique.entity';
import { ComminiqueService } from './comminique.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/communiques');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + '-' + file.originalname,
    );
  },
});

@Module({
  imports: [MongooseModule.forFeature([{name: Comminique.name, schema: ComminiqueSchema}]),
  MulterModule.register({
    storage
  })
],
  controllers: [ComminiqueController],
  providers: [ComminiqueService]
})
export class ComminiqueModule {}
