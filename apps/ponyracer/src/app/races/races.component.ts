import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceComponent } from '../race/race.component';
import { RaceService } from '../services/race.service';

@Component({
  selector: 'angular-monorepo-races',
  standalone: true,
  imports: [CommonModule, RaceComponent],
  templateUrl: './races.component.html',
  styleUrl: './races.component.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RacesComponent {
  races$ = inject(RaceService).listHttp();
}
