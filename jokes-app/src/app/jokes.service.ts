import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joke } from './joke';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private jokes_url = 'http://localhost:4400/'

  constructor(private http: HttpClient) { }

  getJokes(amount:number,uncensored:boolean): Observable<Joke[]>{
    

   return this.http.get<Joke[]>(`${this.jokes_url}jokes/${amount}/${uncensored}`);
  }

  setUserSession(userId:string){
    localStorage.setItem('userId',userId)
  }



}
