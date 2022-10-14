import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { createTodo, identifyTodo, updateTodo } from "../../../utils/schema";

export type IdentifyTodo = z.infer<typeof identifyTodo>;
export type UpdateTodo = z.infer<typeof updateTodo>;
export type CreateTodo = z.infer<typeof createTodo>;

export const todoRouter = router({
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  createTodo: protectedProcedure
    .input(createTodo)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),

  deleteTodo: protectedProcedure
    .input(identifyTodo)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),

  updateTodo: protectedProcedure
    .input(updateTodo)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
    }),
  completeTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
        },
      });
    }),
});
