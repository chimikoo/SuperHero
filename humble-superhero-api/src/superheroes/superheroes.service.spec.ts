import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('SuperheroesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should successfully add a valid superhero', async () => {
    const validHero = { name: 'Loki', superpower: 'Illusions', humilityScore: 5 };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(validHero);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(validHero));
  });

  it('should reject a superhero with an invalid humility score (too high)', async () => {
    const invalidHero = { name: 'Thanos', superpower: 'Infinity Gauntlet', humilityScore: 15 };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(invalidHero);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message).toEqual(
      expect.arrayContaining(['humilityScore must not be greater than 10']),
    );
  });

  it('should reject a superhero with an invalid humility score (too low)', async () => {
    const invalidHero = { name: 'Venom', superpower: 'Symbiote', humilityScore: 0 };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(invalidHero);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message).toEqual(
      expect.arrayContaining(['humilityScore must not be less than 1']),
    );
  });

  it('should reject a superhero with missing required fields', async () => {
    const invalidHero = { superpower: 'Magic' };

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
