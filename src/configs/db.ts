import { Client } from "https://deno.land/x/mysql@v2.10.3/mod.ts";

const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  password: "",
  db: "crud_deno",
});

export default client;