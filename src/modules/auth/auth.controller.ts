import { Controller, Post, Body, Inject, Res, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/admin.dto';
import { AuthService } from './auth.service';
import { PhoneNumberAlreadyExist } from './exception/auth.exception';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { CookieGetter } from 'src/common/decorator/cookiGetter';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject("IAdminService") private readonly adminService: AdminService,
    @Inject("IUserService") private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: "Log In user or admin by phone number and password" })
  @Post('sign-in')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const found = await this.authService.login(loginDto, res);
    res.send(found)
  }

  @Get('refresh/:id')
  async refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res() res: Response,
  ) {
    const refreshed = await this.authService.refreshToken(id, refreshToken, res);
    res.send(refreshed);
  }

  @ApiOperation({ summary: "Create new admin" })
  @Post('admin/sign-up')
  async registerAdmin(@Body() createDto: UserRegisterDto, @Res() res: Response) {
    const { data: foundAdmin } = await this.adminService.findByPhoneNumber(
      createDto.phone_number,
    );

    if (foundAdmin) {
      throw new PhoneNumberAlreadyExist();
    }
    const createdAdmin = await this.authService.registerAdmin(createDto, res);
    res.send(createdAdmin);
  }

  @ApiOperation({ summary: "Create new user" })
  @Post('user/sign-up')
  async registerUser(@Body() createDto: UserRegisterDto, @Res() res: Response) {
    const { data: foundUser } = await this.userService.findOneByPhone(
      createDto.phone_number,
    );

    if (foundUser) {
      throw new PhoneNumberAlreadyExist();
    }
    const createdUser = await this.authService.registerUser(createDto, res);
    res.send(createdUser);
  }
}
