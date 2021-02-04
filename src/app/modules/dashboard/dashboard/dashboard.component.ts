import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HeroModalComponent } from '../heroModal/hero-modal/hero-modal.component';
import HeroesMock from './heroesMock.json';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

export type Hero = {
  id: number;
  name: string;
  avatar: string;
  description: string;
  sector: string;
  age: number;
  home_planet: string;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  breakpointValue = 4;
  perPage = 4;
  page = 1;
  heroesTotal = 0;
  
  constructor(
    breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {
    breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.breakpointValue = 16;
        }
      });
    breakpointObserver
      .observe([Breakpoints.TabletPortrait, Breakpoints.Tablet])
      .subscribe((result) => {
        if (result.matches) {
          this.breakpointValue = 8;
        }
      });
    breakpointObserver
      .observe([Breakpoints.WebPortrait, Breakpoints.Web])
      .subscribe((result) => {
        if (result.matches) {
          this.breakpointValue = 4;
        }
      });
  }

  openHeroModal(hero?: Hero) {
    const heroModalRef = this.dialog.open(HeroModalComponent, {
      width: '400px',
      data: hero,
    });
    heroModalRef.afterClosed().subscribe((result: Hero) => {
      if (!result) {
        return;
      }
      const heroIndex = this.heroes.findIndex((hero) => hero.id === result.id);
      if (heroIndex === -1) {
        this.heroes.push(result);
      } else {
        this.heroes[heroIndex] = result;
      }
      localStorage.setItem('heroes', JSON.stringify(this.heroes));
    });
  }

  async ngOnInit() {
    let heroes = localStorage.getItem('heroes');
    if (!heroes) {
      localStorage.setItem('heroes', JSON.stringify(HeroesMock));
      heroes = localStorage.getItem('heroes');
    }
    this.heroes = JSON.parse(`${heroes}`);
    this.heroesTotal = this.heroes.length;
  }

  paginate(array: Hero[], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  changePage(e: any){
    this.page = e.pageIndex + 1
    this.perPage = e.pageSize
  }
}
