import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUser: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: 'user-1',
                _id: id,
                is_technician: false,
              }),
            ),
            updateUser: jest
              .fn()
              .mockImplementation((userId, createUserDTO: CreateUserDTO) =>
                Promise.resolve({ _id: userId, ...createUserDTO }),
              ),
            deleteUser: jest
              .fn()
              .mockResolvedValue({ name: 'deleted-user-name' }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getUser', () => {
    it('should return a User Document', async () => {
      return controller.getUser('user-id-1').then((data) => {
        expect(data).toEqual({
          user: {
            name: 'user-1',
            _id: 'user-id-1',
            is_technician: false,
          },
        });
      });
    });
  });
  describe('updateUser', () => {
    it('should update a user', async () => {
      const newUserDTO: UpdateUserDTO = {
        name: 'user-1',
        password: 'new-user-1-password',
        is_technician: true,
      };

      return controller.updateUser('user-id-1', newUserDTO).then((data) => {
        expect(data).toEqual({
          message: 'User has been successfully updated',
          user: {
            _id: 'user-id-1',
            name: 'user-1',
            password: 'new-user-1-password',
            is_technician: true,
          },
        });
      });
    });
    it('should update certain properties', () => {
      const updatedNameOnlyDTO: UpdateUserDTO = {
        name: 'user-1',
      };
      expect(
        controller.updateUser('user-id-1', updatedNameOnlyDTO),
      ).resolves.toEqual({
        message: 'User has been successfully updated',
        user: { ...updatedNameOnlyDTO, _id: 'user-id-1' },
      });
    });
  });

  describe('delete User', () => {
    it('should delete a User', () => {
      return controller.deleteUser('user-id-1').then((data) => {
        expect(data).toEqual({
          message: 'User has been deleted',
          deleted: true,
        });
      });
    });
  });
});
