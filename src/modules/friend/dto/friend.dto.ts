import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { UserDto } from '../../user/dto/user.dto';
import { FriendEntity } from '../friend.entity';

export class FriendDto extends AbstractDto {

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  friend: UserDto;

  constructor(friend: FriendEntity) {
    super(friend);
    this.user = friend.user;
    this.friend = friend.friend.toDto();
  }
}
