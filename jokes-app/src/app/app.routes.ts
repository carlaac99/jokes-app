import { Routes } from '@angular/router';
import { JokesListComponent } from './jokes-list/jokes-list.component';
import { CommentsComponent } from './comments/comments.component';

export const routes: Routes = [
    {path:'', component:JokesListComponent},
    {path:'comments/:id', component:CommentsComponent}
];
