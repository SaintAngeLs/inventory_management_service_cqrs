export class CorrelationContext {
    public correlationId: string;
    public traceId: string;
    public user: UserContext;
    public resourceId?: string;
  
    constructor(
      correlationId: string,
      traceId: string,
      user: UserContext,
      resourceId?: string
    ) {
      this.correlationId = correlationId;
      this.traceId = traceId;
      this.user = user;
      this.resourceId = resourceId;
    }
  }
  
  export interface UserContext {
    id: string;
    isAuthenticated: boolean;
    role: string;
    claims: Record<string, string>;
  }
  