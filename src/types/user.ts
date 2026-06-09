export interface UserSummary {
    readonly id: number
    email: string
    first_name: string
    last_name: string
}

export interface UserList extends UserSummary {
    readonly date_joined: string
}

export interface UserProfile {
    headline?: string
    location?: string
}


export interface UserMe extends UserSummary {
    readonly is_staff: boolean
    readonly profile: UserProfile
}