import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Action } from 'src/casl/casl-ability.factory';
import { CaslGuard } from 'src/casl/casl.guard';
import { User, USER_ROLE } from './entities/user.entity';
import { CheckAbility } from 'src/casl/policy.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user =  await this.userService.create(createUserDto);
    return this.authService.login(user);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('loginadmin')
  @UseGuards(AuthGuard('local'))
  async loginadmin(@Req() req): Promise<any> {
    if(req?.user?.role === USER_ROLE.ADMIN) {
      return this.authService.login(req.user);
    }
     throw new UnauthorizedException();
  }

  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(CaslGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @CheckAbility({ action: Action.Update, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @CheckAbility({ action: Action.Delete, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
