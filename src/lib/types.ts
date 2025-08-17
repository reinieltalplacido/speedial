export interface Link {
  id: string;
  url: string;
  title: string;
  category: string;   // ✅ always required
  username: string;   // Username who owns this link
  createdAt: string;
  updatedAt?: string;
}
