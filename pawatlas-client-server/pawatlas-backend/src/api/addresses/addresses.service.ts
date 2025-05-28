import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { ADDRESS_REPOSITORY } from 'src/common/constants';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class AddressesService {
  constructor(
    @Inject(ADDRESS_REPOSITORY) private addressRepository: Repository<Address>,
  ) {}

  // POST /addresses
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(address);
  }

  // POST /addresses/check
  async checkAddress(addressData: Partial<CreateAddressDto>) {
    return this.addressRepository.findOne({ where: addressData });
  }

  // GET /addresses
  async findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  // GET /addresses/:id
  async findOne(addressID: string): Promise<Address> {
    return this.addressRepository.findOneBy({ addressID });
  }

  // PATCH /addresses/:id
  async update(
    addressID: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(addressID);
    if (!address) {
      throw new AddressNotFoundException();
    }
    this.addressRepository.merge(address, updateAddressDto);
    return await this.addressRepository.save(address);
  }

  // DELETE /addresses/:id
  async remove(addressID: string): Promise<void> {
    const result = await this.addressRepository.delete(addressID);
    if (result.affected === 0) {
      throw new AddressNotFoundException();
    }
  }
}
