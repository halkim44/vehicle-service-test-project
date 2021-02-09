import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest
              .fn()
              .mockImplementation((username: string) =>
                Promise.resolve({ name: username }),
              ),
            login: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve({ access_token: 'fakeaccesstoken12345' }),
              ),
            create: jest.fn().mockImplementation(() =>
              Promise.resolve({
                access_token: 'fakeaccesstoken12345',
                user: {
                  name: 'newUser',
                },
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
