import { Article } from '@/entities/Article';

export interface ArticleEditSchema {
  form?: Article;
  readonly: boolean;
}
