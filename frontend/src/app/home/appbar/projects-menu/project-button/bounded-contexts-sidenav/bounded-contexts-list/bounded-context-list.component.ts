import { Component, EventEmitter, Output } from '@angular/core';

import { CdkAccordionModule } from '@angular/cdk/accordion';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { BoundedContext } from './bounded-context-button/bounded-context.dto';


@Component({
  selector: 'bounded-contexts-list',
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
export class PrintBoundedContextsComponent {
  boundedContexts: BoundedContext[] | null = null;

  @Output() onSelectBoundedContext = new EventEmitter<BoundedContext["id"]>();

  selectBoundedContext(boundedContextId: BoundedContext["id"]) {
    this.onSelectBoundedContext.emit(boundedContextId);
  }
}
