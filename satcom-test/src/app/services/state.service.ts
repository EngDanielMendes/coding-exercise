import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor() {}

  private elementSource = new BehaviorSubject<Product | Customer | null>(null);
  currentElement = this.elementSource.asObservable();

  updateSelectedElement(element: Product | Customer) {
    this.elementSource.next(element);
  }
}
