import {
  DATA_SOURCE,
  USER_ANIMAL_OWNERSHIP_REPOSITORY,
} from 'src/common/constants';
import { DataSource } from 'typeorm';
import { UserAnimalOwnership } from './user_animal_ownership.entity';

export const userAnimalOwnershipProviders = [
  {
    provide: USER_ANIMAL_OWNERSHIP_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserAnimalOwnership),
    inject: [DATA_SOURCE],
  },
];
