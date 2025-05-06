import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../user.service';
import { Group, GroupService } from '../group.service';
import { Project, ProjectService } from '../project.service';
import { Task, TaskService } from '../task.service';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-tasks',
  imports: [FormsModule, RouterLink],
  templateUrl: './manage-tasks.component.html',
  styleUrl: './manage-tasks.component.css'
})
export class ManageTasksComponent implements OnInit {
  userService = inject(UserService);
  projectService = inject(ProjectService);
  taskService = inject(TaskService);
  groupService = inject(GroupService);
  activatedRoute = inject(ActivatedRoute);

  currentUser!: User;
  userID: string = '';

  projects: Project[] = [];
  tasks: Task[] = [];

  selectedTask: Task = {
    id: '',
    taskname: '',
    taskdesc: '',
    status: '',
    projectid: ''
  }

  ngOnInit(): void{
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID') || '';
    if (this.userID) {
      this.fetchUser();
    }
  }

  fetchUser(): void{
    this.userService.getUserById(this.userID).subscribe(user => {
      this.currentUser = user;
      if (this.currentUser.companyid) {
        this.loadProjects();
      }
    });
  }

  loadProjects(): void{
// First, load all groups for the current user's company.
this.groupService.getGroupsByCompanyId(this.currentUser.companyid!).subscribe(groups => {
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

addTask():void{
  this.taskService.addTask(this.selectedTask)
  .then(() => {
    alert('Task added successfully!');
    this.loadProjects(); // Refresh the list of tasks (and projects, if needed)
    // Reset the selectedTask form.
    this.selectedTask = { id: '', taskname: '', taskdesc: '', status: '', projectid: '' };
  })
  .catch(error => {
    console.error('Error adding task:', error);
    alert('Error adding task.');
  });
}

updateTask(): void{
  this.taskService.updateTask(this.selectedTask)
  .then(() => {
    alert('Task updated successfully!');
    this.loadProjects();
  })
  .catch(error => {
    console.error('Error updating task:', error);
    alert('Error updating task.');
  });
}

deleteTask(taskId: string): void {
  this.taskService.deleteTask(taskId)
    .then(() => {
      alert('Task deleted successfully!');
      this.loadProjects();
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      alert('Error deleting task.');
    });
  }
  
  setSelectedTask(task: Task): void {
    this.selectedTask = { ...task };
  }

}
