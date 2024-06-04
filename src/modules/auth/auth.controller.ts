import { Controller, Post, Body, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/admin.dto';
import { AuthService } from './auth.service';
import { PhoneNumberAlreadyExist } from './exception/auth.exception';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enums';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject("IAdminService") private readonly adminService: AdminService,
    @Inject("IUserService") private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: "Log In user or admin by phone number and password" })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiOperation({ summary: "Create new admin" })
  @Post('admin/sign-up')
  async registerAdmin(@Body() createDto: UserRegisterDto) {
    const { data: foundAdmin } = await this.adminService.findByPhoneNumber(
      createDto.phone_number,
    );

    if (foundAdmin) {
      throw new PhoneNumberAlreadyExist();
    }
    return await this.authService.registerAdmin(createDto);
  }
  
  @ApiOperation({ summary: "Create new user" })
  @Post('user/sign-up')
  async registerUser(@Body() createDto: UserRegisterDto) {
    const { data: foundUser } = await this.userService.findOneByPhone(
      createDto.phone_number,
    );

    if (foundUser) {
      throw new PhoneNumberAlreadyExist();
    }
    return await this.authService.registerUser(createDto);
  }
}
