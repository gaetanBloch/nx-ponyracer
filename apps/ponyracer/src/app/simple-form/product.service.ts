import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: string;
  name: string;
}

@Injectable()
export class ProductService {
  public getAll(): Observable<Array<Product>> {
    return of([
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
      { id: '3', name: 'Product 3' },
    ]);
  }
}
