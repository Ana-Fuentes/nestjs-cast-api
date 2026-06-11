import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  private dogs: Dog[] = [
    { 
      id: 1, 
      name: 'Buddy', 
      age: 3, 
      breed: 'Golden Retriever', 
      weight: 30,
      color: 'Golden',
      vaccinated: true
    },
    { 
      id: 2, 
      name: 'Luna', 
      age: 2, 
      breed: 'German Shepherd', 
      weight: 28,
      color: 'Black and Tan',
      vaccinated: true
    },
    { 
      id: 3, 
      name: 'Max', 
      age: 5, 
      breed: 'Labrador', 
      weight: 35,
      color: 'Yellow',
      vaccinated: false
    },
  ];
  private nextId = 4;

  findAll(): Dog[] {
    return this.dogs;
  }

  findOne(id: number): Dog {
    const dog = this.dogs.find(dog => dog.id === id);
    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    return dog;
  }

  create(createDogDto: CreateDogDto): Dog {
    const newDog: Dog = {
      id: this.nextId++,
      ...createDogDto,
    };
    this.dogs.push(newDog);
    return newDog;
  }

  update(id: number, updateDogDto: UpdateDogDto): Dog {
    const dogIndex = this.dogs.findIndex(dog => dog.id === id);
    if (dogIndex === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    
    this.dogs[dogIndex] = {
      ...this.dogs[dogIndex],
      ...updateDogDto,
    };
    return this.dogs[dogIndex];
  }

  delete(id: number): void {
    const dogIndex = this.dogs.findIndex(dog => dog.id === id);
    if (dogIndex === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    this.dogs.splice(dogIndex, 1);
  }
}