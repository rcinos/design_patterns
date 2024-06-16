import fs from "fs";

export function fileReader(path: string): string[] {
  const data = fs.readFileSync(path, "utf8");
  return data.split("\n").map((str) => str.replace("\r", ""));
}
