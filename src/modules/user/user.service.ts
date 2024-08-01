import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';

import type { PageDto } from '../../common/dto/page.dto';
import { RoleTypeEnum } from '../../constants';
import type { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserNotFoundException } from '../auth/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';
import type { UserDto } from './dto/user.dto';
import type { UsersPageOptionsDto } from './dto/users-page-options.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  findOne(id: Uuid): Promise<UserEntity | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      });

    return queryBuilder.getOne();
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    let user = this.userRepository.create({
      ...userRegisterDto,
      role: RoleTypeEnum.USER,
    });

    user = await this.userRepository.save(user);

    return user;
  }

  async getUsers(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUser(userId: Uuid): Promise<UserDto> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity.toDto();
  }

  async updateUser(userId: Uuid, updateUserDto: UpdateUserDto): Promise<UserDto> {
    let user = await this.getUser(userId);

    user = this.userRepository.create({ ...user, ...updateUserDto });

    await this.userRepository.save(user);

    return user;
  }


  async delete(userId: Uuid): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .where('id = :userId', { userId })
      .execute();
  }
}
