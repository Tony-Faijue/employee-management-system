import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  imports: [FormsModule, NgFor],
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