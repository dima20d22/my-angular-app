import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { PictureComponent } from '../picture/picture.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, PictureComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
