import { IFileAccess } from "./fileAccess";

interface ICommand {
  execute(): void;
}

export class ReadFileCommand implements ICommand {
  private fileAccess: IFileAccess;
  private path: string;

  constructor(fileAccess: IFileAccess, path: string) {
    this.fileAccess = fileAccess;
    this.path = path;
  }

  execute(): void {
    try {
      const content = this.fileAccess.readFile(this.path);
      console.log("File content:", content);
    } catch (error) {
      console.error(error.message);
    }
  }
}

// Команда для записи в файл
export class WriteFileCommand implements ICommand {
  private fileAccess: IFileAccess;
  private path: string;
  private data: string;

  constructor(fileAccess: IFileAccess, path: string, data: string) {
    this.fileAccess = fileAccess;
    this.path = path;
    this.data = data;
  }

  execute(): void {
    try {
      this.fileAccess.writeFile(this.path, this.data);
      console.log("File written successfully");
    } catch (error) {
      console.error(error.message);
    }
  }
}

export class DeleteFileCommand implements ICommand {
  private fileAccess: IFileAccess;
  private path: string;

  constructor(fileAccess: IFileAccess, path: string) {
    this.fileAccess = fileAccess;
    this.path = path;
  }

  execute(): void {
    try {
      this.fileAccess.deleteFile(this.path);
      console.log("File deleted successfully");
    } catch (error) {
      console.error(error.message);
    }
  }
}
