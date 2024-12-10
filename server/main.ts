import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import { oakCors } from "@tajpouria/cors";
import data from './api/data.json' with {type:'json'};
export const app = new Application();
const router = new Router();

router.get('/api/dinosaurs',(context)=>{
  context.response.body = data;
})

router.get('/api/dinosaurs/:dinosaur',(context)=>{
  if(!context?.params.dinosaure){
    context.response.body = "No dinosaure name provided"
  }
  const dinosaure = data.find(item=>item.name.toLowerCase()==context.params.dinosaure.toLowerCase())
  context.response.body = dinosaure ?? 'No dinosaure found.'
})

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  console.log("Server listening on port http://localhost:8000");
  await app.listen({ port: 8000 });
}
