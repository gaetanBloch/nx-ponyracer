import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SvgIconService {
  public svgIconMap: Map<string, Observable<SafeHtml>> = new Map<string, Observable<SafeHtml>>();
}
