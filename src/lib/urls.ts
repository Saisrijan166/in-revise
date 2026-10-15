/** Route helpers. Client-safe (no Node imports). Every route ends with "/" (trailingSlash). */
export const urls = {
  home: () => "/",
  progress: () => "/progress/",
  deck: (tech: string) => `/${tech}/`,
  topic: (tech: string, topic: string) => `/${tech}/#topic-${topic}`,
  card: (tech: string, id: string) => `/${tech}/cards/${id}/`,
  compareIndex: (tech: string) => `/${tech}/compare/`,
  compare: (tech: string, id: string) => `/${tech}/compare/${id}/`,
  map: (tech: string, focus?: string) => `/${tech}/map/${focus ? `?focus=${focus}` : ""}`,
  drill: (tech: string) => `/${tech}/drill/`,
  glossary: (tech: string, term?: string) => `/${tech}/glossary/${term ? `#term-${term}` : ""}`,
  cheatsheetIndex: (tech: string) => `/${tech}/cheatsheet/`,
  cheatsheet: (tech: string, topic: string) => `/${tech}/cheatsheet/${topic}/`,
  review: (tech: string) => `/${tech}/review/`,
};

export const cardKey = (tech: string, id: string) => `${tech}/${id}`;
