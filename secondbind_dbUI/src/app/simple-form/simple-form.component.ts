import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent {
  constructor(private fb: FormBuilder, private bookService: BookService) {}

  genreList: any = [];

  bookForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genres: ['', Validators.required],
    pubYear: ['', Validators.required],
    ISBN: [
      '',
      [Validators.required, Validators.minLength(13), Validators.maxLength(13)],
    ],
  });

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  disableSubmit: boolean = true;
  showError: boolean = false;
  showSuccess: boolean = false;

  submitForm() {
    try {
      const formData: any = {
        title: this.bookForm.value.title,
        author: this.bookForm.value.author,
        genres: this.bookForm.value.genres,
        pubYear: this.bookForm.value.pubYear,
        ISBN: this.bookForm.value.ISBN,
      };

      console.log(formData);

      let responseMsg;
      const response: any = this.bookService
        .addBook(formData)
        .subscribe((res: any) => {
          console.log('In bookService.addBook(), response:', res);
          if (res.spSuccess == false) {
            console.log('error found!');
            this.showError = true;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
          } else if (res.spSuccess) {
            this.showSuccess = true;
            setTimeout(() => {
              this.showSuccess = false;
            }, 3000);
          }
        });
    } catch (err: any) {
      console.log('ERROR!!!!');
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    }
  }

  checkForm() {
    console.log(this.bookForm);
    this.disableSubmit = this.bookForm.valid ? false : true;
    console.log(this.disableSubmit);
  }
}
