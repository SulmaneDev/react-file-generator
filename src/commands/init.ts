import type { Command } from "commander";
import Cmd from "./types.js";

export default class Init extends Cmd {
    async register(cmd: Command): Promise<void> {
        cmd.command("init")
            .alias("in")
            .description(
                "Generates the initial configuration files for an RFG project.",
            )
            .action(async () => {
                await this.action.execute();
            });
    }
}
