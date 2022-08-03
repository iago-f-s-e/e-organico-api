import { httpClient } from '../config';

export class HttpService {
  constructor(private readonly http = httpClient) {}

  public async post<Res, Req = unknown>(url: string, data: Req): Promise<Res> {
    return (await this.http.post<Res>(url, data)).data;
  }

  public async put<Res, Req = unknown>(url: string, data: Req): Promise<Res> {
    return (await this.http.put<Res>(url, data)).data;
  }
}
