import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SafePipe } from '../musor/safe.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgxGalleryModule, SafePipe, CommonModule],
  templateUrl: './app-gallery.component.html',
  styleUrls: ['./app-gallery.component.scss'],
})
export class AppGalleryComponent {
  @ViewChild('cardsWrapper', { static: false }) cardsWrapper!: ElementRef;

  cards = [
    {
      title: '1. Vorbeugung von Karies',
      videoUrl: 'https://www.youtube.com/watch?v=jMPbv6-b62s',
      picture: '../musor/pictures/zeahne.webp',
    },
    {
      title: '2. Pflege des Zahnfleisches',
      videoUrl: 'https://www.youtube.com/watch?v=QQMEgJilnSA',
      picture: '../musor/pictures/zeahne.webp',
    },
    {
      title: '3. Vorbeugung von schlechtem Atem',
      videoUrl: 'https://www.youtube.com/watch?v=01SPFptYzxE',
      picture: '../musor/pictures/zeahne.webp',
    },
    {
      title: '4. Verbesserung der allgemeinen Gesundheit',
      videoUrl: 'https://www.youtube.com/watch?v=RyxMQJPg7zE',
      picture: '../musor/pictures/zeahne.webp',
    },
    {
      title: '5. Regelmäßige Zahnarztbesuche',
      videoUrl: 'https://www.youtube.com/watch?v=YBWSDcxuOzo',
      picture: '../musor/pictures/zeahne.webp',
    },
    {
      title: '6. Richtige Ernährung',
      videoUrl: 'https://www.youtube.com/watch?v=LjQMuSNW5LA&t=266s',
      picture: '../musor/pictures/zeahne.webp',
    },
  ];

  isModalOpen: boolean = false;
  videoUrl: string = '';

  openVideo(videoUrl: string) {
    this.videoUrl = this.convertToEmbedUrl(videoUrl);
    this.isModalOpen = true;
  }

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:click', ['$event'])
  closeVideo(event: KeyboardEvent | MouseEvent) {
    if ('key' in event && event.key === 'Escape') {
      this.videoUrl = '';
      this.isModalOpen = false;
      return;
    }
    if ('target' in event) {
      const modalContent = document.querySelector('.modal-content');
      const closeButton = document.querySelector('.close-button');
      if (
        (modalContent && !modalContent.contains(event.target as Node)) ||
        (closeButton && closeButton.contains(event.target as Node))
      ) {
        this.videoUrl = '';
        this.isModalOpen = false;
      }
    }
  }

  convertToEmbedUrl(url: string): string {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  scrollLeft() {
    this.cardsWrapper.nativeElement.scrollBy({
      left: -360,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.cardsWrapper.nativeElement.scrollBy({
      left: 360,
      behavior: 'smooth',
    });
  }
}
