import { HttpClient } from '@angular/common/http';
import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, shareReplay } from 'rxjs/operators';

import { SvgIconService } from './svg-icon.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-svg-icon',
  styleUrls: ['./svg-icon.component.scss'],
  template: ` <div [innerHTML]="sanitizedSvgContent" [class]="classNames"></div>`,
})
export class SvgIconComponent implements OnInit {
  @Input({ required: true }) public icon!: string;
  public sanitizedSvgContent!: SafeHtml;

  constructor(
    @Attribute('class') public classNames: string,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private svgIconService: SvgIconService,
  ) {}

  @HostBinding('class') get classAttribute(): string {
    return this.classNames ? this.classNames : '';
  }

  public ngOnInit(): void {
    this.loadSvg();
  }

  private loadSvg(): void {
    // Exit from the method in case of icon absence
    if (!this.icon) return;
    // Construct your path to an icon
    const svgPath = `assets/icons/svg/${this.icon}.svg`;

    // Check if the icon is already cached
    if (!this.svgIconService.svgIconMap.has(svgPath)) {
      const svg$ = this.http.get(svgPath, { responseType: 'text' }).pipe(
        map(svg => this.sanitizer.bypassSecurityTrustHtml(svg)),
        shareReplay(1),
      );

      // Cache the result: iconName as a key and Observable as a value
      this.svgIconService.svgIconMap.set(svgPath, svg$);
    }

    // Get an Observable with sanitized SVG from the Map
    const cachedSvg$ = this.svgIconService.svgIconMap.get(svgPath);

    // Subscribe to the Observable to get the content
    cachedSvg$?.subscribe({
      next: svg => {
        // Set it to the property
        this.sanitizedSvgContent = svg;
        // Trigger the 'detectChanges' method for UI updating
        // eslint-disable-next-line @rx-angular/no-explicit-change-detection-apis
        this.cdr.detectChanges();
      },
      error: error => console.error(`Error loading SVG`, error),
    });
  }
}
