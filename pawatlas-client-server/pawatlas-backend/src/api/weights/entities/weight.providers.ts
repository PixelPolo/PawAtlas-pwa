import { DataSource } from 'typeorm';
import { Weight } from './weight.entity';
import { DATA_SOURCE, WEIGHT_REPOSITORY } from 'src/common/constants';

export const weightProviders = [
  {
    provide: WEIGHT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Weight),
    inject: [DATA_SOURCE],
  },
];
