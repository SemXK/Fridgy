const Echo = (await import('laravel-echo')).default;
const Pusher = (await import('pusher-js/react-native')).default;

export abstract class WebsocketHandlerClass {
  static PusherPublicKey = process.env.EXPO_PUBLIC_PUSHER_APP_NAME
  static echoInstance: any;

  // $ Create Echo Instance
  static async getEcho () {
    // 1* Check if the user has currently the selected socket active
    if(this.echoInstance) {
      return this.echoInstance
    } 

    // 1* Create pusher client 
    const pusherClient = new Pusher(
      this.PusherPublicKey as string,
      {
        cluster: 'mt1',
        wsHost: '10.0.2.2',
        wsPort: 8080,
        forceTLS: false,
        disableStats: true,
        enabledTransports: ['ws'],
      }
    );

    // 1* Create websocket instance
    this.echoInstance = new Echo({
      broadcaster: 'pusher',
      client: pusherClient,
    });
    
    // 1* Return
    return this.echoInstance;
  }

}