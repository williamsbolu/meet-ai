import { eq, count } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { polarClient } from "@/lib/polar";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";

export const premiumRouter = createTRPCRouter({
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    // Get the current user
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });

    // Check if the user has an active subscription
    const subscription = customer.activeSubscriptions[0];

    if (!subscription) {
      return null;
    }

    // Match the subscription with the product
    const product = await polarClient.products.get({
      id: subscription.productId,
    });

    return product;
  }),
  getProducts: protectedProcedure.query(async ({}) => {
    const products = await polarClient.products.list({
      isArchived: false,
      isRecurring: true,
      sorting: ["price_amount"],
    });

    return products.result.items;
  }),
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    // Fetch the customer's state using their external ID basically the user id
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });

    const subscription = customer.activeSubscriptions[0];

    //  if the user is a paid user
    if (subscription) {
      return null;
    }

    // count the meetings the user has created
    const [userMeetings] = await db
      .select({
        count: count(meetings.id),
      })
      .from(meetings)
      .where(eq(meetings.userId, ctx.auth.user.id));

    // count the agents the user has created
    const [userAgents] = await db
      .select({
        count: count(agents.id),
      })
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));

    return {
      meetingCount: userMeetings.count,
      agentCount: userAgents.count,
    };
  }),
});
