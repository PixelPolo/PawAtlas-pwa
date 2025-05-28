import { DataSource } from 'typeorm';
import { Animal } from './animal.entity';
import { ANIMAL_REPOSITORY, DATA_SOURCE } from 'src/common/constants';

export const animalProviders = [
  {
    provide: ANIMAL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Animal),
    inject: [DATA_SOURCE],
  },
];
