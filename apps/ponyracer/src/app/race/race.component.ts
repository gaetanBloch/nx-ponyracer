import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceModel } from '../race.model';
import { PonyComponent } from '../pony/pony.component';
import { FromNowPipe } from '../pipes/from-now/from-now.pipe';

@Component({
  selector: 'angular-monorepo-race',
  standalone: true,
  imports: [CommonModule, PonyComponent, FromNowPipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss',
})
export class RaceComponent {
  @Input({ required: true }) race!: RaceModel;
}
