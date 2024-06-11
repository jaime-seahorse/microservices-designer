import { Component, EventEmitter, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Project {
  projectId: string;
  projectName: string;
}

@Component({
  selector: 'app-project-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.css',
})
export class ProjectMenuComponent {
  projects: Project[] | null = null;
  isLoading: boolean = false;
  @Output() onSelectProject = new EventEmitter<Project["projectId"]>();

  selectProject(projectId: Project["projectId"]) {
    this.onSelectProject.emit(projectId);
  }
}
