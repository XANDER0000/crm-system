import {array} from "yup";

export interface ChatMessageFile {
  id?: number,
  name: string,
  url: string,
}

export interface ChatMessage {
  id?: bigint | string,
  timestamp: number,
  authorId: string,
  direction: "from" | "to",
  author?: string,
  avatar?: string,
  content: string,
  status?: "sent" | "read",
  files?: array,
}
export interface ChatRoom {
  id: number,
  name: string,
  nameFull: string,
  type: number,
  count: number,
  updated: number,
  room: string,
  isPin: boolean,
  avatar?: string,
  canAttachFiles: boolean,
  config?: RoomConfig | null
}

export interface AttachedFile {
  name: string,
  url: string,
  file: File,
}

export interface RoomConfig {
  studentPost?: boolean;
}
