import { Component, HostListener } from '@angular/core';

import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SafePipe } from '../musor/safe.pipe';
import { CommonModule } from '@angular/common';
import { PlyrModule } from 'ngx-plyr';

@Component({
  selector: 'app-gallery',
  imports: [NgxGalleryModule, SafePipe, CommonModule, PlyrModule],
  templateUrl: './app-gallery.component.html',
  styleUrl: './app-gallery.component.scss',
})
export class AppGalleryComponent {
  cards = [
    {
      title: '1. Vorbeugung von Karies',
      description:
        'Karies ist eine der häufigsten Zahnkrankheiten. Sie entsteht durch den Abbau von Zahnschmelz durch Säuren, die von Bakterien im Zahnbelag produziert werden. Regelmäßiges Zähneputzen hilft, den Zahnbelag zu entfernen und Karies vorzubeugen',
      videoUrl: 'https://www.youtube.com/watch?v=jMPbv6-b62s',
    },
    {
      title: '2. Pflege des Zahnfleisches',
      description:
        ' Zahnfleischerkrankungen wie Gingivitis und Parodontitis können nicht nur unangenehme Beschwerden verursachen, sondern auch zu Zahnverlust führen. Regelmäßiges Zähneputzen, die Verwendung von Zahnseide und Besuche beim Zahnarzt helfen, die Gesundheit des Zahnfleisches zu erhalten.',
      videoUrl: 'https://www.youtube.com/watch?v=QQMEgJilnSA',
    },
    {
      title: '3. Vorbeugung von schlechtem Atem',
      description:
        ' Schlechter Atem ist oft das Ergebnis von Zahnbelag und Bakterien. Eine tägliche Zahnpflege hilft, dieses unangenehme Symptom zu vermeiden und sorgt für frischen Atem.',
      videoUrl: 'https://www.youtube.com/watch?v=01SPFptYzxE',
    },
    {
      title: '4. Verbesserung der allgemeinen Gesundheit',
      description:
        ' Der Zustand der Mundhöhle kann sich auf die allgemeine Gesundheit auswirken. Bakterien aus dem Zahnfleisch und den Zähnen können in den Blutkreislauf gelangen und das Herz, die Lungen und andere Organe beeinflussen. Zahnpflege hilft, die Entwicklung von Krankheiten zu verhindern.',
      videoUrl: 'https://www.youtube.com/watch?v=RyxMQJPg7zE',
    },
    {
      title: '5. Regelmäßige Zahnarztbesuche',
      description:
        'Wichtig ist auch der regelmäßige Besuch beim Zahnarzt. Auch wenn keine Beschwerden vorliegen, helfen Vorsorgeuntersuchungen, mögliche Probleme frühzeitig zu erkennen, was eine weniger schmerzhafte und kostengünstigere Behandlung ermöglicht.',
      videoUrl: 'https://www.youtube.com/watch?v=YBWSDcxuOzo',
    },
    {
      title: '6. Richtige Ernährung',
      description:
        'Eine gesunde Ernährung spielt ebenfalls eine wichtige Rolle bei der Zahnpflege. Lebensmittel, die reich an Kalzium, Vitamin D und Phosphor sind, tragen zur Stärkung des Zahnschmelzes bei.',
      videoUrl: 'https://www.youtube.com/watch?v=LjQMuSNW5LA&t=266s',
    },
  ];

  isModalOpen: boolean = false;
  videoUrl: string = '';

  openVideo(videoUrl: string) {
    console.log('Opening video with URL:', videoUrl);
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
}
