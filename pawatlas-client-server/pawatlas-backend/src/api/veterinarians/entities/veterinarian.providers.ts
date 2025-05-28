import { DataSource } from 'typeorm';
import { Veterinarian } from './veterinarian.entity';
import { DATA_SOURCE, VETERINARIAN_REPOSITORY } from 'src/common/constants';

export const veterinarianProviders = [
  {
    provide: VETERINARIAN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Veterinarian),
    inject: [DATA_SOURCE],
  },
];
