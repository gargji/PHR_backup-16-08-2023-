import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';


interface Appointment {
  name: string,
  code: string
}

@Component({
  selector: 'app-scheduleandappointment',
  templateUrl: './scheduleandappointment.component.html',
  styleUrls: ['./scheduleandappointment.component.css']
})
export class ScheduleandappointmentComponent implements OnInit {



  public _opened: boolean = false;
  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  

  // numaric button
  Selectappointment: Appointment[];

  selectedAppointment: Appointment;
  items: SelectItem[];


  property: any;
  value:any;

  constructor() { 
    this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }

        this.Selectappointment = [
            {name: 'Upcoming And Past', code: 'schedule'},
            {name: 'Upcomming', code: 'RM'},
            {name: 'Past', code: 'LDN'}
        ];

  }

  ngOnInit(): void {
  }

}
