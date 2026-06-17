import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import type { Dog } from './interfaces/dog.interface';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  findAll(): Dog[] {
    return this.dogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Dog {
    return this.dogsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDogDto: CreateDogDto): Dog {
    return this.dogsService.create(createDogDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDogDto: UpdateDogDto,
  ): Dog {
    return this.dogsService.update(id, updateDogDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.dogsService.delete(id);
    return { 
      message: `Dog with ID ${id} deleted successfully`,
      //timestamp: new Date().toISOString()
    };
  }
}