export type TokenPayload = {
  id: number;
  type: 'admin' | 'staff';
  email: string;
};
