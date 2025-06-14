import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(process.env.DATABASE_URL!);

// 35:46: didnt use the neondatabase/severless config method because this default method works okay
