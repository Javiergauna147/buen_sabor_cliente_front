
interface ILocalStorageService<T> {
  setItem(value: T): T;
  getItem(): T;
  removeItem(): void;
}

export class LocalStorageManagerService<T> implements ILocalStorageService<T> {

  private nameKey: string = "comun";
  constructor(namekey:string) { this.nameKey = namekey;}

  setItem(value: T): T {
    const encodedValue = btoa(JSON.stringify(value));
    localStorage.setItem(this.nameKey, encodedValue);
    return value;
  }
  getItem(): T {
    const item =localStorage.getItem(this.nameKey);
    return item?JSON.parse(atob(item)):null;
  }
  removeItem(): void {
    localStorage.removeItem(this.nameKey);
  }
}
