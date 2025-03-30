import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  displayedColumns: string[] = ['id', 'product', 'quantity', 'price', 'total'];

  // Mock inventory data
  inventoryData = [
    { id: 1, product: 'Product A', quantity: 10, price: 50, total: 500 },
    { id: 2, product: 'Product B', quantity: 5, price: 75, total: 375 },
    { id: 3, product: 'Product C', quantity: 20, price: 20, total: 400 },
    { id: 4, product: 'Product D', quantity: 15, price: 40, total: 600 },
    { id: 5, product: 'Product E', quantity: 25, price: 25, total: 625 }
  ];
}
