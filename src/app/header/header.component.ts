import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

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

  logout(): void {
    console.log('Logging out');
    this.authService.logout();
  }


}
