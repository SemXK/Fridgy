import EchoModule from "laravel-echo";
import PusherModule from "pusher-js/react-native";

const Echo = (EchoModule as unknown as { default?: typeof EchoModule }).default ?? EchoModule;
const Pusher = (PusherModule as any).Pusher;

let echoInstance: any;


export async function getEcho(): Promise<typeof Echo<any>> {
  if (echoInstance) return echoInstance;

  const AppName = process.env.EXPO_PUBLIC_PUSHER_APP_NAME;
  const ApiEndpoint = process.env.EXPO_PUBLIC_REVERB_ENDPOINT;

  //| Production development
  // const pusherClient = new Pusher(AppName as string, {
  //   cluster: "mt1",
  //   wsHost: ApiEndpoint,
  //   wsPort: 80,
  //   wssPort: 443,
  //   forceTLS: true,
  //   enabledTransports: ["ws","wss"],
  // });

  //| Local development
  const pusherClient = new Pusher(AppName as string, {
    cluster: "mt1",
    wsHost: ApiEndpoint,
    wsPort: 8080,
    forceTLS: false,
    // disableStats: true,
    enabledTransports: ["ws"],
  });

  echoInstance = new Echo({
    broadcaster: "pusher",
    client: pusherClient,
  });

  return echoInstance;
}
