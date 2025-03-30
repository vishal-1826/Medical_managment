import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address'];

  // Mock customer data
  customerData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St, Springfield' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Elm St, Shelbyville' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-123-4567', address: '789 Oak St, Capital City' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', phone: '444-555-6666', address: '321 Pine St, Ogdenville' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', phone: '333-444-5555', address: '654 Maple St, North Haverbrook' }
  ];

}
