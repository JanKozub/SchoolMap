import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import database from '../../assets/database.json';
import {DataService} from '../services/data.service';
import {DetailsFieldComponent} from '../components/details-field/details-field.component';
import {DetailsService} from '../services/details.service';

@Component({
  selector: 'app-view-frame',
  template: ''
})

export abstract class ViewComponent<T = any> implements AfterViewInit, OnDestroy {
  clickStatus: boolean;
  subscription: Subscription;

  public classesList: {
    title: string,
    ids: string[],
    highlight: string[],
    description: string,
    imgUrl: string,
    route: string
  }[] = database;

  private lastHighlight: string[];

  protected constructor(private data: DataService, private detailsService: DetailsService) {
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('*[id]').forEach(e => {
      if (e.id !== 'frame' && e.id !== 'object') {
        const el = document.getElementById(e.id);
        el.onclick = () => this.onClick(e.id);
        this.classesList.forEach(entry => {
          entry.ids.forEach(id => {
            if (id === el.id) {
              el.style.cursor = 'pointer';
            }
          });
        });
      }
    });

    this.subscription = this.data.clickStatus.subscribe(message => {
      this.clickStatus = message.toString() === 'true';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(id: string): void {
    if (this.clickStatus) {
      this.classesList.forEach(entry => {
        entry.ids.forEach(e => {
          if (e === id) {
            DetailsFieldComponent.highlightFields(this.lastHighlight, false);

            this.detailsService.changeDetails(entry);
            DetailsFieldComponent.openWindow(entry);
            this.lastHighlight = entry.highlight;
          }
        });
      });
    }
  }
}
