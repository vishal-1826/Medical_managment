import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'] // Fixed typo
})
export class SalesComponent {

  displayedColumns: string[] = ['id', 'product', 'quantity', 'price', 'total'];

  // Mock sales data
  salesData = [
    { id: 1, product: 'Product A', quantity: 2, price: 50, total: 100 },
    { id: 2, product: 'Product B', quantity: 1, price: 75, total: 75 },
    { id: 3, product: 'Product C', quantity: 5, price: 20, total: 100 },
    { id: 4, product: 'Product D', quantity: 3, price: 40, total: 120 },
    { id: 5, product: 'Product E', quantity: 4, price: 25, total: 100 }
  ];
}
