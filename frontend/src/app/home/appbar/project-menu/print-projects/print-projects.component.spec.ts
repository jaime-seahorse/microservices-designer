import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatMenuItemHarness } from '@angular/material/menu/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';

import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { EventEmitter } from '@angular/core';

import { PrintProjectsComponent } from './print-projects.component';

let loader: HarnessLoader;
let fixture: ComponentFixture<PrintProjectsComponent>;
let menu: MatMenuHarness;

describe('PrintProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule(
      {
        imports: [
          PrintProjectsComponent,
          HttpClientTestingModule
        ],
        providers: [
          provideRouter(routes),
          provideAnimationsAsync(),
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(PrintProjectsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    menu = await loader.getHarness(MatMenuHarness.with({ selector: MatMenuHarness.hostSelector }));
  });

  it('should create the button toggle that trigger the menu', async () => {
    expect(menu).toBeTruthy();
    expect(menu).toBeInstanceOf(MatMenuHarness);
    expect(await menu.getTriggerText()).toBe('Projectskeyboard_arrow_down');
  });

  it('shouldn\'t show the menu items when the menu is closed', async () => {
    let menuItems: MatMenuItemHarness[] = await menu.getItems();
    expect(menuItems[menuItems.length-1]).toBeFalsy();
  });

  it('should show the menu items when the menu is opened', async () => {
    await menu.open();
    let menuItems: MatMenuItemHarness[] = await menu.getItems();
    expect(menuItems[menuItems.length-1]).toBeInstanceOf(MatMenuItemHarness);
    expect(await menuItems[menuItems.length-1].getText()).toBe('add');
  });

  it('menu should be displayed when icon is clicked, and closed when icon is clicked again', async () => { 
    await menu.open();
    expect(await menu.isOpen()).toBeTrue();
    await menu.close();
    expect(await menu.isOpen()).toBeFalse();
  });

  it('menu should display the projects', async () => { 
    let printProjectsComponent = fixture.componentInstance;
    printProjectsComponent.projects = [
      {projectId: 1, projectName: "Project 1"},
      {projectId: 2, projectName: "Project 2"},
    ];
    await menu.open();
    let menuItems: MatMenuItemHarness[] = await menu.getItems();
    expect(await menuItems[0].getText()).toBe('Project 1');
    expect(await menuItems[1].getText()).toBe('Project 2');
    expect(await menuItems[menuItems.length-1].getText()).toBe('add');
  });

  it('should output the project id when a menu item is clicked', async () => { 
    let printProjectsComponent = fixture.componentInstance;
    printProjectsComponent.projects = [
      {projectId: 1, projectName: "Project 1"},
      {projectId: 2, projectName: "Project 2"},
    ];
    await menu.open();
    let menuItems: MatMenuItemHarness[] = await menu.getItems();
    expect(await menuItems[0].getText()).toBe('Project 1');
    spyOn<EventEmitter<number>>(printProjectsComponent.onSelectProject, 'emit');
    await menuItems[0].click();
    expect(printProjectsComponent.onSelectProject.emit).toHaveBeenCalledWith(1);
  });

  it('should display a spinner when loading the projects', async () => { 
    let printProjectsComponent = fixture.componentInstance;
    printProjectsComponent.isLoading = true;
    await menu.open();
    let menuItems: MatMenuItemHarness[] = await menu.getItems();
    let spinner = await menuItems[0].getHarness(MatProgressSpinnerHarness);
    expect(spinner).toBeTruthy();
  });

  it('should display a message when there aren\'t projects', async () => { 
    await menu.open();
    let menuItems: MatMenuItemHarness[] = await menu.getItems();
    expect(await menuItems[0].getText()).toBe('No projects.');
  });
});
