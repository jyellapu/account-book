import { AccountStatusType, PaymentType } from "@prisma/client";

export type Customer = {
  id: number;
  firstName: string;
  lastName?: string | null;
  mobileNumber: string;
};

export type Account = {
  id: number;
  amount: number;
  openedAt: Date;
  dueDate: Date;
  status: AccountStatusType;
  paymentType: PaymentType;
};

export type Transaction = {
  id: number;
  amount: number;
  date: Date;
  paymentType: PaymentType;
};

export type Book = {
  id: number;
  name: string;
  createdAt: Date;
};

export type Expense = {
  id: number;
  name: string;
  date: Date;
  amount: number;
};
