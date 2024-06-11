import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatAccordionHarness, MatExpansionPanelHarness  } from '@angular/material/expansion/testing';
import { MatNavListHarness } from '@angular/material/list/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BoundedContextListComponent } from './bounded-context-list.component';
import { EventEmitter } from '@angular/core';

let loader: HarnessLoader;
let fixture: ComponentFixture<BoundedContextListComponent>;
let boundedContextListComponent: BoundedContextListComponent;
let expansionPanel: MatExpansionPanelHarness ;
let addButton: MatButtonHarness;
let boundedContextList: MatNavListHarness;

describe('BoundedContextListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      {
        imports: [
          BoundedContextListComponent,
          HttpClientTestingModule
        ],
        providers: [
          provideRouter(routes),
          provideAnimationsAsync(),
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(BoundedContextListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    boundedContextListComponent = fixture.componentInstance;
    boundedContextListComponent.boundedContexts = [
      {boundedContextId: '1', boundedContextName: 'Bounded Context 1'},
      {boundedContextId: '2', boundedContextName: 'Bounded Context 2'},
      {boundedContextId: '3', boundedContextName: 'Bounded Context 3'},
    ];

    expansionPanel = (await (await loader.getHarness(MatAccordionHarness.with({ selector: MatAccordionHarness.hostSelector }))).getExpansionPanels())[0];
    addButton = await expansionPanel.getHarness(MatButtonHarness);
    boundedContextList = await expansionPanel.getHarness(MatNavListHarness.with({ selector: MatNavListHarness.hostSelector }));
  });

  it('should create the expansion panel', async () => {
    expect(expansionPanel).toBeTruthy();
    expect(await expansionPanel.getToggleIndicatorPosition()).toBe('before');
    expect(await expansionPanel.getTitle()).toBe('Content');
    expect(addButton).toBeTruthy();
    expect(await addButton.getText()).toBe('add');
    expect(boundedContextList).toBeTruthy();
  });

  it('should expand and collapse the panel when the panel toggler is clicked', async () => {
    await expansionPanel.expand();
    expect(await expansionPanel.isExpanded()).toBeTruthy();
    await expansionPanel.collapse();
    expect(await expansionPanel.isExpanded()).toBeFalsy();
  });

  it('should display the bounded context\'s list items', async () => {
    let boundedContextListItems = await boundedContextList.getItems();
    expect(await boundedContextListItems[0].getTitle()).toBe('Bounded Context 1');
    expect(await boundedContextListItems[1].getTitle()).toBe('Bounded Context 2');
    expect(await boundedContextListItems[2].getTitle()).toBe('Bounded Context 3');
  });

  it('should output the bounded context id when a list item is clicked', async () => {
    let boundedContextListItems = await boundedContextList.getItems();
    expect(await boundedContextListItems[0].getTitle()).toBe('Bounded Context 1');
    spyOn<EventEmitter<string>>(boundedContextListComponent.onSelectBoundedContext, 'emit');
    await boundedContextListItems[0].click();
    expect(boundedContextListComponent.onSelectBoundedContext.emit).toHaveBeenCalledWith('1');
  });

  it('shouldn\'t let the user display the list when there aren\'t bounded contexts', async () => {
    boundedContextListComponent.boundedContexts = null;
    await expansionPanel.expand();
    expect(await expansionPanel.isExpanded()).toBeFalsy();
  });
});
