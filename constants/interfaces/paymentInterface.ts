import Echo from "laravel-echo";

export interface PaymentType {
  id: number;
  logo: string;
  name: string;
  disabled: boolean;
  iban: string;
}

export interface PaymentContextInterface {
  paymentChannel: Echo<any> | null;
  setPaymentChannel?: React.Dispatch<React.SetStateAction<Echo<any>>>;
}
