import boxen, { type Options } from "boxen";

export default function Box(value: string, options?: Options) {
    console.log(boxen(value, options));
}
