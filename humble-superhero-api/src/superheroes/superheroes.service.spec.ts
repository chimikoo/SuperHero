import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

/**
 * End-to-End (E2E) Tests for the SuperheroesController.
 *
 * This test suite ensures that the API's endpoints behave correctly, 
 * including validation, error handling, and successful data processing.
 */
describe('SuperheroesController (e2e)', () => {
  let app: INestApplication;

  /**
   * Before all tests, initialize the application instance.
   */
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * After all tests, clean up and close the application instance.
   */
  afterAll(async () => {
    await app.close();
  });

  /**
   * Test: Adding a valid superhero should return a 201 status and match the input data.
   */
  it('should successfully add a valid superhero', async () => {
    const validHero = { name: 'Loki', superpower: 'Illusions', humilityScore: 5 };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(validHero);

    expect(response.status).toBe(201); // Expect HTTP 201 Created
    expect(response.body).toEqual(expect.objectContaining(validHero)); // Ensure returned object matches input
  });

  /**
   * Test: Adding a superhero with an invalid humility score (too high) should return a 400 error.
   */
  it('should reject a superhero with an invalid humility score (too high)', async () => {
    const invalidHero = { name: 'Thanos', superpower: 'Infinity Gauntlet', humilityScore: 15 };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(invalidHero);

    expect(response.status).toBe(400); // Expect HTTP 400 Bad Request
    expect(response.body).toHaveProperty('message'); // Error message should exist
    expect(Array.isArray(response.body.message)).toBe(true); // Message should be an array
    expect(response.body.message).toEqual(
      expect.arrayContaining(['humilityScore must not be greater than 10']), // Ensure correct error message
    );
  });

  /**
   * Test: Adding a superhero with an invalid humility score (too low) should return a 400 error.
   */
  it('should reject a superhero with an invalid humility score (too low)', async () => {
    const invalidHero = { name: 'Venom', superpower: 'Symbiote', humilityScore: 0 };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(invalidHero);

    expect(response.status).toBe(400); // Expect HTTP 400 Bad Request
    expect(response.body).toHaveProperty('message');
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message).toEqual(
      expect.arrayContaining(['humilityScore must not be less than 1']),
    );
  });

  /**
   * Test: Adding a superhero with missing required fields should return a 400 error.
   */
  it('should reject a superhero with missing required fields', async () => {
    const invalidHero = { superpower: 'Magic' }; // Missing 'name' and 'humilityScore'

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(invalidHero);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message).toEqual(
      expect.arrayContaining([
        'name must not be empty',
        'humilityScore must not be less than 1',
        'humilityScore must not be greater than 10',
      ]),
    );
  });
});
