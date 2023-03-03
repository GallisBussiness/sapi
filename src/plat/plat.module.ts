import { Module } from '@nestjs/common';
import { PlatService } from './plat.service';
import { PlatController } from './plat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plat, PlatSchema } from './entities/plat.entity';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/plats');
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
  imports: [MongooseModule.forFeature([{name: Plat.name, schema: PlatSchema}]),
  MulterModule.register({
    storage
  })
],
  controllers: [PlatController],
  providers: [PlatService]
})
export class PlatModule {}
