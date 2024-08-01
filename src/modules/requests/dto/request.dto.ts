import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RequestEntity } from '../request.entity';
import { UserDto } from '../../user/dto/user.dto';
import { RequestEnum } from '../../../constants/request-type.enum';

export class RequestDto extends AbstractDto {

  @ApiProperty()
  sender: UserDto;

  @ApiProperty()
  receiver: UserDto;

  @ApiProperty()
  status: RequestEnum;

  constructor(request: RequestEntity) {
    super(request);
    this.sender = request.sender;
    this.receiver = request.receiver;
    this.status = request.status;
  }
}
