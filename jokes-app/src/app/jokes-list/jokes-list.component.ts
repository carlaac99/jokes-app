import { Component,OnInit, inject } from '@angular/core';
import { JokesService } from '../jokes.service';
import { Joke } from '../joke';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserSessionService } from '../user-session.service';
import {MatDialog} from '@angular/material/dialog';
import { CommentsComponent } from '../comments/comments.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-jokes-list',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './jokes-list.component.html',
  styleUrl: './jokes-list.component.css'
})
export class JokesListComponent implements OnInit {
  // jokesService:   JokesService = inject(JokesService);
  jokes : Joke[] = [];
  likes_count :number =0;
  dislikes_count:number =0;
  userName: string = "";
  comments: string [][] =[]
  uncensored: boolean = false;
  amount:number=0;
   

  constructor (private jokesService :JokesService, private userSession:UserSessionService, private dialog:MatDialog ){}

  ngOnInit(): void {
    console.log("this.jokes: ", this.jokes)
    

    if (this.jokes.length == 0){

      this.jokesService.getJokes(10,false).subscribe(data => {
        this.jokes = data;
        console.log("this.jokes: ", data)
        this.getData()
        })
    } 
  }

  getLike(joke:Joke){
    let wasLiked: boolean =  this.userSession.getJokeLike(joke.id)
    if (wasLiked){
      joke.likes+=1
    }
  }

  getDislike(joke:Joke){

    let wasDisliked: boolean =  this.userSession.getJokeDislike(joke.id)
    if (wasDisliked){
      joke.dislikes+=1
    }
  }

  likes(joke:Joke): void{
    if (this.userSession.likeJoke(joke.id)){
      joke.likes += 1
    }
  }

  disLikes(joke:Joke): void{
    if (this.userSession.dislikeJoke(joke.id)){
      joke.dislikes += 1
    }
  }

  openCommentsDialog(joke:Joke){
    const dialogRef = this.dialog.open(CommentsComponent,{
      height:'400px',
      width: '600px'
    })
    dialogRef.afterClosed().subscribe(data =>{
      this.userName= data[0]
      this.userSession.addComment(joke.id,this.userName,data[1])
      joke.comments = this.userSession.getComments(joke.id)
      console.log("joke comments after adding:",joke.comments)
    })
  }

  getData(){

    this.jokes.forEach( joke =>{
      this.getLike(joke)
      this.getDislike(joke)
       joke.comments=this.userSession.getComments(joke.id)
       console.log(`joke.comments for ${joke.id}:`, joke.comments)
    })
  }

  customJoke(){

    if (this.jokesAmountValidation(this.amount)){
    
        this.jokesService.getJokes(this.amount, this.uncensored).subscribe(data => {
          this.jokes = data;
          console.log("this.jokes: ", data)
          this.getData()
        })

    }
  
  }

  jokesAmountValidation(amount:number): boolean {
    console.log("amount: ", amount)

    if (amount < 1 || amount > 10 ){
      alert("The input value is greater than 10 or less than 0!")
      return false;

    } else {
      console.log("invalid number of jokes")
      return true;
    }
  }


}
