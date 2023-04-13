import { trpc } from '@/server/trpc';
import { databasePromise } from '@/utils/mongodb';
import { z } from 'zod';

const router = trpc.router;

const WidgetSchema = z.union([
    z.literal('age-distribution'),
    z.literal('new-cases'),
]);

export type Widget = z.infer<typeof WidgetSchema>;

export type AppRouter = typeof appRouter;

export const appRouter = router({
    favorites: trpc.procedure.query(async () => {
        const database = await databasePromise;
        const favorites = await database
            .collection('widgets')
            .find({ isFavorite: true })
            .toArray();

        return favorites.map(favorite => favorite.widgetId);
    }),
    favorite: trpc.procedure
        .input(z.object({ widgetId: WidgetSchema, isFavorite: z.boolean() }))
        .mutation(async (req) => {
            const database = await databasePromise;
            await database
                .collection('widgets')
                .updateOne({ widgetId: req.input.widgetId },
                    { $set: { isFavorite: req.input.isFavorite }},
                    { upsert: true });
        }),
});
