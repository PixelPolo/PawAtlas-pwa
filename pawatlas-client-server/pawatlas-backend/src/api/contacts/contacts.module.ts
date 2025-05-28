import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { contactProviders } from './entities/contact.providers';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController],
  providers: [...contactProviders, ContactsService],
})
export class ContactsModule {}
