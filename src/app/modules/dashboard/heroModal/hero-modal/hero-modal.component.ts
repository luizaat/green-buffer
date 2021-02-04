import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../dashboard/dashboard.component';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-hero-modal',
  templateUrl: './hero-modal.component.html',
  styleUrls: ['./hero-modal.component.scss'],
})
export class HeroModalComponent implements OnInit {
  hero: Hero = null as any;
  heroForm: FormGroup = null as any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Hero,
    public dialogRef: MatDialogRef<HeroModalComponent>
  ) {
    if (data) {
      this.hero = data;
      return;
    }
    this.hero = {
      id: Math.random(),
      name: '',
      age: 0,
      description: '',
      home_planet: '',
      sector: '',
      avatar: '',
    };
  }

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero.name, [Validators.required]),
      description: new FormControl(this.hero.description, [
        Validators.required,
      ]),
      age: new FormControl(this.hero.age, [Validators.required]),
      sector: new FormControl(this.hero.sector, [Validators.required]),
      home_planet: new FormControl(this.hero.home_planet, [
        Validators.required,
      ]),
      avatar: new FormControl(this.hero.avatar, [Validators.required]),
    });
  }
  get name() {
    return this.heroForm.get('name');
  }
  get description() {
    return this.heroForm.get('description');
  }
  get age() {
    return this.heroForm.get('age');
  }
  get sector() {
    return this.heroForm.get('sector');
  }
  get home_planet() {
    return this.heroForm.get('home_planet');
  }
  get avatar() {
    return this.heroForm.get('avatar');
  }

  submit() {
    const controls = this.heroForm.controls;
    if (this.heroForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const newHero: Hero = {
      ...this.hero,
      name: controls.name.value,
      description: controls.description.value,
      age: controls.age.value,
      sector: controls.sector.value,
      avatar: controls.avatar.value,
      home_planet: controls.home_planet.value,
    };
    
    this.dialogRef.close(newHero)
  }
}
