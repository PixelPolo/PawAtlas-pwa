import { DataSource } from 'typeorm';
import { Role } from './role.entity';
import { DATA_SOURCE, ROLE_REPOSITORY } from 'src/common/constants';

export const roleProviders = [
  {
    provide: ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [DATA_SOURCE],
  },
];
