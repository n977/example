import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/core/prisma.service";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get("JWT_KEY"),
          signOptions: {
            expiresIn: +configService.get("JWT_EXPIRY"),
          },
        };
      },
    }),
  ],
  providers: [PrismaService],
  exports: [ConfigModule, JwtModule, PrismaService],
})
export class CoreModule {}
