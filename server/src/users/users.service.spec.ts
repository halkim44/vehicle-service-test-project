import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { createMock } from '@golevelup/nestjs-testing';

const mockUser: (mock?: {
  name?: string;
  _id?: string;
  is_technician?: boolean;
  password?: string;
}) => Partial<User> = (mock?: {
  name: string;
  _id: string;
  is_technician?: boolean;
}) => {
  return {
    name: (mock && mock.name) || 'user-test',
    _id: (mock && mock._id) || 'user-test-id',
    is_technician: (mock && mock.is_technician) || false,
  };
};
describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a User', async () => {
    const getMockUser = mockUser({ name: 'Halkim', _id: 'test-id' });
    jest.spyOn(model, 'findById').mockReturnValueOnce(
      createMock<Query<User, User>>({
        select: jest.fn().mockReturnValueOnce({
          exec: jest
            .fn()
            .mockResolvedValueOnce(
              mockUser({ name: 'Halkim', _id: 'test-id' }),
            ),
        }),
      }),
    );
    const gotUser = await service.getUser('test-id');
    expect(gotUser).toEqual(getMockUser);
  });
  it('should get a User by username', async () => {
    const findMockUser = mockUser({ name: 'Halkim', _id: 'test-id' });
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<User, User>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(mockUser({ name: 'Halkim', _id: 'test-id' })),
      }),
    );
    const foundUser = await service.findUser('Halkim');
    expect(foundUser).toEqual(findMockUser);
  });

  it('should create a User', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        _id: 'test-id',
        name: 'Halkim',
        is_technician: false,
      }),
    );
    const newUser = await service.create({
      name: 'Halkim',
      password: 'some-password',
      is_technician: false,
    });
    expect(newUser).toEqual(
      mockUser({
        name: 'Halkim',
        _id: 'test-id',
        password: 'some-password',
        is_technician: false,
      }),
    );
  });

  it('should delete a User successfully', async () => {
    jest.spyOn(model, 'findByIdAndRemove').mockReturnValueOnce(
      createMock<Query<User, User>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(mockUser({ name: 'Halkim', _id: 'test-id' })),
      }),
    );

    const deleteRes = await service.deleteUser('test-id');

    expect(deleteRes).toEqual({
      _id: 'test-id',
      is_technician: false,
      name: 'Halkim',
    });
  });

  it('should update a User successfully', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce(
      createMock<Query<User, User>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(
            mockUser({ name: 'another different name', _id: 'test-id' }),
          ),
      }),
    );

    const updateteRes = await service.updateUser('test-id', {
      name: 'another different name',
    });

    expect(updateteRes).toEqual({
      _id: 'test-id',
      is_technician: false,
      name: 'another different name',
    });
  });
});
