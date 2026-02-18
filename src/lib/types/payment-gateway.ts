interface PaymentMethodFee {
    flat: number;
    percent: number;
}

interface PaymentMethod {
    category: string;
    code: string;
    name: string;
    image: string;
    minimum_amount: number;
    maximum_amount: number;
    fee: PaymentMethodFee;
}

interface PaymentGateway {
    provider: string
    name: string
    checkout_url: string
    instructions: object
}