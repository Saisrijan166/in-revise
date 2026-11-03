import type { Blueprint } from "./types";
import { springBoot } from "./spring-boot";
import { java } from "./java";
import { microservices } from "./microservices";
import { python } from "./python";
import { sql } from "./sql";
import { redis } from "./redis";
import { kafka } from "./kafka";
import { docker } from "./docker";
import { kubernetes } from "./kubernetes";
import { aws } from "./aws";
import { restApi } from "./rest-api";
import { designPatterns } from "./design-patterns";
import { systemDesign } from "./system-design";
import { dsa } from "./dsa";
import { react } from "./react";

/** Blueprints by tech slug. A tech gets a Blueprint page only if it is here. */
export const BLUEPRINTS: Record<string, Blueprint> = {
  "spring-boot": springBoot,
  java,
  microservices,
  python,
  sql,
  redis,
  kafka,
  docker,
  kubernetes,
  aws,
  "rest-api": restApi,
  "design-patterns": designPatterns,
  "system-design": systemDesign,
  dsa,
  react,
};
