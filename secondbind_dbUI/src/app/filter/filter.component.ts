import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private genreService: GenreService,
    private bookService: BookService
  ) {}

  genreList: any = [];
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  showGenres = false;
  genreBtnText = 'Show Genres';
  copyButton = 'Copy to Clipboard';
  genreArray: Array<String> = [];

  exportView = 'TABLE';

  filterArray: any;
  exportJSON: any;

  ngOnInit() {
    let response: any;
    this.genreService.getGenres().subscribe((g: any) => {
      if (g) {
        response = g.recordset;
        console.log('genreList is', response);
      }
      //
      console.log(response);
      response.map((record: any) => {
        console.log('This record is', record);
        let arr = record.Genre.split(',');
        console.log('arr:', arr);
        this.genreList = this.genreList.concat(arr);
        console.log('in loop', this.genreList);
        // this.genreList.push(record.Genre);
      });
      this.genreList = [...new Set(this.genreList)];
    });
    console.log('this.genreList is', this.genreList);
  }

  filterCriteria: FormGroup = this.fb.group({
    title: [''],
    author: [''],
    genres: [''],
    startDate: ['', [Validators.min(1), Validators.max(this.currentYear)]],
    endDate: ['', [Validators.max(this.currentYear)]],
    ISBN: [''],
  });

  showList() {
    this.showGenres = !this.showGenres;
    this.genreBtnText = this.showGenres ? 'Hide Genres' : 'Show Genres';
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      console.log('check');
      this.genreArray.push(event.target.value);
    } else {
      console.log('uncheck');
      this.genreArray = this.genreArray.filter(
        (genre) => genre !== event.target.value
      );
    }
    console.log(this.genreArray);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(this.filterArray));
    this.copyButton = 'Copied!';
    setTimeout(() => {
      this.copyButton = 'Copy to Clipboard';
    }, 1500);
  }

  submitForm() {
    const formData: any = {
      title: this.filterCriteria.value.title,
      author: this.filterCriteria.value.author,
      genres: this.genreArray,
      startDate: this.filterCriteria.value.startDate,
      endDate: this.filterCriteria.value.endDate,
      ISBN: this.filterCriteria.value.ISBN,
    };

    console.log(formData);

    const response = this.bookService
      .filterBooks(formData)
      .subscribe((data: any) => {
        console.log('In bookService.filterBook(), response:', data);
        this.filterArray = data.recordset;
      });
  }

  switchView() {
    this.exportView = this.exportView == 'JSON' ? 'TABLE' : 'JSON';
    console.log('exportView is now', this.exportView);
  }
}
