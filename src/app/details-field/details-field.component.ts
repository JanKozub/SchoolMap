import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-details-field',
  templateUrl: './details-field.component.html',
  styleUrls: ['./details-field.component.css']
})
export class DetailsFieldComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  closeWindow(): void {
    const wrapper = document.getElementById('details-wrapper');
    wrapper.classList.remove('slide-in');
    wrapper.classList.add('slide-out');
    wrapper.style.left = '-366px';
  }
}
