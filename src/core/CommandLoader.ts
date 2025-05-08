import type { Command } from "commander";
import Generate from "../commands/generate.js";
import GenerateA from "../actions/generate.js";

/**
 * Dispatch all commands and actions
 * to the commander.
 */
export default class CommandLoader {
    async load(cmd: Command): Promise<void> {
        new Generate(new GenerateA()).register(cmd);
    }
}
