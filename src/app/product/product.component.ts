import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule,MatIconModule]

})

export class ProductComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'expirationDate', 'supplier', 'action'];
  products = [
    { name: 'Paracetamol', category: 'Analgesic', price: 4.99, quantity: 150, expirationDate: '2025-10-15', supplier: 'MedSupply' },
    { name: 'Ibuprofen', category: 'Anti-inflammatory', price: 7.99, quantity: 200, expirationDate: '2024-08-20', supplier: 'HealthCorp' },
    { name: 'Amoxicillin', category: 'Antibiotic', price: 12.99, quantity: 100, expirationDate: '2023-12-01', supplier: 'PharmaInc' },
    { name: 'Cetirizine', category: 'Antihistamine', price: 5.49, quantity: 250, expirationDate: '2025-05-30', supplier: 'AllergyFree' },
    { name: 'Metformin', category: 'Antidiabetic', price: 9.99, quantity: 300, expirationDate: '2024-11-25', supplier: 'DiabetesCare' },
    { name: 'Aspirin', category: 'Analgesic', price: 3.99, quantity: 400, expirationDate: '2023-09-10', supplier: 'PainRelief' },
    { name: 'Lisinopril', category: 'Antihypertensive', price: 8.99, quantity: 180, expirationDate: '2025-01-15', supplier: 'HeartHealth' },
    { name: 'Omeprazole', category: 'Antacid', price: 6.99, quantity: 220, expirationDate: '2024-07-22', supplier: 'DigestWell' },
    { name: 'Simvastatin', category: 'Cholesterol-lowering', price: 11.99, quantity: 130, expirationDate: '2023-11-05', supplier: 'CholesterolCare' },
    { name: 'Levothyroxine', category: 'Thyroid hormone', price: 10.49, quantity: 160, expirationDate: '2025-03-18', supplier: 'ThyroidHealth' },
    { name: 'Albuterol', category: 'Bronchodilator', price: 14.99, quantity: 90, expirationDate: '2024-02-28', supplier: 'RespiraCare' }
  ];
  dataSource = new MatTableDataSource<any>(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

   addNewProduct(): void {
      const dialogRef = this.dialog.open(AddProductDialogComponent, {
        height: '400px',
        width: '600px',
        data: { name: '', category: '', price: 0, quantity: 0, expirationDate: '', supplier: '' },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataSource.data = [...this.dataSource.data, result];
          this.dataSource.paginator = this.paginator; // Update paginator
        }
      });
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  editElement(element: any): void {
    // Logic to edit the element
    console.log('Editing element:', element);

      this.dataSource.data = this.dataSource.data.filter(product => product !== element);

    // You can add your edit logic here, for example, opening a dialog with a form to edit the element
  }
  deleteElement(element: any): void {
    // Logic to delete the element
    console.log('Deleting element:', element.name);
     if (confirm('Are you sure you want to delete ' + element.name + '?')) {
      this.dataSource.data = this.dataSource.data.filter(product => product !== element);
      this.dataSource.paginator = this.paginator; // Update paginator
    // You can add your delete logic here, for example, opening a dialog to confirm the deletion
  }

}
}
