export interface Database {
  public: {
    Tables: {
      events: {
        Row: EventRow
        Insert: EventInsert
        Update: EventUpdate
      }
      categories: {
        Row: CategoryRow
        Insert: CategoryInsert
        Update: CategoryUpdate
      }
      materials: {
        Row: MaterialRow
        Insert: MaterialInsert
        Update: MaterialUpdate
      }
    }
  }
}

export interface EventRow {
  id: string
  name: string
  description: string
  logo_url: string | null
  cover_url: string | null
  primary_color: string
  initial_message: string
  created_at: string
  updated_at: string
}

export interface EventInsert {
  id?: string
  name: string
  description: string
  logo_url?: string | null
  cover_url?: string | null
  primary_color?: string
  initial_message?: string
  created_at?: string
  updated_at?: string
}

export interface EventUpdate {
  name?: string
  description?: string
  logo_url?: string | null
  cover_url?: string | null
  primary_color?: string
  initial_message?: string
  updated_at?: string
}

export interface CategoryRow {
  id: string
  event_id: string
  name: string
  icon: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface CategoryInsert {
  id?: string
  event_id: string
  name: string
  icon?: string | null
  display_order?: number
  created_at?: string
  updated_at?: string
}

export interface CategoryUpdate {
  name?: string
  icon?: string | null
  display_order?: number
  updated_at?: string
}

export interface MaterialRow {
  id: string
  event_id: string
  category_id: string
  title: string
  description: string | null
  type: string
  file_url: string | null
  published: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface MaterialInsert {
  id?: string
  event_id: string
  category_id: string
  title: string
  description?: string | null
  type: string
  file_url?: string | null
  published?: boolean
  display_order?: number
  created_at?: string
  updated_at?: string
}

export interface MaterialUpdate {
  title?: string
  description?: string | null
  category_id?: string
  type?: string
  file_url?: string | null
  published?: boolean
  display_order?: number
  updated_at?: string
}
