import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { CaslModule } from 'src/casl/casl.module';
import { AuthModule } from 'src/auth/auth.module';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/users');
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
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CaslModule,
    MulterModule.register({
      storage
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
