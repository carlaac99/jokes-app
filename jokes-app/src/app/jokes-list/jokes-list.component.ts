import { Component,OnInit, inject } from '@angular/core';
import { JokesService } from '../jokes.service';
import { Joke } from '../joke';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserSessionService } from '../user-session.service';

@Component({
  selector: 'app-jokes-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './jokes-list.component.html',
  styleUrl: './jokes-list.component.css'
})
export class JokesListComponent implements OnInit {
  // jokesService:   JokesService = inject(JokesService);
  jokes : Joke[] = [];
  likes_count :number =0;
  dislikes_count:number =0;

  constructor (private jokesService :JokesService, private userSession:UserSessionService ){}

  ngOnInit(): void {
    
    console.log("this.jokes: ", this.jokes)
    if (this.jokes.length == 0){
      this.jokesService.getJokes().subscribe(data => {
        this.jokes = data;

        console.log("this.jokes: ", data)
    
        })
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


}
