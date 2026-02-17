let echoInstance: any;

export async function getEcho() {
  if (echoInstance) return echoInstance;

  const Echo = (await import("laravel-echo")).default;
  const Pusher = (await import("pusher-js/react-native")).default;
  const AppName = process.env.EXPO_PUBLIC_PUSHER_APP_NAME;

  const pusherClient = new Pusher(AppName as string, {
    cluster: "mt1",
    // wsHost: '10.0.2.2', // android emulator
    wsHost: "192.168.1.3",
    wsPort: 8080,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ["ws"],
  });

  echoInstance = new Echo({
    broadcaster: "pusher",
    client: pusherClient,
  });

  return echoInstance;
}
