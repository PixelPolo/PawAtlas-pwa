import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ROLE_REPOSITORY } from 'src/common/constants';
import { RoleNotFoundException } from 'src/common/exceptions-filters';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLE_REPOSITORY) private roleRepository: Repository<Role>,
  ) {}

  // POST /roles
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  // GET /roles
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  // GET /roles/:id
  async findOne(roleID: string): Promise<Role> {
    return await this.roleRepository.findOneBy({ roleID });
  }

  // PATCH /roles/:id
  async update(roleID: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(roleID);
    if (!role) {
      throw new RoleNotFoundException();
    }
    this.roleRepository.merge(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  // DELETE /roles/:id
  async remove(roleID: string): Promise<void> {
    const result = await this.roleRepository.delete(roleID);
    if (result.affected === 0) {
      throw new RoleNotFoundException();
    }
  }
}
