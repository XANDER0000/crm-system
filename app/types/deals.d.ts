import type { StatusType } from '@/constants/status';

export interface BaseField {
  $id: string;
  $createdAt: string;
}

export interface Customer extends BaseField {
  name: string;
  email: string;
  avatar_url?: string;
  from_source?: string;
}

export interface Comment extends BaseField {
  text: string;
}

export interface Deal extends BaseField {
  comments?: Comment[];
  customer?: Customer;
  name: string;
  price?: number;
  status?: StatusType;
}