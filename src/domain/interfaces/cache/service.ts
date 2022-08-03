export interface ICacheService {
  del(...keys: string[]): Promise<1 | 0>;
  set<T>(key: string, payload: T): Promise<'OK' | null>;
  get<T>(key: string): Promise<T | null>;
  update<T>(key: string, payload: T): Promise<'OK' | null>;
  has(key: string): Promise<1 | 0>;
}
