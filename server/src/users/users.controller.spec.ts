import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as httpMocks from 'node-mocks-http';

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
    it('should return a User Document', () => {
      const result = expect(controller.getUser('user-id-1')).resolves.toEqual({
        name: 'user-1',
        _id: 'user-id-1',
        is_technician: false,
      });
    });
  });
});
