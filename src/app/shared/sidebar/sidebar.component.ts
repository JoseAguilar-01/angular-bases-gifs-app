import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get tagsHistory() {
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string) {
    if (this.gifsService.tagInput) {
      this.gifsService.tagInput.nativeElement.value = tag;
    }

    this.gifsService.searchTag(tag);
  }

  deleteTag(tag: string) {
    this.gifsService.deleteTag(tag);
  }
}
