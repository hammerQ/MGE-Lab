export interface FatherInfo {
  first_name: string
  middle_name?: string
  last_name: string
  birth_year: number
  birth_month: number
  birth_day: number
}

export interface MotherInfo {
  first_name: string
  middle_name?: string
  last_name: string
  birth_year: number
  birth_month: number
  birth_day: number
}

export interface ChildInfo {
  first_name: string
  middle_name?: string
  last_name: string
  gender: 'male' | 'female' | 'other'
  birth_year: number
  birth_month: number
  birth_day: number
}

export interface PetInfo {
  name: string
  pet_type: 'dog' | 'cat'
  breed: string
  color: string
}

export interface UserProfile {
  user_id: string
  father: FatherInfo
  mother: MotherInfo
  child: ChildInfo
  pet?: PetInfo
  created_at: string
  updated_at?: string
}

export interface UserProfileCreate {
  father: FatherInfo
  mother: MotherInfo
  child: ChildInfo
  pet?: PetInfo
}

export interface UserProfileUpdate {
  father?: FatherInfo
  mother?: MotherInfo
  child?: ChildInfo
  pet?: PetInfo
} 