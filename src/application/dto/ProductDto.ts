export class ProductDto {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly description: string,
      public readonly price: number,
      public readonly stock: number
    ) {}
  }
  