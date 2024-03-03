import { SignInType } from 'src/shared/types/sign-in-type.type';

export type TokenPayload = {
  id: number;
  type: SignInType;
  email: string;
};
