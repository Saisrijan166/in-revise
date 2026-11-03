import type { SyntaxSheet } from "./types";
import { java } from "./java";
import { python } from "./python";
import { sql } from "./sql";
import { springBoot } from "./spring-boot";
import { react } from "./react";
import { kafka } from "./kafka";
import { redis } from "./redis";
import { docker } from "./docker";
import { kubernetes } from "./kubernetes";
import { git } from "./git";
import { linux } from "./linux";
import { aws } from "./aws";
import { restApi } from "./rest-api";
import { microservices } from "./microservices";
import { aiEngineering } from "./ai-engineering";
import { dsa } from "./dsa";
import { designPatterns } from "./design-patterns";
import { systemDesign } from "./system-design";
import { osNetworking } from "./os-networking";

/** Syntax sheets by tech slug. A tech gets a Syntax page only if it is here. */
export const SYNTAX: Record<string, SyntaxSheet> = {
  java,
  python,
  sql,
  "spring-boot": springBoot,
  react,
  kafka,
  redis,
  docker,
  kubernetes,
  git,
  linux,
  aws,
  "rest-api": restApi,
  microservices,
  "ai-engineering": aiEngineering,
  dsa,
  "design-patterns": designPatterns,
  "system-design": systemDesign,
  "os-networking": osNetworking,
};
