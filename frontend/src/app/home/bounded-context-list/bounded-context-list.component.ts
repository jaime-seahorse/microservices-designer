import { Component, EventEmitter, Output } from '@angular/core';

import { CdkAccordionModule } from '@angular/cdk/accordion';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';

interface BoundedContext {
  boundedContextId: string,
  boundedContextName: string
}

@Component({
  selector: 'app-bounded-context-list',
  standalone: true,
  imports: [
    CdkAccordionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './bounded-context-list.component.html'
})
export class BoundedContextListComponent {
  boundedContexts: BoundedContext[] | null = null;

  @Output() onSelectBoundedContext = new EventEmitter<BoundedContext["boundedContextId"]>();

  selectBoundedContext(boundedContextId: BoundedContext["boundedContextId"]) {
    this.onSelectBoundedContext.emit(boundedContextId);
  }
}
