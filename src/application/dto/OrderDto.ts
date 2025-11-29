export class OrderDto {
    constructor(
      public readonly id: string,
      public readonly customerId: string,
      public readonly products: { productId: string; quantity: number }[],
      public readonly totalAmount: number,
      public readonly timestamp: Date
    ) {}
  }
  