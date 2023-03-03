import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateComminiqueDto } from './dto/create-comminique.dto';
import { UpdateComminiqueDto } from './dto/update-comminique.dto';
import { Comminique, ComminiqueDocument } from './entities/comminique.entity';

@Injectable()
export class ComminiqueService {
  constructor(@InjectModel(Comminique.name) private comModel: Model<ComminiqueDocument>) {}
  async create(createComminiqueDto: CreateComminiqueDto): Promise<Comminique> {
   try {
    const createdCommunique = new this.comModel(createComminiqueDto);
    return await createdCommunique.save();
   } catch (error) {
    throw new HttpException(error.message,500);
   }
  }

  async findAll(): Promise<Comminique[]> {
    try {
      return await this.comModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<Comminique> {
    try {
      return await this.comModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateComminiqueDto: UpdateComminiqueDto): Promise<Comminique> {
    try {
      return await this.comModel.findByIdAndUpdate(id, updateComminiqueDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Comminique> {
    try {
      return await this.comModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
