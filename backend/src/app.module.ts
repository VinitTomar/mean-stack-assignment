import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    LoginModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOS || 'localhost',
      port: +process.env.DB_PORT || 3306,
      username: process.env.DB_PASSWORD || 'root',
      password: process.env.DB_USERNAME || 'root',
      database: process.env.DB_DATABASE_NAME || 'test',
      entities: [User, Product],
      synchronize: true,
      autoLoadEntities: true
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
