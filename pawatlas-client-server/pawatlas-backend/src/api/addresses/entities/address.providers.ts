import { DataSource } from 'typeorm';
import { Address } from './address.entity';
import { ADDRESS_REPOSITORY, DATA_SOURCE } from 'src/common/constants';

export const addressProviders = [
  {
    provide: ADDRESS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Address),
    inject: [DATA_SOURCE],
  },
];
