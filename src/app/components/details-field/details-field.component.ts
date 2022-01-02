import {Component, OnInit} from '@angular/core';
import {DetailsService} from '../../services/details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details-field',
  templateUrl: './details-field.component.html',
  styleUrls: ['./details-field.component.css']
})
export class DetailsFieldComponent implements OnInit {

  title = '[title]';
  description = '[description]';
  private route = '/default-route';
  imgUrl = '/';

  constructor(private detailsService: DetailsService, private router: Router) {
  }

  static openWindow(): void {
    const wrapper = document.getElementById('details-wrapper');
    wrapper.classList.remove('slide-out');
    wrapper.classList.add('slide-in');
    wrapper.style.left = '8px';
  }

  ngOnInit(): void {
    this.detailsService.currentMessage.subscribe(data => this.changeDetails(data));
  }

  closeWindow(): void {
    const wrapper = document.getElementById('details-wrapper');
    wrapper.classList.remove('slide-in');
    wrapper.classList.add('slide-out');
    wrapper.style.left = '-366px';
  }

  changeDetails(data: string): void {
    const values = data.split(';');
    this.title = values[0];
    this.description = values[1];
    this.imgUrl = values[2];
    this.route = values[3];

    const icon = document.getElementById('nav-icon');
    const text = document.getElementById('nav-text');
    if (this.route === this.router.url) {
      text.innerText = 'Brak przejścia';
      icon.innerText = 'cancel';
    } else {
      text.innerText = 'Przejdź dalej';
      icon.innerText = 'arrow_forward';
    }
  }

  onClick(): void {
    if (this.route !== this.router.url) {
      this.router.navigate([this.route]).then(
        () => console.log('navigated to ' + this.route));
    }
    this.closeWindow();
  }
}
