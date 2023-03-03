import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { ComminiqueService } from './comminique.service';
import { CreateComminiqueDto } from './dto/create-comminique.dto';
import { UpdateComminiqueDto } from './dto/update-comminique.dto';

@Controller('comminique')
export class ComminiqueController {
  constructor(private readonly comminiqueService: ComminiqueService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file: Express.Multer.File,@Body() createComminiqueDto: CreateComminiqueDto) {
    if(file) {
      createComminiqueDto.image = file.filename;
    }
    else {
      createComminiqueDto.image = 'default_communique.jpg';
    }
    return this.comminiqueService.create(createComminiqueDto);
  }

  @Get()
  findAll() {
    return this.comminiqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comminiqueService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() updateComminiqueDto: UpdateComminiqueDto) {
    if(file) {
      updateComminiqueDto.image = file.filename;
    }
    const prev = await this.comminiqueService.update(id, updateComminiqueDto);
    if(prev)
    try {
      unlinkSync(`uploads/communiques/${prev.image}`);
    }
    catch(e) {}
    return prev;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const prev = await this.comminiqueService.remove(id);
    if(prev)
    try {
      unlinkSync(`uploads/communiques/${prev.image}`);
    }
    catch(e) {}
    return prev;
  }
}
