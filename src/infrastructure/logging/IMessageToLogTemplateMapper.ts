interface IMessageToLogTemplateMapper {
    map<TMessage>(message: TMessage): IHandlerLogTemplate | null;
}