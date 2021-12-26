import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import * as $ from 'jquery';
// @ts-ignore
import database from '../database.json';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit, OnDestroy {

  clickStatus: boolean;
  subscription: Subscription;

  public classesList: { title: string, ids: string[], route: string }[] = database;

  constructor(private data: DataService, private router: Router) {
  }

  ngOnInit(): void {
    document.querySelectorAll('*[id]').forEach(e => {
      // console.log(e.id);
      if (e.id !== 'frame' && e.id !== 'object') {
        const el = $('#' + e.id);
        el.on('click', () => this.onClick(e.id));
      }
    });

    this.subscription = this.data.currentMessage.subscribe(message => {
      this.clickStatus = message.toString() === 'true';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(id: string): void {
    this.classesList.forEach(value => {
      value.ids.forEach(e => {
        if (e === id) {
          console.log(value.title);
          this.router.navigate([value.route]).then(() => console.log('navigated to ' + value.route));
        }
      });
    });
  }

}
