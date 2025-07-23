import type { ConversationItem } from '../types';

export type Database = {
  public: {
    Tables: {
      chat_logs: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          title: string;
          conversation: ConversationItem[];
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          conversation: ConversationItem[];
        };
        Update: {
          id?: string;
          conversation?: ConversationItem[];
          user_id?: string;
          title?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
