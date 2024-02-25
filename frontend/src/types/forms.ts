export type LoginForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateTransactionForm = {
  name: string;
  number_card: string;
  date_expiration: string;
  cvv: string;
  value: number;
  user_id: string;
};

export type CreatedReturn = {
  created: boolean;
  error: boolean
};
