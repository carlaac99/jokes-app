import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joke } from './joke';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private node_url = 'http://localhost:4400/'

  constructor(private http: HttpClient) { }

  getJokes(): Observable<Joke[]>{

   return this.http.get<Joke[]>(this.node_url+"jokes");
  }
  setUserSession(userId:string){
    localStorage.setItem('userId',userId)
  }

}
