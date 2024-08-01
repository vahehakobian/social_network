import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';

import { Repository } from 'typeorm';
import { UserDto } from '../user/dto/user.dto';
import { FriendEntity } from './friend.entity';
import { FriendPageOptionsDto } from './dto/friend-page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { FriendDto } from './dto/friend.dto';
@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendEntity)
    private friendRepository: Repository<FriendEntity>,
  ) { }


  async getFriends(
    pageOptionsDto: FriendPageOptionsDto,
    user: UserDto
  ): Promise<PageDto<FriendDto>> {
    const queryBuilder = this.friendRepository
      .createQueryBuilder('friend')
      .where('user_id = :userId', { userId: user.id })  
      .leftJoinAndSelect('friend.friend', 'user');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async delete(friendId: Uuid): Promise<void> {
    await this.friendRepository
      .createQueryBuilder()
      .delete()
      .where('user_id = :userId', { userId: friendId })
      .execute();


      await this.friendRepository
      .createQueryBuilder()
      .delete()
      .where('friend_id = :friendId', { friendId })
      .execute();
  }
}
