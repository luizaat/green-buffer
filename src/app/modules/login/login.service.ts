import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const WaitForSeconds = () => new Promise<void>((resolve, reject) => {   setTimeout(() => {     resolve();   }, 1500) });
export type Anime = {name: string, author?: {name: string}}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {  }

  async getAnimeList(): Promise<Anime[]>{
    return this.http.get<Anime[]>('/fodac').toPromise()
  }
}
