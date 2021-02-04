import { Component, OnInit } from '@angular/core';
import { Anime, LoginService } from '../login.service';

type User = {name: string, age: number, gender?: 'm' | 'f' | 'o'}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  user: User = null as any
  animes: Anime[] = []
  isFetching = false

  constructor(private loginService: LoginService) { }

  async ngOnInit() {
    const userName = localStorage.getItem('user')
    this.user = !!userName && JSON.parse(userName)
    this.isFetching = true;
    this.animes = await this.loginService.getAnimeList();
    this.isFetching = false;
  }

}
