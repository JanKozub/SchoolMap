import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import database from '../../../assets/database.json';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('textField', {static: true}) textField: ElementRef;

  controller = new FormControl();
  filteredOptions: Observable<string[]>;

  public classesList: { title: string, ids: string[], route: string }[] = database;
  classes = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    database.forEach(el => {
      this.classes.push(el.title);
    });

    this.filteredOptions = this.controller.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  onChange(): void {
    console.log(this.getField().value);
    let swt = false;
    let route = '';
    database.forEach(el => {
      if (el.title === this.getField().value) {
        swt = true;
        route = el.route;
      }
    });

    if (swt) {
      console.log('miejsce istnieje');
      this.router.navigate([route]).then(() => console.log('found dir'));
    } else {
      console.log('miejsce nie istnieje');
    }
    this.getField().value = '';
  }

  getField(): any {
    return this.textField.nativeElement;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.classes.filter(option => option.toLowerCase().includes(filterValue));
  }
}
