import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { FriendEntity } from './friend.entity';
export const handlers = [];

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([FriendEntity])],
  controllers: [FriendController],
  exports: [FriendService, TypeOrmModule],
  providers: [FriendService, ...handlers]

})
export class FriendModule { }
