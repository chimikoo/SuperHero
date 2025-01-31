import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  /**
   * Runs before each test to set up the testing environment.
   * Creates an isolated testing module with the AppController and AppService.
   */
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    /**
     * Ensures that the root endpoint (`GET /`) returns "Super Heroes!".
     * This confirms that the controller is functioning as expected.
     */
    it('should return "Super Heroes!"', () => {
      expect(appController.getHello()).toBe('Super Heroes!');
    });
  });
});
