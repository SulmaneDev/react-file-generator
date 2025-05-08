export type Input = { name: string; value?: any };
export type ICommand = Input[];


/**
 * All the other actions in the cli
 * will extend this base action class.
 */
export default abstract class Action {
    abstract execute(
        cmd?: ICommand,
        flags?: ICommand,
        extra?: ICommand,
    ): Promise<void>;
}
