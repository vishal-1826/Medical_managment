import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  constructor(private spinnerService: NgxSpinnerService) { }

  showSpinner(): void {
    this.spinnerService.show();
  }

  hideSpinner(): void {
    this.spinnerService.hide();
  }
}
