import { DataSource } from 'typeorm';
import { Vermifuge } from './vermifuge.entity';
import { DATA_SOURCE, VERMIFUGE_REPOSITORY } from 'src/common/constants';

export const vermifugeProviders = [
  {
    provide: VERMIFUGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vermifuge),
    inject: [DATA_SOURCE],
  },
];
