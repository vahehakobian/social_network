import { ApiPropertyOptional } from '@nestjs/swagger';
import { EmailFieldOptional, NumberFieldOptional, StringFieldOptional } from '../../../decorators';

export class UpdateUserDto {
  @StringFieldOptional({ minLength: 2, maxLength: 36 })
  firstName: string;

  @StringFieldOptional({ minLength: 2, maxLength: 36 })
  lastName: string;

  @NumberFieldOptional({ minimum: 6 })
  age: number;

  @ApiPropertyOptional()
  @EmailFieldOptional()
  email: string;
}
