import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Global ValidationPipe to enforce validation across all routes.
   * 
   * - `transform: true` → Automatically transforms incoming request payloads to match DTO types.
   * - `whitelist: true` → Strips out unknown properties from incoming requests.
   * - `forbidNonWhitelisted: true` → Rejects requests containing unknown properties.
   * - `exceptionFactory` → Custom error response formatting for validation errors.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        // Extract error messages and return them in a consistent format
        const messages = errors.map((err) =>
          Object.values(err.constraints || {}).join(', ')
        );

        return new BadRequestException({ message: messages }).getResponse();
      },
    }),
  );

  /**
   * CORS (Cross-Origin Resource Sharing) Configuration
   * 
   * - `origin` → Allows requests only from `http://localhost:5173` and `http://127.0.0.1:5173`
   * - `methods` → Specifies which HTTP methods are allowed.
   * - `credentials: true` → Allows requests that include credentials (cookies, HTTP authentication, etc.).
   * - Provides a callback function that checks if the request origin is allowed, returning an error if not.
   */
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS for origin: ${origin}`));
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true,
  });

  // Start the server on port 3000
  await app.listen(3000);
  console.log('🚀 Application is running on: http://localhost:3000');
}

// Run the bootstrap function to initialize the server
bootstrap();
