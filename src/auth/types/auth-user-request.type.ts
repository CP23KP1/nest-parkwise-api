export default interface AuthUserRequest extends Request {
  user: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
  };
}
