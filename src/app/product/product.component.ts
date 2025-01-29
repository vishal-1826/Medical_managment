import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule,MatIconModule]

})

export class ProductComponent implements OnInit, AfterViewInit {
   product:any=[];

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'expirationDate', 'supplier', 'action'];
  dataSource = new MatTableDataSource<any>(this.product);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private AuthService:AuthService) { }

  ngOnInit(): void {
    this.getproducts();
    this.dataSource.sort = this.sort;
  }


  getproducts() {
    console.log('getproducts method called');
    this.AuthService.getProduct().subscribe((data) => {
      console.log('Data received:', data);
      this.product = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (error) => {
      console.error('Error fetching products:', error);
    });
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
    this.dataSource.sort = this.sort;
  }


  editElement(element: any): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the data source with the edited element
        const index = this.dataSource.data.findIndex(product => product.id === element.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; // Refresh the data source
        }
      }
    });
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
