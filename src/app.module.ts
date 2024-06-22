import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as express from 'express';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://adamfine:ndXjKpBpVD8PK9dT@todoapi.ok8npgm.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Create an Express app instance
    const app = express();

    /* // Enable CORS for all routes (adjust options as needed)
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (for development)
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      next();
    }); */

    // Apply the Express app as middleware to the Nest application
    consumer.apply(app).forRoutes('*');
  }
}
