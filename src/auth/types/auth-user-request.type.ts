import { SignInType } from 'src/shared/types/sign-in-type.type';

export default interface AuthUserRequest extends Request {
  user: {
    id: number;
    type: SignInType;
    staffId: number;
    email: string;
    firstname: string;
    lastname: string;
  };
}
