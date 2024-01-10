import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css',
})
export class LazyImageComponent implements OnInit {
  @Input()
  url!: string;

  @Input()
  alt!: string;

  @Input()
  className?: string;

  hasLoaded: boolean = false;

  ngOnInit() {
    if (!this.url) throw new Error('"url" property is required');
    if (!this.alt) throw new Error('"alt" property is required');
  }

  onLoad() {
    this.hasLoaded = true;
  }
}
