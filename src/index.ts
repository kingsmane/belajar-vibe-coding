import { Elysia, t } from "elysia";
import { db, schema } from "./db";
import { eq } from "drizzle-orm";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  // Root & Health Check Endpoints
  .get("/", () => ({
    name: "Belajar Vibe Coding API",
    version: "1.0.0",
    status: "online",
  }))
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }))

  // User Management Endpoints (Drizzle ORM + MySQL Example)
  .group("/users", (app) =>
    app
      .get("/", async ({ set }) => {
        try {
          const allUsers = await db.select().from(schema.users);
          return { success: true, data: allUsers };
        } catch (error: any) {
          set.status = 500;
          return {
            success: false,
            message: "Database error. Please ensure MySQL is running and configured in .env",
            error: error.message,
          };
        }
      })
      .post(
        "/",
        async ({ body, set }) => {
          try {
            await db.insert(schema.users).values({
              name: body.name,
              email: body.email,
            });
            set.status = 201;
            return {
              success: true,
              message: "User created successfully",
            };
          } catch (error: any) {
            set.status = 500;
            return {
              success: false,
              message: "Failed to create user",
              error: error.message,
            };
          }
        },
        {
          body: t.Object({
            name: t.String({ minLength: 1 }),
            email: t.String({ format: "email" }),
          }),
        }
      )
      .get(
        "/:id",
        async ({ params: { id }, set }) => {
          try {
            const user = await db
              .select()
              .from(schema.users)
              .where(eq(schema.users.id, Number(id)))
              .limit(1);

            if (user.length === 0) {
              set.status = 404;
              return { success: false, message: "User not found" };
            }

            return { success: true, data: user[0] };
          } catch (error: any) {
            set.status = 500;
            return {
              success: false,
              message: "Failed to fetch user",
              error: error.message,
            };
          }
        },
        {
          params: t.Object({
            id: t.Numeric(),
          }),
        }
      )
  )
  .listen(port);

console.log(
  `🚀 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
