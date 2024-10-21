import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor() { }

  likeJoke(jokeId: number): boolean {

    let likedJokes: number[] = JSON.parse(sessionStorage.getItem('likedJokes') || '[]');

    let dislikedJoke : number[] = JSON.parse(sessionStorage.getItem('dislikedJokes') || '[]');

    console.log("likedJokes", likedJokes)
    console.log("dislikedJokes", dislikedJoke)

    if (likedJokes.includes(jokeId) || dislikedJoke.includes(jokeId)){
      console.log("false")
      return false;}

    likedJokes.push(jokeId);

    sessionStorage.setItem('likedJokes', JSON.stringify(likedJokes))
    console.log("true")
    return true;
  }

  dislikeJoke(jokeId: number): boolean {

    let likedJokes: number[] = JSON.parse(sessionStorage.getItem('likedJokes') || '[]');

    let dislikedJoke : number[] = JSON.parse(sessionStorage.getItem('dislikedJokes') || '[]');

    console.log("likedJokes", likedJokes)
    console.log("dislikedJokes", dislikedJoke)

    if (likedJokes.includes(jokeId) || dislikedJoke.includes(jokeId)){
      console.log("false")
      return false;}

    dislikedJoke.push(jokeId);

    sessionStorage.setItem('dislikedJokes', JSON.stringify(dislikedJoke))
    console.log("true")
    return true;

  }

 

}
