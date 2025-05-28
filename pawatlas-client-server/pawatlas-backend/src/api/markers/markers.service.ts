import { Repository } from 'typeorm';
import { Marker } from './entities/marker.entity';
import { MARKER_REPOSITORY } from 'src/common/constants';
import { Body, Inject, Injectable } from '@nestjs/common';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { MarkerNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class MarkersService {
  constructor(
    @Inject(MARKER_REPOSITORY) private markerRepository: Repository<Marker>,
  ) {}

  // POST /markers
  async create(@Body() createMarkerDto: CreateMarkerDto): Promise<Marker> {
    const marker = this.markerRepository.create(createMarkerDto);
    return await this.markerRepository.save(marker);
  }

  // GET /markers
  async findAll(): Promise<Marker[]> {
    return await this.markerRepository.find();
  }

  // GET /markers/:id
  async findOne(markerID: string): Promise<Marker> {
    return await this.markerRepository.findOneBy({ markerID });
  }

  // PATCH /markers/:id
  async update(
    markerID: string,
    updateMarkerDto: UpdateMarkerDto,
  ): Promise<Marker> {
    const marker = await this.findOne(markerID);
    if (!marker) {
      throw new MarkerNotFoundException();
    }
    this.markerRepository.merge(marker, updateMarkerDto);
    return await this.markerRepository.save(marker);
  }

  // DELETE /markers/:id
  async remove(markerID: string): Promise<void> {
    const result = await this.markerRepository.delete(markerID);
    if (result.affected === 0) {
      throw new MarkerNotFoundException();
    }
  }

  // ***** OTHER METHODS *****

  // GET /markers/interest
  async findByInterest(): Promise<Marker[]> {
    const markers = await this.markerRepository.find({
      where: {
        category: {
          type: {
            typeName: 'Interest',
          },
        },
      },
      relations: ['category', 'category.type'],
    });
    return markers;
  }

  // GET /markers/danger
  async findByDanger(): Promise<Marker[]> {
    const markers = await this.markerRepository.find({
      where: {
        category: {
          type: {
            typeName: 'Danger',
          },
        },
      },
      relations: ['category', 'category.type'],
    });
    return markers;
  }

  // GET /markers/service
  async findByService(): Promise<Marker[]> {
    const markers = await this.markerRepository.find({
      where: {
        category: {
          type: {
            typeName: 'Service',
          },
        },
      },
      relations: ['category', 'category.type'],
    });
    return markers;
  }
}
