import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    { id: 1, name: 'Whiskers', age: 3, breed: 'Siamese', color: 'White' },
    { id: 2, name: 'Mittens', age: 2, breed: 'Persian', color: 'Gray' },
  ];
  private nextId = 3;

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  create(createCatDto: CreateCatDto): Cat {
    const newCat: Cat = {
      id: this.nextId++,
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    
    this.cats[catIndex] = {
      ...this.cats[catIndex],
      ...updateCatDto,
    };
    return this.cats[catIndex];
  }

  delete(id: number): void {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.cats.splice(catIndex, 1);
  }
}