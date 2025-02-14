import { ENV } from '../../../environment';

const RECALL_ID = '3329df96-0954-4f5f-8a09-8d87b91137e2';

export const sendNotifications = async (address: string, id: string) => {
  try {
    const response = await fetch(
      `https://notify.walletconnect.com/${ENV.WALLET_CONNECT_ID}/notify`,
      {
        body: JSON.stringify({
          accounts: [`eip155:1:${address}`],
          notification: {
            body: id,
            icon: 'https://astaria.xyz/assets/images/apple-touch-icon.png',
            title: 'Recall Notification',
            type: RECALL_ID,
          },
        }),
        headers: {
          Authorization: `Bearer ${ENV.WALLET_CONNECT_SECRET}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );
    console.log(
      `Recall notification is sent to ${address} for loan with ID: ${id}`
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
