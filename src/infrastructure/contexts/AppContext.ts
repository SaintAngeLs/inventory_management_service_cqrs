import { IIdentityContext } from './IIdentityContext';

export class AppContext {
  public readonly requestId: string;
  public readonly identity: IIdentityContext;

  constructor(requestId: string, identity: IIdentityContext) {
    this.requestId = requestId;
    this.identity = identity;
  }

  static Empty = new AppContext('', { isAuthenticated: false, userId: null });
}