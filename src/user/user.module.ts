import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // Adjust the path as necessary
import { UserService } from './user.service'; // Adjust the path as necessary
import { UserController } from './user.controller'; // Adjust the path as necessary

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
    exports: [TypeOrmModule, UserService]
})
export class UserModule {}

