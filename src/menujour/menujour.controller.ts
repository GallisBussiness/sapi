import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenujourService } from './menujour.service';
import { CreateMenujourDto } from './dto/create-menujour.dto';
import { UpdateMenujourDto } from './dto/update-menujour.dto';

@Controller('menujour')
export class MenujourController {
  constructor(private readonly menujourService: MenujourService) {}

  @Post()
  create(@Body() createMenujourDto: CreateMenujourDto) {
    return this.menujourService.create(createMenujourDto);
  }

  @Get()
  findAll() {
    return this.menujourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menujourService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenujourDto: UpdateMenujourDto) {
    return this.menujourService.update(id, updateMenujourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menujourService.remove(id);
  }
}
