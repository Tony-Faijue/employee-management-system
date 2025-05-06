import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../user.service';
import { Group, GroupService } from '../group.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-manage-groups',
  imports: [FormsModule, RouterLink],
  templateUrl: './manage-groups.component.html',
  styleUrl: './manage-groups.component.css'
})
export class ManageGroupsComponent {
  groupService = inject(GroupService);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);

  currentUser!: User;
  userID: string ='';

  groups: Group[] = [];

  selectedGroup: Group = {
    id: '',
    groupname: '',
    groupdesc: '',
    companyid: ''
  };

  ngOnInit(){
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

  loadGroups():void{
    this.groupService.getGroupsByCompanyId(this.currentUser.companyid!).subscribe(groups => {
      this.groups = groups;
    });
  }

  addGroup():void{
    this.selectedGroup.companyid = this.currentUser.companyid!;
    this.groupService.addGroup(this.selectedGroup)
      .then(() => {
        alert('Group added successfully!');
        this.loadGroups(); // Refresh list
        // Reset the selectedGroup form
        this.selectedGroup = { id: '', groupname: '', groupdesc: '', companyid: '' };
      })
      .catch(error => {
        console.error('Error adding group:', error);
        alert('Error adding group.');
      });
  }

  updateGroup(): void {
    this.groupService.updateGroup(this.selectedGroup)
      .then(() => {
        alert('Group updated successfully!');
        this.loadGroups(); // Refresh list
      })
      .catch(error => {
        console.error('Error updating group:', error);
        alert('Error updating group.');
      });
  }

  deleteGroup(groupId: string): void {
    this.groupService.deleteGroup(groupId)
      .then(() => {
        alert('Group deleted successfully!');
        this.loadGroups(); // Refresh list
      })
      .catch(error => {
        console.error('Error deleting group:', error);
        alert('Error deleting group.');
      });
  }

  setSelectedGroup(group: Group): void {
    this.selectedGroup = { ...group };
  }
}

