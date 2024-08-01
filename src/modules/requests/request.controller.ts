import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Query,
    ValidationPipe,
  } from '@nestjs/common';
  import { ApiResponse, ApiTags } from '@nestjs/swagger';
  
  import { RoleTypeEnum } from '../../constants';
  import { ApiPageOkResponse, Auth, AuthUser, UUIDParam } from '../../decorators';
import { RequestService } from './request.service';
import { SentRequestDto } from './dto/sent-request.dto';
import { UserDto } from '../user/dto/user.dto';
import { PageDto } from '../../common/dto/page.dto';
import { RequestPageOptionsDto } from './dto/request-page-options.dto';
import { RequestDto } from './dto/request.dto';
import { RequestRerspondDto } from './dto/respond-request.dto';
  
  @Controller('requests')
  @ApiTags('requests')
  export class RequestController {
    constructor(private requestService: RequestService) {}

    
    @Post('/sent')
    @Auth([RoleTypeEnum.USER, RoleTypeEnum.ADMIN])
    async sentRequest(
        @Body() sentRequestDto: SentRequestDto,
        @AuthUser() user: UserDto
    ) {
        await this.requestService.sentRequest(sentRequestDto, user);
    } 


    @Put('/respond:requestId')
    @Auth([RoleTypeEnum.USER, RoleTypeEnum.ADMIN])
    async respondRequest(
        @UUIDParam('requestId') requestId: Uuid,
        @Body() requestResponDto: RequestRerspondDto,
    ) {
        await this.requestService.respondRequest(requestResponDto, requestId);
    } 
  
    @Get()
    @Auth([RoleTypeEnum.USER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
      description: 'Get requests list',
      type: PageDto,
    })
    getUserRequests(
      @Query(new ValidationPipe({ transform: true }))
      pageOptionsDto: RequestPageOptionsDto,
    ): Promise<PageDto<RequestDto>> {
      return this.requestService.getRequests(pageOptionsDto);
    }
  
    @Get(':id')
    @Auth([RoleTypeEnum.USER])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Get request',
      type: UserDto,
    })
    async getUser(@UUIDParam('id') requestId: Uuid): Promise<RequestDto> {
      return this.requestService.getRequest(requestId);
    }
  }
  