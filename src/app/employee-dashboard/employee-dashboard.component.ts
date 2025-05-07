import { Component, Input, OnInit, inject } from '@angular/core';
import {UserService, User} from '../user.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { Project, ProjectService } from '../project.service';
import { Task, TaskService } from '../task.service';
import { Group, GroupService } from '../group.service';

@Component({
  selector: 'app-employee-dashboard',
  imports: [RouterLink],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
  userID: string ='';
  user!: User;

    projects: Project[] = [];
    groups: Group[] = [];
    tasks: Task[] = [];

    selectedTask: Task = {
      id: '',
      taskname: '',
      taskdesc: '',
      status: '',
      projectid: ''
    }

  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  projectService = inject(ProjectService);
  taskService = inject(TaskService);
  companyService = inject(CompanyService);
  groupSerivce = inject(GroupService);
  
  company = {
    id: '',
    companyname: '',
    address: '',
    phonenum: '',
  }
  isCompanyCreated=false;

  joinCo(inputValue:string){
    this.companyService.getCompanyById(inputValue)
    .subscribe(company => {
      this.company = company;
      this.isCompanyCreated = true;
      this.loadGroups();
      this.loadProjects();
    });
  }


  ngOnInit(){
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID') || '';
    this.fetchUser();
    
  }

  fetchUser(): void {
    if(this.userID){
    this.userService.getUserById(this.userID).subscribe(user => {
      this.user = user;
    });
  }
}
loadGroups(): void {
  // Get all groups for the current user's company
  this.groupSerivce.getGroupsByCompanyId(this.company.id).subscribe(groups => {
    this.groups = groups;
    // Extract the group IDs from these groups.
    const groupIds = groups.map(g => g.id);
    if (groupIds.length > 0) {
      // Use the ProjectService method to get projects matching these group IDs.
      this.projectService.getProjectsByGroupIds(groupIds).subscribe(projects => {
        this.projects = projects;
      });
    } else {
      this.projects = [];
    }
  });
}

loadProjects(): void{
  // First, load all groups for the current user's company.
  this.groupSerivce.getGroupsByCompanyId(this.company.id).subscribe(groups => {
    const groupIds = groups.map(g => g.id);
    if (groupIds.length > 0) {
      // Then, load projects associated with those groups.
      this.projectService.getProjectsByGroupIds(groupIds).subscribe(projects => {
        this.projects = projects;
        const projectIds = projects.map(p => p.id);
        if (projectIds.length > 0) {
          // Finally, load tasks for these projects.
          this.taskService.getTasksByProjectIds(projectIds).subscribe(tasks => {
            this.tasks = tasks;
          });
        } else {
          this.tasks = [];
        }
      });
    } else {
      this.projects = [];
      this.tasks = [];
    }
  });
}
}
