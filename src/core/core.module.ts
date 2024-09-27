import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { config } from "src/config";
import { PrismaService } from "src/core/prisma.service";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          privateKey: configService.get("keys.API_PRIVATE"),
          publicKey: configService.get("keys.API_PUBLIC"),
        };
      },
    }),
  ],
  providers: [PrismaService],
  exports: [ConfigModule, JwtModule, PrismaService],
})
export class CoreModule {}
