export default interface AuthUserRequest extends Request {
  user: {
    id: number;
    type: 'admin' | 'staff';
    staffId: number;
    email: string;
    firstname: string;
    lastname: string;
  };
}
