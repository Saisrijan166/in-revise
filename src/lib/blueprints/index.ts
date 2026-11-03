import type { Blueprint } from "./types";
import { springBoot } from "./spring-boot";
import { java } from "./java";
import { microservices } from "./microservices";
import { python } from "./python";
import { sql } from "./sql";
import { redis } from "./redis";
import { kafka } from "./kafka";

/** Blueprints by tech slug. A tech gets a Blueprint page only if it is here. */
export const BLUEPRINTS: Record<string, Blueprint> = {
  "spring-boot": springBoot,
  java,
  microservices,
  python,
  sql,
  redis,
  kafka,
};
