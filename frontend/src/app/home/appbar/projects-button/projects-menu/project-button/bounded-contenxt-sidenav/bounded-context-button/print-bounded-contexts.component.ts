import { Component, EventEmitter, Output } from '@angular/core';

import { CdkAccordionModule } from '@angular/cdk/accordion';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { BoundedContext } from './bounded-context.dto';

@Component({
  selector: 'app-print-bounded-contexts',
  standalone: true,
  imports: [
    CdkAccordionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './print-bounded-contexts.component.html'
})
export class PrintBoundedContextsComponent {
  boundedContexts: BoundedContext[] | null = null;

  @Output() onSelectBoundedContext = new EventEmitter<BoundedContext["id"]>();

  selectBoundedContext(boundedContextId: BoundedContext["id"]) {
    this.onSelectBoundedContext.emit(boundedContextId);
  }
}
