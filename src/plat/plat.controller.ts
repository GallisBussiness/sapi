import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlatService } from './plat.service';
import { CreatePlatDto } from './dto/create-plat.dto';
import { UpdatePlatDto } from './dto/update-plat.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';

@Controller('plat')
export class PlatController {
  constructor(private readonly platService: PlatService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file: Express.Multer.File,@Body() createPlatDto: CreatePlatDto) {
    if(file) {
      createPlatDto.image = file.filename;
    }
    else {
      createPlatDto.image = 'default_plat.jpg';
    }
    return this.platService.create(createPlatDto);
  }

  @Get()
  findAll() {
    return this.platService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() updatePlatDto: UpdatePlatDto) {
    if(file) {
      updatePlatDto.image = file.filename;
    }
    const prev = await this.platService.update(id, updatePlatDto);
    if(prev)
    try {
      unlinkSync(`uploads/plats/${prev.image}`);
    }
    catch(e) {}
    return prev;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const prev = await this.platService.remove(id);
    if(prev)
    try {
      unlinkSync(`uploads/plats/${prev.image}`);
    }
    catch(e) {}
    return prev;
  }
}
