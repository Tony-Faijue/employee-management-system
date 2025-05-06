import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../user.service';
import { Group, GroupService } from '../group.service';
import { Project, ProjectService } from '../project.service';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-project',
  imports: [FormsModule, RouterLink],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.css'
})
export class ManageProjectComponent implements OnInit {

  userService = inject(UserService);
  groupService = inject(GroupService);
  projectService = inject(ProjectService);
  activatedRoute = inject(ActivatedRoute);

  currentUser!: User;
  userID: string = '';

  groups: Group[] =[];
  projects: Project[] =[];

  selectedProject: Project = {
    id: '',
    projectname: '',
    projectdesc: '',
    groupid: ''
  };

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
        this.loadGroups();
      }
    });
  }

  loadGroups(): void {
    // Get all groups for the current user's company
    this.groupService.getGroupsByCompanyId(this.currentUser.companyid!).subscribe(groups => {
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

  addProject():void{
    this.projectService.addProject(this.selectedProject)
    .then(() => {
       alert('Project added successfully!');
       this.loadGroups(); // Reload groups so that projects are refreshed.
       // Reset selectedProject for next entry.
       this.selectedProject = { id: '', projectname: '', projectdesc: '', groupid: '' };
    })
    .catch(error => {
       console.error('Error adding project:', error);
       alert('Error adding project.');
    });

  }

  updateProject(): void{
    this.projectService.updateProject(this.selectedProject)
      .then(() => {
         alert('Project updated successfully!');
         this.loadGroups();
      })
      .catch(error => {
         console.error('Error updating project:', error);
         alert('Error updating project.');
      });
  }

  deleteProject(projectId: string): void{
    this.projectService.deleteProject(projectId)
      .then(() => {
         alert('Project deleted successfully!');
         this.loadGroups();
      })
      .catch(error => {
         console.error('Error deleting project:', error);
         alert('Error deleting project.');
      });
  }

  setSelectedProject(project: Project): void{
    this.selectedProject = { ...project };
  }

}
