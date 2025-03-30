import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> implements AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() data: T[] = [];
  @Input() enableSorting: boolean = true;
  @Input() enablePagination: boolean = true;

  dataSource = new MatTableDataSource<T>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<T>(this.data);
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.enableSorting) {
      this.dataSource.sort = this.sort;
    }
  }
}
