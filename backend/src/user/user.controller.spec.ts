import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { SignInService } from './signin/signin.service';
import { SignInRequest } from './signin/signin-request.dto';
import { SignInResponse } from './signin/signin-response.dto';
import { UpdateUserRequestDto } from './update-user/update-user-request.dto';

describe('UsersController', () => {
  let controller: UserController;


  const mockUserService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: SignInService,
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

      const signInRequest: SignInRequest = new SignInRequest();
      signInRequest.email = "pepe@mail.com";
      signInRequest.name = "Pepe";
      signInRequest.password = "changeme";

      jest.spyOn(mockUserService, 'create').mockReturnValue(signInRequest);

      const signInResponse: SignInResponse = await controller.create(signInRequest);

      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockUserService.create).toHaveBeenCalledWith(signInRequest)
      expect(signInRequest.email).toEqual(signInResponse.email);
      expect(signInRequest.name).toEqual(signInResponse.name);
    })
  })


  describe('Update user', () => {
    it('should update a user', async () => {
      const updateUserRequestDto: UpdateUserRequestDto = new UpdateUserRequestDto();
      updateUserRequestDto.email = "pepe1@mail.com";
      updateUserRequestDto.name = "Pepe1";

      jest.spyOn(mockUserService, 'update').mockReturnValue(updateUserRequestDto);

      const createUserResponse = await controller.update(1, updateUserRequestDto);

      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockUserService.create).toHaveBeenCalledWith(1, updateUserRequestDto);

    })
  })


});
