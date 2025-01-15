import { AppContext } from './AppContext';
import { CorrelationContext } from './CorrelationContext';
import { IIdentityContext } from './IIdentityContext';

export class AppContextFactory {
  createFromCorrelationContext(correlationContext: CorrelationContext): AppContext {
    const identity: IIdentityContext = {
      isAuthenticated: correlationContext.user?.isAuthenticated || false,
      userId: correlationContext.user?.id || null,
    };

    return new AppContext(correlationContext.correlationId, identity);
  }

  createEmpty(): AppContext {
    return AppContext.Empty;
  }
}
