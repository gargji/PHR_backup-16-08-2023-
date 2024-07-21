import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  date14: Date;
  constructor() { }

  ngOnInit(): void {
  }

}
