import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlatDto } from './dto/create-plat.dto';
import { UpdatePlatDto } from './dto/update-plat.dto';
import { Plat, PlatDocument } from './entities/plat.entity';

@Injectable()
export class PlatService implements AbstractService<Plat,CreatePlatDto,UpdatePlatDto>{

  constructor(@InjectModel(Plat.name) private platModel: Model<PlatDocument>) { }

  async create(data: CreatePlatDto): Promise<Plat> {
     try {
      const createdPlat = new this.platModel(data);
      return await createdPlat.save();
     } catch (error) {
      throw new HttpException(error.message, 500);
     }
  }
 async findAll(): Promise<Plat[]> {
    try {
      return await this.platModel.find();
     } catch (error) {
      throw new HttpException(error.message, 500);
     }
  }
  async findOne(id: string): Promise<Plat> {
    try {
      return await this.platModel.findById(id);
     } catch (error) {
      throw new HttpException(error.message, 500);
     }
  }
  async remove(id: string): Promise<Plat> {
    try {
      return await this.platModel.findByIdAndRemove(id);
     } catch (error) {
      throw new HttpException(error.message, 500);
     }
  }
  async update(id: string, data: UpdatePlatDto): Promise<Plat> {
    try {
       return await this.platModel.findByIdAndUpdate(id, data);
     } catch (error) {
      throw new HttpException(error.message, 500);
     }
  }
  
}
