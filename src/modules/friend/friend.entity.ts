import { Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators/use-dto.decorator';
import { UserEntity } from '../user/user.entity';
import { FriendDto } from './dto/friend.dto';

@Entity({ name: 'friend' })
@UseDto(FriendDto)
export class FriendEntity extends AbstractEntity<FriendDto> {

    @ManyToOne(() => UserEntity, (user) => user.firends)
    user: UserEntity

    @ManyToOne(() => UserEntity, (user) => user.firends)
    friend: UserEntity
}
