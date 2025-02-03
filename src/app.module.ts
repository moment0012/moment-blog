import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'boy2829313',
      database: 'moment-blog',
      autoLoadEntities: true,
      synchronize: true
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule { }
