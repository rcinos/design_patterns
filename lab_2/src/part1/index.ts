import { Admin } from "./user";
import { FileAccessProxy } from "./fileAccess";
import { ReadFileCommand, WriteFileCommand } from "./command";

const user = new Admin("user");

const fileAccessProxy = new FileAccessProxy(user.permissions);

const readCommand = new ReadFileCommand(
  fileAccessProxy,
  "sources/example2.txt",
);
const writeCommand = new WriteFileCommand(
  fileAccessProxy,
  "sources/example2.txt",
  "Hello, world lalalal!",
);

writeCommand.execute();
readCommand.execute();
