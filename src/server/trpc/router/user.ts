import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
   getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
