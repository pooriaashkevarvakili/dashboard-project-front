import { tradersData } from './mock';
import type { Trader } from '../../../../types/Trade';

let traders: Trader[] = [...tradersData];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const traderApi = {
    getTraders: async (): Promise<Trader[]> => {
        await delay(400);
        return [...traders];
    },

    searchTraders: async (query: string): Promise<Trader[]> => {
        await delay(300);
        const q = query.toLowerCase();
        return traders.filter(t => 
            t.name.toLowerCase().includes(q) || 
            t.strategy.toLowerCase().includes(q)
        );
    },

    copyTrader: async (traderId: string, amount: number, riskMultiplier: number = 1): Promise<{ success: boolean; message: string }> => {
        await delay(600);

        const trader = traders.find(t => t.id === traderId);
        if (!trader) throw new Error("Trader not found");

        trader.isCopying = true;
        trader.copyAmount = amount;

        return {
            success: true,
            message: `Successfully started copying ${trader.name} with $${amount}`
        };
    },

    stopCopying: async (traderId: string): Promise<{ success: boolean }> => {
        await delay(400);
        const trader = traders.find(t => t.id === traderId);
        if (trader) {
            trader.isCopying = false;
            trader.copyAmount = undefined;
        }
        return { success: true };
    },

    toggleStar: async (traderId: string): Promise<Trader> => {
        await delay(200);
        const trader = traders.find(t => t.id === traderId);
        if (trader) {
            trader.isStarred = !trader.isStarred;
            return trader;
        }
        throw new Error("Trader not found");
    },

    getTopPerformers: async (limit: number = 4): Promise<Trader[]> => {
        await delay(300);
        return [...traders]
            .sort((a, b) => b.roi - a.roi)
            .slice(0, limit);
    }
};