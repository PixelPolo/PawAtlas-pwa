import { DataSource } from 'typeorm';
import { Type } from './type.entity';
import { DATA_SOURCE, TYPE_REPOSITORY } from 'src/common/constants';

export const typeProviders = [
  {
    provide: TYPE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Type),
    inject: [DATA_SOURCE],
  },
];
