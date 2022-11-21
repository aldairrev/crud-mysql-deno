import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
} from "./controllers/user.controller.ts"

const router = new Router();

router
    .get('/', (ctx) => {
        ctx.response.body = "こんにちは";
    })
    .get("/users", getUsers)
    .get("/users/:id", getUser)
    .post("/users", addUser)
    .put("/users/:id", updateUser)
    .delete("/users/:id", deleteUser);

export default router;
