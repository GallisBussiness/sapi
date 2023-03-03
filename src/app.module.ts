import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { EasyconfigModule,EasyconfigService } from 'nestjs-easyconfig';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserModule } from './user/user.module';
import { ComminiqueModule } from './comminique/comminique.module';
import { EventModule } from './event/event.module';
import { PlatModule } from './plat/plat.module';
import { MenujourModule } from './menujour/menujour.module';

@Module({
  imports: [
    EasyconfigModule.register({path: './config/.env', safe: true}),
    MongooseModule.forRootAsync({
      useFactory: async (config: EasyconfigService) => ({
        uri: config.get('MONGODB_URL'),
        autoCreate: true,
      }),
      inject: [EasyconfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (config: EasyconfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [EasyconfigService],
    }),
    UserModule,
    ComminiqueModule,
    EventModule,
    PlatModule,
    MenujourModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user/(.*)', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
