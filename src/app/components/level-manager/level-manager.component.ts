import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-level-manager',
  templateUrl: './level-manager.component.html',
  styleUrls: ['./level-manager.component.css']
})
export class LevelManagerComponent implements OnInit {
  @ViewChild('wrapper', {static: true}) wrapperElement: ElementRef;

  levels: any = [
    {path: '', start: 0, levels: 0},
    {path: 'floor', start: -1, levels: 4},
    {path: 'workshop', start: 0, levels: 2},
  ];
  private path = '';
  private startLevel = 0;
  private levelsNum = 0;
  private wrapper: any;

  constructor(private dataService: DataService, private router: Router) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.levels.forEach((e) => {
          if (e.path === ev.url.split('/')[1]) {
            this.path = e.path;
            this.startLevel = e.start;
            this.levelsNum = e.levels;

            this.renderFloors();
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.wrapper = this.wrapperElement.nativeElement;
    this.setStyles();
  }

  setStyles(): void {
    this.wrapper.innerHTML = '';
    const iconWrapper = document.getElementById('icon-wrapper');
    if (this.levelsNum === 0) {
      iconWrapper.style.borderTopLeftRadius = '25px';
      iconWrapper.style.borderTopRightRadius = '25px';
      this.wrapper.style.height = '100px';
    } else {
      iconWrapper.style.borderTopLeftRadius = '0px';
      iconWrapper.style.borderTopRightRadius = '0px';
      this.wrapper.style.height = ((101 * this.levelsNum) + 100) + 'px';
    }
  }

  renderFloors(): void {
    this.setStyles();
    for (let i = 0; i < this.levelsNum; i++) {
      const element = document.createElement('div');
      element.className = 'level-button';
      if (i === 0) {
        element.style.borderTopLeftRadius = '25px';
        element.style.borderTopRightRadius = '25px';
      }
      element.onclick = () => {
        this.router
          .navigate(['/' + this.path + '/' + (this.startLevel + (this.levelsNum - i))])
          .then(() => console.log('changed floor'));
      };

      const text = document.createElement('p');
      text.className = 'level-text';
      text.innerText = (this.startLevel + (this.levelsNum - i - 1)).toString();
      element.append(text);

      this.wrapper.append(element);
    }
  }

  routeHome(): void {
    this.router.navigate(['/']).then(() => console.log('navigated /'));
  }
}
