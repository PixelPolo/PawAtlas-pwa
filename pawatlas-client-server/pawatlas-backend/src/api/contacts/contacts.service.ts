import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { CONTACT_REPOSITORY } from 'src/common/constants';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACT_REPOSITORY) private contactRepository: Repository<Contact>,
  ) {}

  // POST /contacts
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contact);
  }

  // GET /contacts
  async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  // GET /contacts/:id
  async findOne(contactID: string): Promise<Contact> {
    return await this.contactRepository.findOneBy({ contactID });
  }

  // GET /contacts/:email
  async findOneByEmail(email: string): Promise<Contact> {
    return await this.contactRepository.findOneBy({ email });
  }

  // PATCH /contacts/:id
  async update(
    contactID: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.findOne(contactID);
    if (!contact) {
      throw new ContactNotFoundException();
    }
    this.contactRepository.merge(contact, updateContactDto);
    return await this.contactRepository.save(contact);
  }

  // DELETE /contacts/:id
  async remove(contactID: string): Promise<void> {
    const result = await this.contactRepository.delete(contactID);
    if (result.affected === 0) {
      throw new ContactNotFoundException();
    }
  }
}
