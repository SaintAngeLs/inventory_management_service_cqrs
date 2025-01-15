import { ICommand } from "./ICommand";

export interface ICommandHandler<TCommand extends ICommand> {
    handleAsync(command: TCommand): Promise<void>;
}
  