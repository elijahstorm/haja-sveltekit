export interface ContentHolder {}

export type Content<K extends keyof ContentHolder = keyof ContentHolder> = {
  type: K;
  config: ContentHolder[K];
};
