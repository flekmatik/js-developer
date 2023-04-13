import { trpc } from '@/server/trpc';
import { z } from 'zod';

const router = trpc.router;

const WidgetSchema = z.union([
    z.literal('age-distribution'),
    z.literal('new-cases'),
]);

export type Widget = z.infer<typeof WidgetSchema>;

const currentFavorites: Widget[] = ['new-cases'];

export type AppRouter = typeof appRouter;

export const appRouter = router({
    favorites: trpc.procedure.query(() => currentFavorites),
    favorite: trpc.procedure
        .input(z.object({ widgetId: WidgetSchema, isFavorite: z.boolean() }))
        .mutation((req) => {
            if (req.input.isFavorite) {
                currentFavorites.includes(req.input.widgetId) && currentFavorites.splice(currentFavorites.indexOf(req.input.widgetId), 1);
            } else {
                !currentFavorites.includes(req.input.widgetId) && currentFavorites.push(req.input.widgetId);
            }
            return currentFavorites;
        }),
});
