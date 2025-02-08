// import { useState, useEffect } from 'react';
// import { Client } from "@stomp/stompjs";
// import { clientUrl } from 'lib/endpoints';

// export default function ConnectionPage() {
//   const [stompClient, setStompClient] = useState<Client | undefined>(undefined)

//   useEffect(() => {
//     console.log("creating STOMP client")
//     const stompClient = new Client({
//       brokerURL: `${clientUrl}/websocket/enquiryMessages`
//     })
//     console.log("Activation STOMP connection...")
//     stompClient.activate();
//     stompClient.onConnect = function () {
//       console.log("Successfully connected to STOMP client");
//       setStompClient(stompClient)
//     }
//   }, [stompClient])
// }
