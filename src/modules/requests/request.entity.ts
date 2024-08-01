import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators/use-dto.decorator';
import { UserEntity } from '../user/user.entity';
import { RequestDto } from './dto/request.dto';
import { RequestEnum } from '../../constants/request-type.enum';

@Entity({ name: 'request' })
@UseDto(RequestDto)
export class RequestEntity extends AbstractEntity<RequestDto> {

  @ManyToOne(() => UserEntity, (user) => user.sentRequests)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.receivedRequests)
  receiver: UserEntity;
  
  @Column({ enum: RequestEnum, type: 'enum', default: RequestEnum.PENDING })
  status: RequestEnum;

}
