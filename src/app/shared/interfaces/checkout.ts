
export interface Checkout {
  status: string;
  session: Session;
}

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}