import prisma from '../lib/prisma';

// Definição do tipo correto para os rankings
type RankingResult = {
    obj_Id: number;
    char_name: string;
    filterValue: number;
    clan_name: string | null;
    online: number; // 1 = Online, 0 = Offline
};

export const getRankingsFromDB = async (filter: string, search: string, page: number, limit: number): Promise<RankingResult[]> => {
    const offset = (page - 1) * limit;

    // Garantindo que o filtro seja seguro (evita SQL Injection)
    const allowedFilters = ['pvpkills', 'pkkills', 'raidkills', 'oly_wins', 'arena_wins'];
    if (!allowedFilters.includes(filter)) {
        throw new Error("Invalid filter. Allowed: " + allowedFilters.join(", "));
    }

    const rankings = await prisma.$queryRawUnsafe<RankingResult[]>(`
        SELECT c.obj_Id, c.char_name, c.${filter} AS filterValue, cs.name AS clan_name, c.online
        FROM characters c
        LEFT JOIN clan_subpledges cs ON c.clanid = cs.clan_id
        WHERE c.char_name LIKE ?
        ORDER BY c.${filter} DESC
        LIMIT ? OFFSET ?
    `, `%${search}%`, limit, offset);

    return rankings;
};

// Contar o total de jogadores (sem precisar de JOIN)
export const countTotalPlayers = async (search: string) => {
    return await prisma.characters.count({
        where: {
            char_name: {
                contains: search,
            }
        }
    });
};
