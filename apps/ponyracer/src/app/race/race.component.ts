import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceModel } from './race.model';


@Component({
  selector: 'angular-monorepo-race',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss',
})
export class RaceComponent {
  @Input({required:true}) race!: RaceModel;
}
