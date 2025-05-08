export type Input = { name: string; value?: any };
export type ICommand = Input[];

export default abstract class Action {
    abstract execute(
        cmd: ICommand,
        flags: ICommand,
        extra: ICommand,
    ): Promise<void>;
}
