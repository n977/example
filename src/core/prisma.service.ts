import { PrismaClient } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      omit: {
        user: {
          email: true,
          password: true,
        },
      },
    });
  }
}
