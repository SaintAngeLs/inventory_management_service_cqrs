export abstract class DomainException extends Error {
    public readonly code: string;
  
    protected constructor(message: string, code: string) {
      super(message);
      this.code = code;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  