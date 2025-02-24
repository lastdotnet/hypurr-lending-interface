const shareMessages = [
  'I just submitted a gas-free intent on Astaria to allow the market to bid on my loan request!',
  'Excited to announce that I’ve made a gas-free submission of my loan request on Astaria, opening the door for market bids!',
  'Just went gas-free on Astaria by submitting my loan request, now eagerly awaiting bids from the market!',
  'Thrilled to have posted my loan request on Astaria without incurring any gas fees – now the market can start bidding!',
  'Just set my loan request live on Astaria, completely bypassing gas fees, and now I’m inviting the market to submit their bids!',
]
export const getShareMessage = ({ randomNumber }: { randomNumber: number }) =>
  shareMessages[Math.floor(randomNumber * shareMessages.length)]
