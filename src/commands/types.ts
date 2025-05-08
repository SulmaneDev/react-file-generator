import type { Command } from "commander";
import type Action from "../actions/types";

export default abstract class Cmd {
    constructor(private action: Action) {}
    abstract register(cmd: Command): Promise<void>;
}
