import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
      this.logObservable();
  }

  logObservable(): void {
    const observable = new Observable<string>(observer => {
      observer.next('Hello');
      observer.next('RxJS');
      observer.complete();
    });

    observable.subscribe((value: string) => console.log(value));

  }


}
