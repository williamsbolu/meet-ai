import { z } from "zod";
import { eq } from "drizzle-orm";
import {
  // baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";

export const agentsRouter = createTRPCRouter({
  // getMany: baseProcedure.query(async () => { // This defaule is not protected, good for public routes
  //   const data = await db.select().from(agents);

  //   return data;
  // }),
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),
  create: protectedProcedure
    .input(agentsInsertSchema) // validaion is done here
    .mutation(async ({ ctx, input }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
