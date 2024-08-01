import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleTypeEnum } from '../../../constants';
import { ApiEnumProperty } from '../../../decorators';
import type { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  age: number;

  @ApiEnumProperty(() => RoleTypeEnum)
  role: RoleTypeEnum;

  @ApiProperty()
  email: string;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.age = user.age;
    this.role = user.role;
    this.email = user.email;
  }
}
