import { HttpClient, HttpParams } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] =
    this.getLocalStorage<string[]>('tags-history') ?? [];
  private apiKey: string = 'wYkie3y0jJNRndF6B0J2hG9vQ5ilWYKL';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/search';

  tagInput!: ElementRef<HTMLInputElement>;
  gifsList: Gif[] = [];

  constructor(private http: HttpClient) {
    if (this._tagsHistory.length) {
      this.searchTag(this._tagsHistory[0]);
    }
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private saveInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private getLocalStorage<T = any>(key: string): T | void {
    if (!localStorage.getItem(key)) return;

    return JSON.parse(localStorage.getItem(key)!) as T;
  }

  private organizeHistory(tag: string) {
    const existTag = this._tagsHistory.includes(tag);

    if (existTag) {
      this._tagsHistory = this._tagsHistory.filter(
        (estoredTag) => estoredTag !== tag
      );
    }

    if (this._tagsHistory.length === 10 && !existTag) {
      this._tagsHistory.pop();
    }

    this._tagsHistory.unshift(tag);

    this.saveInLocalStorage('tags-history', JSON.stringify(this._tagsHistory));
  }

  deleteTag(tag: string) {
    const formattedTag = tag.toLocaleLowerCase().trim();

    this._tagsHistory = this._tagsHistory.filter(
      (storedTag) => storedTag !== formattedTag
    );

    this.saveInLocalStorage('tags-history', JSON.stringify(this._tagsHistory));
  }

  searchTag(tag: string) {
    const formattedTag = tag.toLocaleLowerCase().trim();

    if (!formattedTag) return;

    this.organizeHistory(formattedTag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', formattedTag)
      .set('limit', 10);

    this.http
      .get<SearchResponse>(this.serviceUrl, {
        params,
      })
      .subscribe((res) => {
        this.gifsList = res.data;
      });
  }
}
