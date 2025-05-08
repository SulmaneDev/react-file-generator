import type { Command } from "commander";
import Cmd from "./types.js";
import type { ICommand } from "../actions/types.js";
import { GENERATE } from "../lib/constants.js";

export default class Generate extends Cmd {
    async register(cmd: Command): Promise<void> {
        cmd.command(`${GENERATE} <paths...>`)
            .alias("g")
            .description(
                "Scaffold and generate components, pages, layouts, or custom files with optional templates, content, and advanced structure control.",
            )
            .option(
                "-t, --type <type>",
                "Type of file to generate (e.g., component, page, layout, store)",
            )
            .option(
                "-T, --template <name>",
                "Use a specific template (e.g., default, modal, dashboard)",
            )
            .option(
                "-r, --recursive",
                "Generate recursively for nested folders",
            )
            .option(
                "-c, --content",
                "Auto-fill files with default boilerplate content",
            )
            .option("-d, --default", "Use default settings without prompts")
            .option(
                "-n, --name <name>",
                "Custom name for the component or file",
            )
            .option(
                "-l, --lang <language>",
                "Language to use (tsx, jsx, ts, js)",
                "tsx",
            )
            .option(
                "-f, --from-template <template>",
                "Generate using a named template",
            )
            .option(
                "--to <path>",
                "Destination path when using --from-template",
            )
            .option("--dry-run", "Preview output without writing files")
            .option("--force", "Force overwrite of existing files")
            .option("--silent", "Suppress logs")
            .option("--verbose", "Enable detailed output")
            .action(async (paths, options) => {
                const cmd: ICommand = [];
                const flags: ICommand = [];
                cmd.push({
                    name: "generate",
                    value: paths,
                });
                Object.keys(options).forEach((k) => {
                    flags.push({ name: k, value: options[k] });
                });
                await this.action.execute(cmd, flags);
            });
    }
}
