import { createPrivateKey, createPublicKey } from "crypto";
import { readFileSync } from "node:fs";

export const config = () => {
  return {
    consts: {
      BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || "") || 10,
    },
    keys: {
      API_PRIVATE: createPrivateKey(readFileSync("keys/api_private.pem")),
      API_PUBLIC: createPublicKey(readFileSync("keys/api_public.pem")),
    },
  };
};
