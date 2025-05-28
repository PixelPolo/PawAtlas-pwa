import { DataSource } from 'typeorm';
import { Vaccine } from './vaccine.entity';
import { DATA_SOURCE, VACCINE_REPOSITORY } from 'src/common/constants';

export const vaccineProviders = [
  {
    provide: VACCINE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vaccine),
    inject: [DATA_SOURCE],
  },
];
