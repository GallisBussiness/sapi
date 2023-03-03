import { Module } from '@nestjs/common';
import { MenujourService } from './menujour.service';
import { MenujourController } from './menujour.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menujour, MenujourSchepma } from './entities/menujour.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Menujour.name, useFactory: () => {
    const schema = MenujourSchepma;
     schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}])],
  controllers: [MenujourController],
  providers: [MenujourService]
})
export class MenujourModule {}
