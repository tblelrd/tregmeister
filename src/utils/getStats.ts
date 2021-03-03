import { stats } from "../types/types";

const getStats = (bedwars: any): stats => {
    const {
        Experience,
        coins,
        games_played_bedwars,
        games_played_bedwars_1,
        kills_bedwars,
        deaths_bedwars,
        beds_broken_bedwars,
        beds_lost_bedwars,
        final_deaths_bedwars,
        final_kills_bedwars,
        wins_bedwars,
        losses_bedwars,
    } = bedwars;
    
    const bedwar: stats = {
        Experience,
        coins,
        games_played_bedwars,
        games_played_bedwars_1,
        kills_bedwars,
        deaths_bedwars,
        beds_broken_bedwars,
        beds_lost_bedwars,
        final_deaths_bedwars,
        final_kills_bedwars,
        wins_bedwars,
        losses_bedwars,
    };

    return bedwar;

}

export default getStats;