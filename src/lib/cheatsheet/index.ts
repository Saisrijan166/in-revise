import type { CheatDoc } from "./types";
import { springBootCheatsheet } from "@/data/spring-boot-cheatsheet";
import { javaCheatsheet } from "@/data/java-cheatsheet";
import { microservicesCheatsheet } from "@/data/microservices-cheatsheet";

/** Full reference-driven cheat-sheet documents, by tech slug. */
const DOCS: Record<string, CheatDoc> = {
  "spring-boot": springBootCheatsheet,
  java: javaCheatsheet,
  microservices: microservicesCheatsheet,
};

export function getCheatDoc(slug: string): CheatDoc | undefined {
  return DOCS[slug];
}

export { FULL_CHEATSHEET } from "./types";
export type { CheatDoc } from "./types";
