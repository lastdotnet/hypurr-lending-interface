import { writeFileSync } from 'node:fs';

async function main() {
  const response = await fetch(
    'https://raw.githubusercontent.com/0xB10C/ofac-sanctioned-digital-currency-addresses/lists/sanctioned_addresses_ETH.json'
  );
  const data = await response.json();

  writeFileSync('src/ofac-blacklist.json', JSON.stringify(data));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
