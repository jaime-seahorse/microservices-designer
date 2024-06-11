import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { CreateUserRequest } from './create-user/create-user-request.dto';
import { CreateUserResponse } from './create-user/create-user-response.dto';

describe('UsersController', () => {
  let controller: UserController;

   
  const mockUserService = {
    create: jest.fn(),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create usert', () => {
    it('should create a new user', async () => {
      
      const createUserRequest: CreateUserRequest = new CreateUserRequest();
      createUserRequest.email = "pepe@mail.com";
      createUserRequest.name = "Pepe";
      createUserRequest.password = "changeme";
   
      jest.spyOn(mockUserService, 'create').mockReturnValue(createUserRequest);

      const createUserResponse: CreateUserResponse = await controller.create(createUserRequest);

      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockUserService.create).toHaveBeenCalledWith(createUserRequest)
      expect(createUserRequest.email).toEqual(createUserResponse.email);
      expect(createUserRequest.name).toEqual(createUserResponse.name);
      expect(createUserRequest.password).toEqual(createUserResponse.password);
    })
  })

});
