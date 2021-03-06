export interface Challenges {
  id: number;
  name: string;
  no_of_likes: number;
  description: string;
  tags: Tag[];
  is_liked: boolean;
  created_at: Date;
}

type Tag = 'FEATURE' | 'TECH'
