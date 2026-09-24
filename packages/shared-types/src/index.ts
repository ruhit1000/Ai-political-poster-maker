export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface Template {
  id: string;
  title: string;
  occasionType: string;
  thumbnailUrl: string;
  layoutConfig: Record<string, any>;
  isActive: boolean;
}
