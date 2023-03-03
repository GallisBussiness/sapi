import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from './entities/event.entity';

@Injectable()
export class EventService implements AbstractService<Event,CreateEventDto,UpdateEventDto> {

  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}



  async findAll(): Promise<Event[]> {
   try {
    return await this.eventModel.find();
   }
   catch (e) {
    throw new HttpException(e.message,500);
   }
  }

  async findOne(id: string): Promise<Event> {
   try {
    return await this.eventModel.findById(id);
   }
   catch (error) {
    throw new HttpException(error.message,500);
   }

  }


  async remove(id: string): Promise<Event> {
    try {
       return await this.eventModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }


  async update(id: string, data: UpdateEventDto): Promise<Event> {
    try {
      return await this.eventModel.findByIdAndUpdate(id, data);
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const createdEvent = new this.eventModel(createEventDto);
      return await createdEvent.save();
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }


}
