
interface ILocalStorageService<T> {
  setItem(value: T): void;
  getItem(): T;
  removeItem(): void;
}

export class LocalStorageManagerService<T> implements ILocalStorageService<T> {

  private nameKey: string = "comun";
  constructor(namekey:string) { this.nameKey = namekey;}

  setItem(value: T): void {
    const encodedValue = btoa(JSON.stringify(value));
    localStorage.setItem(this.nameKey, encodedValue);
  }
  getItem(): T {
    const item =localStorage.getItem(this.nameKey);
    return item?JSON.parse(atob(item)):null;
  }
  removeItem(): void {
    localStorage.removeItem(this.nameKey);
  }
}
