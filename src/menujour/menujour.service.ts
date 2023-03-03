import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenujourDto } from './dto/create-menujour.dto';
import { UpdateMenujourDto } from './dto/update-menujour.dto';
import { Menujour, MenujourDocument } from './entities/menujour.entity';

@Injectable()
export class MenujourService implements AbstractService<Menujour, CreateMenujourDto, UpdateMenujourDto> {

  constructor(@InjectModel(Menujour.name) private menuModel: Model<MenujourDocument>) {}

  async create(data: CreateMenujourDto): Promise<Menujour> {
   try {
    const createdMenu = new this.menuModel(data);
    return await createdMenu.save();
   } catch (error) {
    throw new HttpException(error.message, 500)
   }
  }
  async findAll(): Promise<Menujour[]> {
   try {
    return await this.menuModel.find();
   } catch (error) {
    throw new HttpException(error.message, 500);
   }
  }
  async findOne(id: string): Promise<Menujour> {
   try {
    return await this.menuModel.findById(id);
   } catch (error) {
    throw new HttpException(error.message, 500);
   }
  }
  async remove(id: string): Promise<Menujour> {
   try {
    return await this.menuModel.findByIdAndRemove(id);
   } catch (error) {
    throw new HttpException(error.message, 500);
   }
  }
  async update(id: string, data: UpdateMenujourDto): Promise<Menujour> {
    try {
      return await this.menuModel.findByIdAndUpdate(id, data);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  
}
