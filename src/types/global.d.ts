export {};

interface RazorpayCheckoutOptions {
  key: string;
  amount?: number;
  currency?: string;
  name?: string;
  description?: string;
  order_id?: string;
  handler?: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
}

interface Razorpay {
  new (options: RazorpayCheckoutOptions): { open: () => void };
}

declare global {
  interface Window {
    Razorpay?: Razorpay;
  }
}

