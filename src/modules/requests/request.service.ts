import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { RequestEntity } from './request.entity';
import { Repository } from 'typeorm';
import { SentRequestDto } from './dto/sent-request.dto';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { RequestPageOptionsDto } from './dto/request-page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { RequestDto } from './dto/request.dto';
import { RequestRerspondDto } from './dto/respond-request.dto';
import { RequestEnum } from '../../constants/request-type.enum';
@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
    private userservice: UserService,
  ) { }

  async sentRequest(sentRequestDto: SentRequestDto, user: UserDto) {
    const receiver = await this.userservice.getUser(sentRequestDto.receiver)

    let request = this.requestRepository.create({
      sender: user,
      receiver,
    });

    await this.requestRepository.save(request);

    return request;
  }

  async respondRequest(requestRespondDto: RequestRerspondDto, requestId: Uuid) {
    await this.requestRepository.update(requestId, {
      status: requestRespondDto.respond === RequestEnum.ACCEPT ? RequestEnum.ACCEPT : RequestEnum.DECLINE
    })
  }

  findOne(id: Uuid): Promise<RequestEntity | null> {
    return this.requestRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  // async findByUsernameOrEmail(
  //   options: Partial<{ username: string; email: string }>,
  // ): Promise<RequestEntity | null> {
  //   const queryBuilder = this.requestRepository.createQueryBuilder('user');

  //   if (options.email) {
  //     queryBuilder.orWhere('user.email = :email', {
  //       email: options.email,
  //     });
  //   }

  //   if (options.username) {
  //     queryBuilder.orWhere('user.username = :username', {
  //       username: options.username,
  //     });
  //   }

  //   return queryBuilder.getOne();
  // }
  async getRequests(
    pageOptionsDto: RequestPageOptionsDto,
  ): Promise<PageDto<RequestDto>> {
    const queryBuilder = this.requestRepository.createQueryBuilder('request')
    .leftJoinAndSelect('request.sender', 'user');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getRequest(requestId: Uuid): Promise<RequestDto> {
    const queryBuilder = this.requestRepository
      .createQueryBuilder('requests')
      .where('requests.id = :requestId', { requestId });

    const request = await queryBuilder.getOne();

    if (!request) {
      throw new NotFoundException();
    }

    return request.toDto();
  }

  // async findById(userId: Uuid): Promise<UserEntity | null> {
  //   return this.userRepository
  //     .createQueryBuilder('user')
  //     .where('user.id = :userId', { userId })
  //     .getOne();
  // }

  // async getOne(userId: Uuid): Promise<UserEntity> {
  //   const entity = await this.findById(userId);

  //   if (!entity) {
  //     throw new UserNotFoundException();
  //   }

  //   return entity;
  // }

  // async updateUser(userId: Uuid, updateUserDto: UpdateUserDto): Promise<UserDto> {
  //   const entity = await this.getOne(userId);
  //   const result = await this.updateUserCheck(updateUserDto);

  //   if (Object.values(result).find(val => !!val)) {
  //     throw new CanNotUpdateUser()
  //   }
  //   this.userRepository.merge(entity, { ...updateUserDto });

  //   return (await this.userRepository.save(entity)).toDto();
  // }


  // async delete(userId: Uuid): Promise<void> {
  //   await this.userRepository
  //     .createQueryBuilder()
  //     .delete()
  //     .where('id = :userId', { userId })
  //     .execute();
  // }
}
