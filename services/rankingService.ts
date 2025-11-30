import { getRankingsFromDB, countTotalPlayers } from '../repositories/rankingRepository';

const allowedFilters = ['pvpkills', 'pkkills', 'raidkills', 'oly_wins', 'arena_wins'];

export const getRankingsService = async (filter: string, search: string, page: number, limit: number) => {
    if (!allowedFilters.includes(filter)) {
        throw new Error("Invalid filter. Allowed: " + allowedFilters.join(", "));
    }

    const rankings = await getRankingsFromDB(filter, search, page, limit);
    const totalPlayers = await countTotalPlayers(search);

    // Formatar os dados corretamente
    const formattedRankings = rankings.map((player) => ({
        obj_Id: player.obj_Id,
        char_name: player.char_name,
        [filter]: player.filterValue,
        clan_name: player.clan_name || 'Sem Clã',
        online: player.online === 1 // Converte para booleano (true = online, false = offline)
    }));

    return {
        totalPlayers,
        totalPages: Math.ceil(totalPlayers / limit),
        currentPage: page,
        pageSize: limit,
        data: formattedRankings,
        allowedFilters
    };
};
