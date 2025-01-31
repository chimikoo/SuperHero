import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  beforeEach(async () => {
    const mockService = {
      addSuperhero: jest.fn().mockImplementation((name, superpower, humilityScore) => ({
        name,
        superpower,
        humilityScore,
      })),
      getSuperheroes: jest.fn().mockReturnValue([
        { name: 'Spider-Man', superpower: 'Agility', humilityScore: 9 },
        { name: 'Iron Man', superpower: 'Technology', humilityScore: 7 },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return sorted superheroes', () => {
    const result = controller.getSuperheroes();
    expect(result).toEqual([
      { name: 'Spider-Man', superpower: 'Agility', humilityScore: 9 },
      { name: 'Iron Man', superpower: 'Technology', humilityScore: 7 },
    ]);
    expect(service.getSuperheroes).toHaveBeenCalledTimes(1);
  });

  it('should add a superhero', () => {
    const newHero = { name: 'Thor', superpower: 'Thunder', humilityScore: 8 };
    const result = controller.addSuperhero(newHero);
    expect(result).toEqual(newHero);
    expect(service.addSuperhero).toHaveBeenCalledWith(
      newHero.name,
      newHero.superpower,
      newHero.humilityScore,
    );
  });
});
