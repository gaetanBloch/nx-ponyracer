import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PonyModel } from '../race.model';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'angular-monorepo-pony',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './pony.component.html',
  styleUrl: './pony.component.scss'
})
export class PonyComponent {
  @Input({ required: true }) pony!: PonyModel;
  @Output() ponyClicked = new EventEmitter<PonyModel>();
  logging = inject(LoggingService);

  imageSource(): string {
    return `/assets/images/pony-${ this.pony.color.toLowerCase() }.gif`;
  }

  onPonyClicked(pEvent: MouseEvent) {
    this.logging.log(`PonyComponent - onPonyClicked() - ${ this.pony.name + ' - src: ' + (pEvent.target as HTMLImageElement).src}`);
    this.ponyClicked.emit(this.pony);
  }
}
