import { DataSource } from 'typeorm';
import { Disease } from './disease.entity';
import { DATA_SOURCE, DISEASE_REPOSITORY } from 'src/common/constants';

export const diseaseProviders = [
  {
    provide: DISEASE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Disease),
    inject: [DATA_SOURCE],
  },
];
