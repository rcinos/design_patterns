export interface IFileAccess {
  readFile(path: string): string;
  writeFile(path: string, data: string): void;
  deleteFile(path: string): void;
}

class FileAccess implements IFileAccess {
  readFile(path: string): string {
    const fs = require("fs");
    return fs.readFileSync(path, "utf8");
  }

  writeFile(path: string, data: string): void {
    const fs = require("fs");
    fs.writeFileSync(path, data, "utf8");
  }

  deleteFile(path: string): void {
    const fs = require("fs");
    fs.unlinkSync(path);
  }
}

export class FileAccessProxy implements IFileAccess {
  private fileAccess: FileAccess;
  private userPermissions: string[];

  constructor(userPermissions: string[]) {
    this.fileAccess = new FileAccess();
    this.userPermissions = userPermissions;
  }

  private checkPermission(operation: string): boolean {
    return this.userPermissions.includes(operation);
  }

  readFile(path: string): string {
    if (this.checkPermission("read")) {
      return this.fileAccess.readFile(path);
    } else {
      throw new Error("Access denied: No read permission");
    }
  }

  writeFile(path: string, data: string): void {
    if (this.checkPermission("write")) {
      this.fileAccess.writeFile(path, data);
    } else {
      throw new Error("Access denied: No write permission");
    }
  }

  deleteFile(path: string): void {
    if (this.checkPermission("delete")) {
      this.fileAccess.deleteFile(path);
    } else {
      throw new Error("Access denied: No delete permission");
    }
  }
}
