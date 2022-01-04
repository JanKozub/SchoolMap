import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-level-manager',
  templateUrl: './level-manager.component.html',
  styleUrls: ['./level-manager.component.css']
})
export class LevelManagerComponent implements OnInit {
  @ViewChild('wrapper', {static: true}) wrapperElement: ElementRef;

  startLevel = -1;
  levelsNum = 4;

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.wrapperElement.nativeElement.style.height = ((100 * this.levelsNum) + 100) + 'px';
    document.getElementById('icon-wrapper').style.top = ((100 * this.levelsNum) + 4) + 'px';
    for (let i = 0; i < this.levelsNum; i++) {
      const element = document.createElement('div');
      element.className = 'level-button';
      element.style.width = '100px';
      element.style.height = '100px';
      if (i === 0) {
        element.style.borderTopLeftRadius = '25px';
        element.style.borderTopRightRadius = '25px';
      }
      const text = document.createElement('p');
      text.className = 'level-text';
      text.innerText = (this.startLevel + (this.levelsNum - i - 1)).toString();
      element.append(text);

      this.wrapperElement.nativeElement.append(element);
    }
  }
}
