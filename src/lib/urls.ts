/** Route helpers. Client-safe (no Node imports). Every route ends with "/" (trailingSlash). */
export const urls = {
  home: () => "/",
  overview: (tech: string) => `/${tech}/`,
  topic: (tech: string, topic: string) => `/${tech}/#topic-${topic}`,
  concept: (tech: string, id: string) => `/${tech}/${id}/`,
  map: (tech: string, focus?: string) => `/${tech}/map/${focus ? `?focus=${focus}` : ""}`,
  tree: (tech: string, node?: string) => `/${tech}/tree/${node ? `#node-${node}` : ""}`,
  compareIndex: (tech: string) => `/${tech}/compare/`,
  compare: (tech: string, id: string) => `/${tech}/compare/${id}/`,
  cheatsheet: (tech: string) => `/${tech}/cheatsheet/`,
  quiz: (tech: string) => `/${tech}/quiz/`,
  glossary: (tech: string, term?: string) => `/${tech}/glossary/${term ? `#term-${term}` : ""}`,
};
