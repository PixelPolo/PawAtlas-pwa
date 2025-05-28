import { DataSource } from 'typeorm';
import { Contact } from './contact.entity';
import { CONTACT_REPOSITORY, DATA_SOURCE } from 'src/common/constants';

export const contactProviders = [
  {
    provide: CONTACT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Contact),
    inject: [DATA_SOURCE],
  },
];
