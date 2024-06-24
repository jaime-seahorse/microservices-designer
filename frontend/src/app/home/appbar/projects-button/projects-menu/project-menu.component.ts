import { Component, EventEmitter, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Project } from './projects-menu/print-projects.respones.dto';

@Component({
  selector: 'app-project-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './print-projects.component.html',
  styleUrl: './print-projects.component.css',
})
export class PrintProjectsComponent {
  projects: Project[] | null = null;
  isLoading: boolean = false;
  @Output() onSelectProject = new EventEmitter<Project["projectId"]>();

  selectProject(projectId: Project["projectId"]) {
    this.onSelectProject.emit(projectId);
  }
}
