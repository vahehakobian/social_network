import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

export const handlers = [];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
  providers: [UserService, ...handlers]

})
export class UserModule { }
