import {Component, OnInit} from '@angular/core';
import {DetailsService} from '../../services/details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details-field',
  templateUrl: './details-field.component.html',
  styleUrls: ['./details-field.component.css']
})
export class DetailsFieldComponent implements OnInit {

  currentEntry: any;

  constructor(private detailsService: DetailsService, private router: Router) {
  }

  static openWindow(entry: any): void {
    this.setWindowState(entry, 'out', 'in', true, '8px');
  }

  static closeWindow(entry: any): void {
    this.setWindowState(entry, 'in', 'out', false, '-366px');
  }

  static setWindowState(entry: any, s1: string, s2: string, type: boolean, val: string): void {
    const wrapper = document.getElementById('details-wrapper');
    wrapper.classList.remove('slide-' + s1);
    wrapper.classList.add('slide-' + s2);
    wrapper.style.left = val;

    this.highlightFields(entry.highlight, type);
  }

  static highlightFields(fields: string[], type: boolean): void { // if type === false then remove highlight
    if (fields !== undefined) {
      fields.forEach((field) => {
        const element = document.getElementById(field);
        try {
          if (type) {
            element.classList.remove('remove-highlight');
            element.classList.add('set-highlight');
          } else {
            element.classList.remove('set-highlight');
            element.classList.add('remove-highlight');
          }
        } catch (e) {
        }
      });
    }
  }

  ngOnInit(): void {
    this.detailsService.currentMessage.subscribe(data => this.updateDetails(data));
  }

  updateDetails(data: any): void {
    const values = data.split(';');
    // const ids = values[1].split(',');
    let ids = values[1];
    if (ids !== undefined) {
      ids = ids.split(',');
    }
    let highlight = values[2];
    if (highlight !== undefined) {
      highlight = highlight.split(',');
    }

    this.currentEntry = {
      title: values[0],
      ids,
      highlight,
      description: values[3],
      imgUrl: values[4],
      route: values[5]
    };

    const icon = document.getElementById('nav-icon');
    const text = document.getElementById('nav-text');
    if (this.currentEntry.route === this.router.url) {
      text.innerText = 'Brak przejścia';
      icon.innerText = 'cancel';
    } else {
      text.innerText = 'Przejdź dalej';
      icon.innerText = 'arrow_forward';
    }
  }

  onClick(): void {
    if (this.currentEntry.route !== this.router.url) {
      this.router.navigate([this.currentEntry.route]).then(
        () => console.log('navigated to ' + this.currentEntry.route));
    }
    DetailsFieldComponent.closeWindow(this.currentEntry);
  }

  closeWindow(): void {
    DetailsFieldComponent.closeWindow(this.currentEntry);
  }
}
