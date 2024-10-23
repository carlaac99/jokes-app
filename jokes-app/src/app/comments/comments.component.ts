import { Component,inject } from '@angular/core';
import { FormGroup, FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  dialog = inject (MatDialogRef<CommentsComponent>)

  commentsForm: FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.commentsForm = this.formBuilder.group({
      userName: "",
      comment: ""
    });
  }

  submitComment() {

    const results: string[] = [ this.commentsForm.get('userName')?.value, this.commentsForm.get('comment')?.value];

    this.dialog.close(results)


  }
  onClose(){
    this.dialog.close();
  }

}
