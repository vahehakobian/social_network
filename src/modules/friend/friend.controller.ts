import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleTypeEnum } from '../../constants';
import { ApiPageOkResponse, Auth, AuthUser, UUIDParam } from '../../decorators';
import { FriendService } from './friend.service';
import { UserDto } from '../user/dto/user.dto';
import { PageDto } from '../../common/dto/page.dto';
import { FriendPageOptionsDto } from './dto/friend-page-options.dto';
import { FriendDto } from './dto/friend.dto';

@Controller('friend')
@ApiTags('friend')
export class FriendController {
  constructor(private friendService: FriendService) { }

  @Get()
  @Auth([RoleTypeEnum.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get user friends',
    type: PageDto,
  })
  getUserFriends(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: FriendPageOptionsDto,
    @AuthUser() user: UserDto
  ): Promise<PageDto<FriendDto>> {
    return this.friendService.getFriends(pageOptionsDto, user);
  }

  @Delete(':friendId')
  @Auth([RoleTypeEnum.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete friend',
    type: UserDto,
  })
  delete(
    @UUIDParam('friendId') friendId: Uuid,
  ): Promise<void> {
    return this.friendService.delete(friendId);
  }
}
