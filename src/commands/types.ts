import type { Command } from "commander";
import type Action from "../actions/types";
/**
 * All the other commands in the cli
 * will extend this base command class.
 */
export default abstract class Cmd {
    constructor(protected action: Action) {}
    abstract register(cmd: Command): Promise<void>;
}
