import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { CoreModule } from "src/core/core.module";
import { BoardModule } from "src/board/board.module";

@Module({
  imports: [CoreModule, UsersModule, AuthModule, BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
