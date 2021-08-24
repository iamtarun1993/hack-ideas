export interface Challenges {
  id: number;
  name: string;
  no_of_likes: number;
  description: string;
  tags: Tag[]
  is_liked: boolean
}

type Tag = 'FEATURE' | 'TECH'
