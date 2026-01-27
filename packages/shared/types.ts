export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  email: string;
}

export interface InvoiceItem {
  productId: string;
  quantity: number;
  discount: number; // percentage, 0-100
}

export interface Invoice {
  id: string;
  number: string;
  date: string; // ISO date
  dueDate: string; // ISO date
  customerId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number; // flat amount
  shipping: number;
  total: number;
  status: 'draft' | 'sent' | 'paid';
}