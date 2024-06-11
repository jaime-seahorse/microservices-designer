import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { StorageService, Items } from './storage.service';
import { TokenResponse } from './storage.service';

describe('StorageService', () => {
  let httpTestController: HttpTestingController;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    httpTestController = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

 	it('should be able to store data', () => {
    storageService.setItem(Items.ProjectId, 1);
    let projectId = storageService.getItem(Items.ProjectId);
    expect(projectId).toBeTruthy();
	});

 	it('should be able to clean all data', () => {
    storageService.setCredentials('pedro@gmail.com', '12345678');
    storageService.setItem(Items.UserId, 1);
    storageService.setItem(Items.ProjectId, 1);
    storageService.setItem(Items.BoundedContextId, 1);

		storageService.cleanItems();

    expect(storageService.getItem(Items.Credentials)).toBeFalsy();
    expect(storageService.getItem(Items.UserId)).toBeFalsy();
    expect(storageService.getItem(Items.ProjectId)).toBeFalsy();
    expect(storageService.getItem(Items.BoundedContextId)).toBeFalsy();
	});

	it('should be able to get stored data', () => {
    storageService.setCredentials('pedro@gmail.com', '12345678');
    storageService.setItem(Items.UserId, 1);
    storageService.setItem(Items.ProjectId, 1);
    storageService.setItem(Items.BoundedContextId, 1);

    expect(storageService.getCredentials()).toEqual({
      email: 'pedro@gmail.com',
      password: '12345678'
    });
    expect(storageService.getItem(Items.UserId)).toBe(1);
    expect(storageService.getItem(Items.ProjectId)).toBe(1);
    expect(storageService.getItem(Items.BoundedContextId)).toBe(1);
	});

	it('should refresh access token', () => {
		let mockToken: TokenResponse = { accessToken: 'aaaaaa.bbbbbb.cccccc' };
		let mockNewToken: TokenResponse = { accessToken: 'cccccc.dddddd.eeeeee' };
		
		storageService.setCredentials('user@gmail.com', '12345678');
		storageService.refreshAccessToken()?.subscribe((newToken) => {
			mockToken = newToken;
		});
		
		let mockTokenRequest = httpTestController.expectOne(`${storageService.apiURL}/token`);
		mockTokenRequest.flush(mockNewToken);
		expect(mockToken).toBe(mockNewToken);
	});
});

