export interface PonyModel {
  id: number;
  name: string;
  color: string;
}

export interface RaceModel {
  id: number;
  name: string;
  startInstant: string;
  ponies: PonyModel[];
}
