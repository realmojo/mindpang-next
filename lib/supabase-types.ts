// Supabase Database Types
// Run `npx supabase gen types typescript --project-id <project-id>` to generate types
// Or use the Supabase CLI: `supabase gen types typescript --local > lib/supabase-types.ts`

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      mindpang_test: {
        Row: {
          id: number;
          title: string | null;
          description: string | null;
          articles: string | null;
          adsenses: Json | null;
          category: string | null;
          logo: string | null;
          link: string | null;
          status: string | null;
          count: number | null;
          resultCount: number | null;
          up: number | null;
          tags: string | null;
          regdate: string | null;
          sort: number | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
          description?: string | null;
          articles?: string | null;
          adsenses?: Json | null;
          category?: string | null;
          logo?: string | null;
          link?: string | null;
          status?: string | null;
          count?: number | null;
          resultCount?: number | null;
          up?: number | null;
          tags?: string | null;
          regdate?: string | null;
          sort?: number | null;
        };
        Update: {
          id?: number;
          title?: string | null;
          description?: string | null;
          articles?: string | null;
          adsenses?: Json | null;
          category?: string | null;
          logo?: string | null;
          link?: string | null;
          status?: string | null;
          count?: number | null;
          resultCount?: number | null;
          up?: number | null;
          tags?: string | null;
          regdate?: string | null;
          sort?: number | null;
        };
      };
      mindpang_test_content: {
        Row: {
          id: number;
          testId: number | null;
          type: string | null;
          contents: Json | null;
          results: Json | null;
        };
        Insert: {
          id?: number;
          testId?: number | null;
          type?: string | null;
          contents?: Json | null;
          results?: Json | null;
        };
        Update: {
          id?: number;
          testId?: number | null;
          type?: string | null;
          contents?: Json | null;
          results?: Json | null;
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
}
