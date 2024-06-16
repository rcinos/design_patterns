type TPermission = "read" | "write" | "delete";

interface TUser {
  readonly name: string;
  permissions: TPermission[];
  readonly role: string;

  createUser(name: string): TUser;
}

export class User implements TUser {
  name: string;
  permissions: TPermission[] = ["read"];
  role: string = "user";

  constructor(name: string) {
    this.name = name;
  }

  createUser(name: string): User {
    return new User(name);
  }
}

export class Admin implements TUser {
  name: string;
  readonly permissions: TPermission[] = ["read", "write", "delete"];
  readonly role: string = "admin";

  constructor(name: string) {
    this.name = name;
  }

  createUser(name: string): User {
    return new User(name);
  }

  createAdmin(name: string): Admin {
    return new Admin(name);
  }

  addPermissionToUser(user: User, permission: TPermission): void {
    if (user.permissions.includes(permission)) {
      throw new Error("User already has this permission");
    }
    user.permissions.push(permission);
  }
}
