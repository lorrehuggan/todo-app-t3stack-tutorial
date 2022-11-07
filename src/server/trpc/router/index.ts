// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { userRouter } from "./user";
import { authRouter } from "./auth";
import { todoRouter } from "./todo";

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
