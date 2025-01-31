import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  // Mocking the SuperheroesService with predefined responses
  beforeEach(async () => {
    const mockService = {
      // Mock function to add a superhero
      addSuperhero: jest.fn().mockImplementation((name, superpower, humilityScore) => ({
        name,
        superpower,
        humilityScore,
      })),
      // Mock function to return a predefined superhero list
      getSuperheroes: jest.fn().mockReturnValue([
        { name: 'Spider-Man', superpower: 'Agility', humilityScore: 9 },
        { name: 'Iron Man', superpower: 'Technology', humilityScore: 7 },
      ]),
    };

    // Creating a testing module with the mocked service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: mockService, // Injecting the mock service instead of the actual service
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  // Test case: Check if the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test case: Ensure superheroes are returned in the correct order
  it('should return sorted superheroes', () => {
    const result = controller.getSuperheroes();

    expect(result).toEqual([
      { name: 'Spider-Man', superpower: 'Agility', humilityScore: 9 },
      { name: 'Iron Man', superpower: 'Technology', humilityScore: 7 },
    ]);

    // Ensuring that the service method was called once
    expect(service.getSuperheroes).toHaveBeenCalledTimes(1);
  });

  // Test case: Ensure that adding a new superhero works as expected
  it('should add a superhero', () => {
    const newHero = { name: 'Thor', superpower: 'Thunder', humilityScore: 8 };

    // Calling the controller's add method
    const result = controller.addSuperhero(newHero);

    expect(result).toEqual(newHero);

    // Ensuring that the service's addSuperhero method was called with the correct arguments
    expect(service.addSuperhero).toHaveBeenCalledWith(
      newHero.name,
      newHero.superpower,
      newHero.humilityScore,
    );
  });
});
