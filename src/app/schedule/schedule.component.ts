import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  // Example schedule data
  schedule = [
    { day: 'Monday', time: '9am - 5pm' },
    { day: 'Tuesday', time: '9am - 5pm' },
    { day: 'Wednesday', time: '9am - 5pm' },
    { day: 'Thursday', time: '9am - 5pm' },
    { day: 'Friday', time: '9am - 5pm' },
  ];
}