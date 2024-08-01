import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleTypeEnum } from '../../constants';
import { UseDto } from '../../decorators/use-dto.decorator';
import { UserDto } from './dto/user.dto';
import { RequestEntity } from '../requests/request.entity';
import { FriendEntity } from '../friend/friend.entity';

@Entity({ name: 'users' })
@UseDto(UserDto)
@Unique(['email'])
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ enum: RoleTypeEnum, type: 'enum' })
  role: RoleTypeEnum;

  @OneToMany(() => RequestEntity, (requests) => requests.sender)
  sentRequests: RequestEntity[];

  @OneToMany(() => RequestEntity, (requests) => requests.receiver)
  receivedRequests: RequestEntity[];

  @OneToMany(() => FriendEntity, (friends) => friends.user)
  firends: FriendEntity[];

}
