import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestEntity } from './request.entity';
import { UserService } from '../user/user.service';
import { RequestController } from './request.controller';
import { UserModule } from '../user/user.module';
import { RequestService } from './request.service';

export const handlers = [];

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])],
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([RequestEntity])],
  controllers: [RequestController],
  exports: [UserService, RequestService, TypeOrmModule],
  providers: [UserService, RequestService, ...handlers]
  
})
export class RequestModule {}
