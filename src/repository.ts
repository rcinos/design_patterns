class Repository {
  private static instance: Repository;

  private constructor() {}

  static getInstance() {
    if (!Repository.instance) {
      Repository.instance = new Repository();
    }
    return Repository.instance;
  }
}

export const repository = Repository.getInstance();
