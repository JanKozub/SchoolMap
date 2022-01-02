import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import database from '../../../assets/database.json';
import {Router} from '@angular/router';
import {DetailsFieldComponent} from '../details-field/details-field.component';
import {DetailsService} from '../../services/details.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('textField', {static: true}) textField: ElementRef;

  controller = new FormControl();
  filteredOptions: Observable<string[]>;

  public classesList: {
    title: string,
    ids: string[],
    highlight: string[],
    description: string,
    imgUrl: string,
    route: string
  }[] = database;

  classes = [];

  constructor(private router: Router, private detailsService: DetailsService) {
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
    let entry = null;
    for (const newEntry of database) {
      if (newEntry.title === this.getField().value) {
        entry = newEntry;
        break;
      }
    }

    if (entry !== null) {
      console.log('found direction');
      this.router.navigate([entry.route]).then(() => {
        this.detailsService.changeDetails(entry);
        DetailsFieldComponent.openWindow(entry);

        document.getElementById(entry.highlight).classList.add('set-highlight');

        this.filteredOptions = this.controller.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
        this.textField.nativeElement.blur();
      });
    } else {
      console.log('direction not found');
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
