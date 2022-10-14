import { z } from "zod";

export const createTodo = z.object({
  title: z
    .string({
      invalid_type_error: "Todo is required",
      required_error: "This is wrong my guy",
      description: "This is a description",
    })
    .min(1)
    .max(255),
});

export const updateTodo = z.object({
  id: z.string(),
  title: z
    .string({
      invalid_type_error: "Come on at least say something...",
      required_error: "Todo is required",
    })
    .min(1)
    .max(255),
});

export const identifyTodo = z.object({ id: z.string() });
