import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { PictureComponent } from '../picture/picture.component';
import { AppGalleryComponent } from '../app-gallery/app-gallery.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, PictureComponent, AppGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
