import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LazyImageComponent } from './lazy-image/lazy-image.component';

@NgModule({
  declarations: [SidebarComponent, LazyImageComponent],
  exports: [SidebarComponent, LazyImageComponent],
  imports: [CommonModule],
})
export class SharedModule {}
