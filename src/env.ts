import { EnvType, load } from 'ts-dotenv';

export type Env = EnvType<typeof schema>;

export const schema = {
    DB_HOST: String,
    DB_NAME: String,
    DB_USER: String,
    DB_PASSWORD: {
      type: String,
      default: '',
    },
    DB_DIALECT: String,
    JWT_PRIVATE_KEY: String,
    AWS_ACCESS_KEY: String,
    AWS_SECRET_KEY: String,
    AWS_BUCKET: String
};

export let env: Env;

export function loadEnv(): void {
    env = load(schema);
}