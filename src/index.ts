import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import router from "./routes.ts";

const app = new Application();

app.use(router.routes())

await app.listen({ port: 3000 });