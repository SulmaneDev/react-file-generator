#!/usr/bin/env node

import { Command } from "commander";
import CommandLoader from "./core/CommandLoader.js";

/**
 * Initializes and parses command-line arguments using the Commander library.
 * This serves as the entry point for setting up CLI commands and options.
 */
async function bootstrap() {
    const cmd = new Command();
    await new CommandLoader().load(cmd);
    cmd.parseAsync(process.argv);
}
await bootstrap();
