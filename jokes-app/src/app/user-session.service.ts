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

  getJokeLike(jokeId:number): boolean {
    let likedJokes: number [] = JSON.parse(sessionStorage.getItem('likedJokes') || '[]')
    
    if (likedJokes.includes(jokeId) ){
      return true;

    } else {
      return false;
    }

 }

 getJokeDislike(jokeId:number): boolean {

  let dislikedJokes: number [] = JSON.parse(sessionStorage.getItem('dislikedJokes') || '[]');

  if (dislikedJokes.includes(jokeId) ){
    return true;

  } else {
    return false;
  }

 }


 addComment(jokeId:number, userName:string, comment:string) {

  let comments: string [][] = JSON.parse(sessionStorage.getItem('comments') || '[]')
  let AddComment: string[] = [];
  AddComment.push(JSON.stringify(jokeId),userName,comment)
  comments.push(AddComment)
  sessionStorage.setItem('comments', JSON.stringify(comments))
 }

 getComments(jokeId:number): string [][] {
  let Allcomments: string [][] = JSON.parse(sessionStorage.getItem('comments') || '[]')
  let comments: string [][] =[]

  Allcomments.forEach( comment => {
    if (comment[0]== JSON.stringify(jokeId)){
      comments.push(comment)
    }

  })
   return comments

 }
}
