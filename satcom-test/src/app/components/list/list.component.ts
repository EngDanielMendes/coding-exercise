import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { MockDataService } from 'src/app/services/mock-data.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  filterForm: FormControl;
  subscriptions = new Subscription();
  data: (Product | Customer)[] = [];
  filteredData: (Product | Customer)[] = [];

  constructor(
    private mockDataService: MockDataService,
    private stateService: StateService
  ) {
    mockDataService
      .getData()
      .subscribe((data: (Product | Customer)[]) => (this.data = data));
    this.filteredData = [...this.data];
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initForm(): void {
    this.filterForm = new FormControl();
    this.subscriptions.add(
      this.filterForm.valueChanges.subscribe((filterValue) => {
        this.onFilterChange(filterValue);
      })
    );
  }

  updateSelectedElement(element: any): void {
    this.stateService.updateSelectedElement(element);
  }

  onFilterChange(inputSearched: string) {
    this.filteredData = this.data.filter((item: any) => {
      return ['name', 'price'].some((key) => {
        return String(item[key])
          .toLowerCase()
          .includes(inputSearched.toLowerCase()) || item.premium
          ? true
          : false;
      });
    });
  }
}
