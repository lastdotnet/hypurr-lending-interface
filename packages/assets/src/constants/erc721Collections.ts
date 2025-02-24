import { type Address } from 'viem'

const mainnetCollections: Address[] = [
  '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // Bored Ape Yacht Club
  '0x8821BeE2ba0dF28761AffF119D66390D594CD280', // DeGods
  '0xED5AF388653567Af2F388E6224dC7C4b3241C544', // Azuki
  '0x60E4d786628Fea6478F785A6d7e704777c86a7c6', // Mutant Ape Yacht Club
  '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8', // Pudgy Penguins
  '0x23581767a106ae21c074b2276D25e5C3e136a68b', // Moonbirds
  '0x5946aeAAB44e65Eb370FFaa6a7EF2218Cff9b47D', // Creepz
  '0xe1dC516B1486Aba548eecD2947A11273518434a4', // The Grapes
  '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', // CryptoPunks
  '0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B', // CloneX
  '0xb668beB1Fa440F6cF2Da0399f8C28caB993Bdd65', // Neo Tokyo Citizen
  '0x0581dDf7A136c6837429a46C6Cb7b388A3E52971', // BlockGames Dice
  '0xB9951B43802dCF3ef5b14567cb17adF367ed1c0F', // Neo Tokyo Citizen V2
  '0x8cDBd7010Bd197848e95C1FD7F6E870AaC9b0d3C', // AOI Engine
  '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e', // Doodles
  '0x5Af0D9827E0c53E4799BB226655A1de152A425a5', // Milady Maker
  '0xB6a37b5d14D502c3Ab0Ae6f3a0E058BC9517786e', // Azuki Elementals
  '0x8cDBd7010Bd197848e95C1FD7F6E870AaC9b0d3C', // Trademark by Jack Butcher
  '0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6', // Wrapped Cryptopunks
  '0x81Ae0bE3A8044772D04F32398bac1E1B4B215aa8', // Dreadfulz

  // Upshot
  '0xf210d5d9dcf958803c286a6f8e278e4ac78e136e', // Jay Pegs Auto Mart
  '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623', // Bored Ape Kennel Club
  '0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7', // Autoglyphs
  '0x059edd72cd353df5106d2b9cc5ab83a52287ac3a', // Art Blocks
  '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270', // Art Blocks
  '0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949', // BEANZ
  '0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258', // Otherside
  '0x42069abfe407c60cf4ae4112bedead391dba1cdb', // Crypto Dick Butts

  // DYAD
  '0xDc400bBe0B8B79C07A962EA99a642F5819e3b712',
]

const baseCollections: Address[] = [
  '0xfb019ec15dABEB24cb084e71f60358E032b1451C', // Basebird
  '0xC57bded689c0c528a16ED435b073E4E9a10d85dC', // Based Mfers
  '0x2D53D0545CD1275B69040e3C50587E2CC4443A52', // Based Gods
]

export const ERC_721_COLLECTIONS_WHITELIST: Address[] = [...mainnetCollections, ...baseCollections]
