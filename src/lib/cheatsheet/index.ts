import type { CheatDoc } from "./types";
import { springBootCheatsheet } from "@/data/spring-boot-cheatsheet";
import { javaCheatsheet } from "@/data/java-cheatsheet";
import { microservicesCheatsheet } from "@/data/microservices-cheatsheet";
import { pythonCheatsheet } from "@/data/python-cheatsheet";
import { sqlCheatsheet } from "@/data/sql-cheatsheet";
import { redisCheatsheet } from "@/data/redis-cheatsheet";
import { kafkaCheatsheet } from "@/data/kafka-cheatsheet";
import { dockerCheatsheet } from "@/data/docker-cheatsheet";
import { kubernetesCheatsheet } from "@/data/kubernetes-cheatsheet";
import { awsCheatsheet } from "@/data/aws-cheatsheet";
import { restApiCheatsheet } from "@/data/rest-api-cheatsheet";
import { designPatternsCheatsheet } from "@/data/design-patterns-cheatsheet";
import { dsaCheatsheet } from "@/data/dsa-cheatsheet";
import { reactCheatsheet } from "@/data/react-cheatsheet";
import { osNetworkingCheatsheet } from "@/data/os-networking-cheatsheet";
import { aiEngineeringCheatsheet } from "@/data/ai-engineering-cheatsheet";
import { gitCheatsheet } from "@/data/git-cheatsheet";
import { linuxCheatsheet } from "@/data/linux-cheatsheet";
import { systemDesignCheatsheet } from "@/data/system-design-cheatsheet";

/** Full reference-driven cheat-sheet documents, by tech slug. */
const DOCS: Record<string, CheatDoc> = {
  "spring-boot": springBootCheatsheet,
  java: javaCheatsheet,
  microservices: microservicesCheatsheet,
  python: pythonCheatsheet,
  sql: sqlCheatsheet,
  redis: redisCheatsheet,
  kafka: kafkaCheatsheet,
  docker: dockerCheatsheet,
  kubernetes: kubernetesCheatsheet,
  aws: awsCheatsheet,
  "rest-api": restApiCheatsheet,
  "design-patterns": designPatternsCheatsheet,
  dsa: dsaCheatsheet,
  react: reactCheatsheet,
  "os-networking": osNetworkingCheatsheet,
  "ai-engineering": aiEngineeringCheatsheet,
  git: gitCheatsheet,
  linux: linuxCheatsheet,
  "system-design": systemDesignCheatsheet,
};

export function getCheatDoc(slug: string): CheatDoc | undefined {
  return DOCS[slug];
}

export { FULL_CHEATSHEET } from "./types";
export type { CheatDoc } from "./types";
