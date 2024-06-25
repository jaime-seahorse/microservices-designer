import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:1234@mongo:27017/seahorse'),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
