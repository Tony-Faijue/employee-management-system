import { Component, OnInit } from '@angular/core';
import { FormsService, Form } from '../forms.service';
import { Observable } from 'rxjs';

//create interface to extends Form

export interface LeaveRequest extends Form{
  endDate: Date;
  reason: string;
}

@Component({
  selector: 'app-leave-request-form',
  imports: [],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.css'
})

export class LeaveRequestFormComponent implements OnInit {
  
  leaveRequests!: Observable<LeaveRequest[]>;

  //Define the collection path
  private collectionPath = 'leaveRequests';

  constructor(private formsService: FormsService){}
  
  ngOnInit():void{
    this.leaveRequests = this.formsService.getForms<LeaveRequest>(this.collectionPath);
  }
  addLeaveRequest (newRequest: LeaveRequest){
    this.formsService.addForm<LeaveRequest>(this.collectionPath, newRequest);
  }
  updateLeaveRequest (updatedRequest: LeaveRequest){
    this.formsService.updateForm<LeaveRequest>(this.collectionPath, updatedRequest);
  }
  deleteLeaveRequest(id:string){
    this.formsService.deleteForm(this.collectionPath, id);
  }
}
