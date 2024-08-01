import { EmailField, NumberField, PasswordField, StringField } from '../../../decorators';

export class UserRegisterDto {
  @StringField()
  firstName: string;

  @StringField()
  lastName: string;

  @EmailField()
  email: string;

  @NumberField({ min: 6, max: 99 })
  age: number;

  @PasswordField()
  password: string;
}
