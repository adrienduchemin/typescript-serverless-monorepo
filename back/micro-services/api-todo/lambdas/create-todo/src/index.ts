import { Context, Handler, APIGatewayProxyEvent } from "aws-lambda";
import { generateInstanceId } from "@lambda-utils";
import { ICreateTodo } from "@shared-types";
import { handle } from "./main";
import { init } from "./init";

// let inited = false;
const instanceId = generateInstanceId();
console.log("Starting lambda", { instanceId });

// maybe to delete if not workings
(async () => {
  console.log("Initing lambda", { instanceId });
  await init();
})();

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  console.log("Handling lambda", { event, context, instanceId });
  //   if (!inited) {
  //     await init();
  //     inited = true;
  //   }
  if (event.body === null) {
    return "why no body :(";
  }
  const body = JSON.parse(event.body) as ICreateTodo;
  return handle(body);
};
