import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/core/prisma.service";

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>("JWT_KEY"),
          expires: "7d",
        };
      },
    }),
  ],
  providers: [PrismaService],
  exports: [ConfigModule, JwtModule, PrismaService],
})
export class CoreModule {}
