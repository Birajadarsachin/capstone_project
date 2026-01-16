export type CreditRequest = {
  id: string;
  clientId: string;
  requestAmount: number;
  tenureMonths: number;
  purpose: string;
  status: string;
  remarks?: string;
};