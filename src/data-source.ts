import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "brain_agriculture",
  synchronize: true,
  logging: true,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/migrations/*.ts"],
});

export default AppDataSource;
