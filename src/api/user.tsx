import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { UserRow } from "../components/userRow";
import { EditUser } from "../components/editUser";
import db from "../database/db";
import { usersTable, UserType } from "../database/schema";

export const getUser = new Elysia()
  .get("/user", async () => {
    const allUsers: Array<UserType> = await db.select().from(usersTable);
    return (
      <>
        {allUsers.map(u => <UserRow {...u} />)}
      </>
    );
  });

export const getUserById = new Elysia()
  .get("/user/:id", async ({ params }) => {
    const id = params.id;
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return (<UserRow {...user[0]} />);
  }, {
    params: t.Object({
      id: t.Number()
    })
  });

export const postUser = new Elysia()
  .post("/user", async ({ body }) => {
    const result: Array<UserType> = await db.insert(usersTable).values({
      name: body.name,
      email: body.email
    }).returning();
    return (
      <>
        {result.map(u => <UserRow {...u} />)}
      </>
    );
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" })
    })
  });

export const getEditUserForm = new Elysia()
  .get("/edit/:id", async ({ params }) => {
    const id = params.id;
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return (<EditUser id={user[0].id} name={user[0].name} email={user[0].email} />);
  },
  {
    params: t.Object({
      id: t.Number()
    })
  });

export const updateUser = new Elysia()
  .put("/user/:id", async ({ params, body }) => {
    const id = params.id;
    const { name ,email } = body;
    const [{newName, newEmail}] = await db.update(usersTable)
    .set({ name, email })
    .where(eq(usersTable.id, id))
    .returning({
      newName: usersTable.name,
      newEmail: usersTable.email
    });
    return (
      <UserRow id={id} name={newName} email={newEmail} />
    );
  }, {
    params: t.Object({
      id: t.Number()
    }),
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" })
    })
  });

export const deleteUser = new Elysia()
  .delete("/user/:id", async ({ params }) => {
    const id = params.id;
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return new Response("", { status: 200 });
  }, {
    params: t.Object({
      id: t.Number()
    })
  });