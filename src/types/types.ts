export interface Public {
    users: Array<user>;
    startDate: number | undefined,
}

export type user = {
    uuid: string,
    username: string,
    started: number,
    initialStats: stats,
    checkups: {
        stats: stats,
        date: Date,
    }[],
    userID: string,
    date: number,
}

export type stats = {
    Experience: number,
    coins: number,
    games_played_bedwars_1: number,
    games_played_bedwars: number,
    kills_bedwars: number,
    deaths_bedwars: number,
    beds_broken_bedwars: number,
    beds_lost_bedwars: number,
    final_kills_bedwars: number,
    final_deaths_bedwars: number,
    wins_bedwars: number,
    losses_bedwars: number,
}
