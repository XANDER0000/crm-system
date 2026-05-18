import type { StatusType } from '@/constants/status';

export interface Card {
  $id: string;
  $createdAt: string;
  name: string;
  price?: number;
  companyName?: string;
  status: string;
}

export interface Column {
  id: StatusType;
  name: string;
  items: Card[];
}