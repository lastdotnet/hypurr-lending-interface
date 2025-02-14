## [2.0.1](https://github.com/astariaxyz/astaria-sdk/compare/v2.0.0...v2.0.1) (2023-11-21)


### Bug Fixes

* replace BLUR with BLEND for ProviderType and LoanType ([9136641](https://github.com/astariaxyz/astaria-sdk/commit/913664148ae665693bdede677601789ae5438985))

# [2.0.0](https://github.com/astariaxyz/astaria-sdk/compare/v1.3.3...v2.0.0) (2023-11-21)


### Features

* remove unused utilities ([34dddaa](https://github.com/astariaxyz/astaria-sdk/commit/34dddaaf0ec6c1461d56806bebead226e205d686))


### BREAKING CHANGES

* remove unused utilities

## [1.3.3](https://github.com/astariaxyz/astaria-sdk/compare/v1.3.2...v1.3.3) (2023-11-09)


### Bug Fixes

* abi dto can be an array ([f2a094d](https://github.com/astariaxyz/astaria-sdk/commit/f2a094d5ff453425bcadefb971b2b31d0161e957))

## [1.3.2](https://github.com/astariaxyz/astaria-sdk/compare/v1.3.1...v1.3.2) (2023-11-08)


### Bug Fixes

* change so ERC20 only has tokenId on the LoanPosition ([5c785f0](https://github.com/astariaxyz/astaria-sdk/commit/5c785f0af98de98e17467d10a36b462ad262cf0b))

## [1.3.1](https://github.com/astariaxyz/astaria-sdk/compare/v1.3.0...v1.3.1) (2023-11-08)


### Bug Fixes

* tokenId for ERC20 ([b1b9c39](https://github.com/astariaxyz/astaria-sdk/commit/b1b9c39395cd098ec62cf21caa7359cd5e009d47))

# [1.3.0](https://github.com/astariaxyz/astaria-sdk/compare/v1.2.0...v1.3.0) (2023-11-08)


### Features

* auctionStatus dtos ([0c2ca17](https://github.com/astariaxyz/astaria-sdk/commit/0c2ca178a49581fc45df2deb0873100b421f1f9f))
* update merkletreejs ([00f6b64](https://github.com/astariaxyz/astaria-sdk/commit/00f6b64008b6f0f7c54838d0fc6d57e3e5fb64f4))
* use fetch instead of axios ([16cbca8](https://github.com/astariaxyz/astaria-sdk/commit/16cbca8fe29ff771582b0665ea715653fa3f458f))

# [1.2.0](https://github.com/astariaxyz/astaria-sdk/compare/v1.1.0...v1.2.0) (2023-10-27)


### Features

* upgrade dependencies ([f187c08](https://github.com/astariaxyz/astaria-sdk/commit/f187c08ce4a9c4b4fedf38e4d253236a4d8e580f))

# [1.1.0](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.3...v1.1.0) (2023-10-27)


### Features

* add types for offer commitment ([9b66137](https://github.com/astariaxyz/astaria-sdk/commit/9b6613721acabf26cc2e622f67cb879e41bb9ca5))

## [1.0.3](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.2...v1.0.3) (2023-10-24)


### Bug Fixes

* export Loan type ([7f3af3c](https://github.com/astariaxyz/astaria-sdk/commit/7f3af3c2c40cefc1ee50ad6beac9836e84496113))

## [1.0.2](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.1...v1.0.2) (2023-10-19)


### Bug Fixes

* astaria origination arg add cid ([727fcd1](https://github.com/astariaxyz/astaria-sdk/commit/727fcd1dc852632cb432fa49bb38394e4c1bc54b))
* change OfferOriginationResponseSchema to what we actually need ([ca150b3](https://github.com/astariaxyz/astaria-sdk/commit/ca150b3d237f5b6366f0a736b3551c3e6938e71f))
* export loan positions ([c5bfa2b](https://github.com/astariaxyz/astaria-sdk/commit/c5bfa2b80840ec5d59c9cfd73c5e54d3edc06e08))

## [1.0.1](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0...v1.0.1) (2023-10-16)


### Bug Fixes

* add missing ratio to underlying and minAmount ([eada127](https://github.com/astariaxyz/astaria-sdk/commit/eada127c92ac0f490c615ec61f05c6512a991dec))
* export Paging ([80a1dbe](https://github.com/astariaxyz/astaria-sdk/commit/80a1dbe2ef49c9e683f520cece47ac60fc6bff41))

# 1.0.0 (2023-10-13)


### Bug Fixes

* abi import paths ([075591e](https://github.com/astariaxyz/astaria-sdk/commit/075591eab222322f634aabd4c4ed41a08b404849))
* add missing types export ([768a254](https://github.com/astariaxyz/astaria-sdk/commit/768a254f10644752dc2aa4bb130b38a8c68d2fdb))
* add module name mappings to jest config ([e71fb39](https://github.com/astariaxyz/astaria-sdk/commit/e71fb3907513db0d0c9c9b672ac065e7f09481e9))
* add pointsBaseURL to AstariaSDKConfig type ([1509273](https://github.com/astariaxyz/astaria-sdk/commit/150927377f549fc1be993714a9e08bfd4f59a669))
* add timestamp to scorable events response ([8af9458](https://github.com/astariaxyz/astaria-sdk/commit/8af9458f0569beb2a016b19d68d43b0a86f675ee))
* adds babel config to fix es module issues ([6f7f091](https://github.com/astariaxyz/astaria-sdk/commit/6f7f09153d476a99dabda01508bab8306d71e476))
* build and test passing ([1d07915](https://github.com/astariaxyz/astaria-sdk/commit/1d07915b15b8fd03e5d97ea8745270c5ddf6e959))
* bump ABI for the new deployment ([276475a](https://github.com/astariaxyz/astaria-sdk/commit/276475a3e9986f7ded681d5c10ac46877f497bbb))
* cast proper type for transformed AddressSchema ([5ec99fb](https://github.com/astariaxyz/astaria-sdk/commit/5ec99fbf6acdd57a4d3f155576db191ead82ca8d))
* change args in write transaction to array ([0193fcd](https://github.com/astariaxyz/astaria-sdk/commit/0193fcd66331101c863faf1a724289529248a68a))
* change papaparse to default import as it's a commonjs module ([6739869](https://github.com/astariaxyz/astaria-sdk/commit/6739869d234499d30dd3c064967f94302bb3d2c4))
* changes to collateralId calculation ([bce6d93](https://github.com/astariaxyz/astaria-sdk/commit/bce6d939e57b4a3188542eba9ba1e2f4a8b4ec7c))
* changes to fix v3 types ([1e73a2a](https://github.com/astariaxyz/astaria-sdk/commit/1e73a2a2e9c3fd305010814b18400ef7cef62965))
* ci/cd issues with linter ([0365530](https://github.com/astariaxyz/astaria-sdk/commit/03655306e51b6aa124bac45e3ab2fec7984f2a2e))
* circular dependencies ([7ac41a1](https://github.com/astariaxyz/astaria-sdk/commit/7ac41a173ea91c41f102bea081ee8d8af247efd0))
* cjs build ([4a8e3d7](https://github.com/astariaxyz/astaria-sdk/commit/4a8e3d7684ea58248b7ef6224cee6a5d9b49f8ea))
* convert OfferRouter to hook etc ([0f0dd96](https://github.com/astariaxyz/astaria-sdk/commit/0f0dd96d3074c5e778cb5e0c031a3f9bce5d133e))
* decodeIPFSStrategyPayload now properly handles BigNumbers ([355dbc4](https://github.com/astariaxyz/astaria-sdk/commit/355dbc4f1b10f397c59f0fb76e2d69e7d7dfb1d4))
* disable husky pre-commit hooks in ci ([9c74a77](https://github.com/astariaxyz/astaria-sdk/commit/9c74a7753bc4508ee4d2ec238099927ad61188db))
* ensure that the results of encodeIPFSStrategyPayload are deterministic ([f41bd99](https://github.com/astariaxyz/astaria-sdk/commit/f41bd99757ab3daf2d37882dbde36ae7533ade7b))
* eslint ([eee52c1](https://github.com/astariaxyz/astaria-sdk/commit/eee52c18cf0c3b79add1372f288ecbe3e12a392e))
* explicit type for UniqueOfferSchema to pass through field types ([72c3864](https://github.com/astariaxyz/astaria-sdk/commit/72c386463b79f53ab6028ead87a5732503e757e5))
* export constatns for strategy ([9c5be9d](https://github.com/astariaxyz/astaria-sdk/commit/9c5be9d37ec1a616fd38323119de3b27b8a27aa6))
* expose method for filtering dynamicVaultDetails ([9e61293](https://github.com/astariaxyz/astaria-sdk/commit/9e612935fb01b1b50eac0c3ba159ba7a3c56be29))
* fixed parsing for signed BigNumbers ([55d52a9](https://github.com/astariaxyz/astaria-sdk/commit/55d52a99a235fadbc0801412930c860c54a312fd))
* fromParsedStrategyRow is now public ([8ea69e3](https://github.com/astariaxyz/astaria-sdk/commit/8ea69e3f1ec2720adc9666e82668bec07192d06c))
* get offers dtos ([29ded45](https://github.com/astariaxyz/astaria-sdk/commit/29ded45e327636192ff1efd2fb3b44e377e5f411))
* get offers dtos ([34aef85](https://github.com/astariaxyz/astaria-sdk/commit/34aef8598d587dd276ebe8a59ac6182877e43f0d))
* git actions ([a2fd9d1](https://github.com/astariaxyz/astaria-sdk/commit/a2fd9d1edc139b1fa0430b345c962dd4441359b5))
* git actions ([5efb590](https://github.com/astariaxyz/astaria-sdk/commit/5efb5902b27827ddac21e91ded948a563c62c1bd))
* git actions ([d761de6](https://github.com/astariaxyz/astaria-sdk/commit/d761de68f4fd953c5c0059c589d8674337f76db7))
* git actions ([0888cb7](https://github.com/astariaxyz/astaria-sdk/commit/0888cb731a9af083c4d713fc1140a5248d4d6bb9))
* git actions ([1d65781](https://github.com/astariaxyz/astaria-sdk/commit/1d65781fc08baee58af323ba78d396edee385c1e))
* git actions ([447ce3a](https://github.com/astariaxyz/astaria-sdk/commit/447ce3ae7352ef2e6db85b3d709559d640fa2e4c))
* git actions ([e6a478d](https://github.com/astariaxyz/astaria-sdk/commit/e6a478d63d5e64a4b7dff4e2ad35e862186d9f30))
* git actions ([bbb8e62](https://github.com/astariaxyz/astaria-sdk/commit/bbb8e62fa692ddd3dbaaf623714e9a3dd856ba55))
* git actions ([28ef8dd](https://github.com/astariaxyz/astaria-sdk/commit/28ef8ddc9f0026c066d7e7c9bbf8e61ec0e56424))
* git actions ([6b13665](https://github.com/astariaxyz/astaria-sdk/commit/6b13665b4c78844776f851319bec459677c6bda1))
* github actions and lint errors ([4850337](https://github.com/astariaxyz/astaria-sdk/commit/4850337eb25f9830cb0b26bd89a196faf5899d36))
* implement API logic, and proof response to contract conversion ([#21](https://github.com/astariaxyz/astaria-sdk/issues/21)) ([f14fa8b](https://github.com/astariaxyz/astaria-sdk/commit/f14fa8b8f4bb108a4be5f2fc69279bbe92335b98))
* implemented changes for pagination and guerilla-frontend ([ad9486f](https://github.com/astariaxyz/astaria-sdk/commit/ad9486fb19fabedc2f1fc5642c71fd7f727fe140))
* make merkletreejs import esm compatible ([6497203](https://github.com/astariaxyz/astaria-sdk/commit/6497203cf7ac9ed78b00070649e6ec2ce7408028))
* make the AstariaSDKConfig params optional ([27b32e6](https://github.com/astariaxyz/astaria-sdk/commit/27b32e6fcc8b51279c880c2f8adcf6ddb1b27660))
* moved strategy row invariant check to constructor, changed leaf type values, fixed csv parsing ([5d72878](https://github.com/astariaxyz/astaria-sdk/commit/5d728781a92d0650197cc0582e0f852e8f220438))
* nonce hashing incorrectly ([#50](https://github.com/astariaxyz/astaria-sdk/issues/50)) ([b6aff3e](https://github.com/astariaxyz/astaria-sdk/commit/b6aff3e85f95b99c755c9217ae35b44cadbfb745))
* paging schema ([d789bb0](https://github.com/astariaxyz/astaria-sdk/commit/d789bb00c32f0b9242235d1eb5113d871d8d204f))
* prettier plugin syntax for compatibility with vscode ([49372c7](https://github.com/astariaxyz/astaria-sdk/commit/49372c78e77eb20ffe658be173ff6a5e2949627f))
* refactor imports to have .js ending as required by ESM ([8f9eee1](https://github.com/astariaxyz/astaria-sdk/commit/8f9eee129593662195beeb1e0d3be0d59e8bed42))
* relative paths, tests broken ([eaee739](https://github.com/astariaxyz/astaria-sdk/commit/eaee739cda5b9b476c895a84b3a749d4c1bff6b6))
* remove eth-sig-util ([63de092](https://github.com/astariaxyz/astaria-sdk/commit/63de092ec17bc933164070558da7738970007d43))
* remove linter from ci workflow, exclude src from build ([7c6a470](https://github.com/astariaxyz/astaria-sdk/commit/7c6a470f56e137c022f43aaa20e6bd1a13fafaef))
* remove offerrouter ([a68fc0e](https://github.com/astariaxyz/astaria-sdk/commit/a68fc0e241d7ae843736ab94679a4fe0ce7e14b3))
* remove the unused vaultBalance field on VaultResponseSchema ([bf24235](https://github.com/astariaxyz/astaria-sdk/commit/bf2423577e2c3d7d058729462c0d8baef1c521cc))
* removing slash ([3091e4b](https://github.com/astariaxyz/astaria-sdk/commit/3091e4bfec711d063d4d734a7b2d2cd05c63e792))
* replace ganache with ethereum-waffle ([f7b4a06](https://github.com/astariaxyz/astaria-sdk/commit/f7b4a06e0759699bf18583743b1c30e02057e569))
* replace ganache with ethereum-waffle ([aa568a7](https://github.com/astariaxyz/astaria-sdk/commit/aa568a71f248d0f1ed74c34fe72062409466089b))
* replaced vaultImplementation ([24dfa27](https://github.com/astariaxyz/astaria-sdk/commit/24dfa271fb37e738ca79e963526e26e2666c830b))
* return amount instead of balance fields ([faef0e1](https://github.com/astariaxyz/astaria-sdk/commit/faef0e1ca50024ffec7f4ab30882a810caab799b))
* revert ([cfe82e2](https://github.com/astariaxyz/astaria-sdk/commit/cfe82e28a6df714bc8d239f6b8b42efce3b3dfc7))
* revert amount to balance field name ([5d6db67](https://github.com/astariaxyz/astaria-sdk/commit/5d6db6718d38e61fe65165a59ea0b0b3b7ed483d))
* target in tsconfig es6 -> ES6 ([f8e55c9](https://github.com/astariaxyz/astaria-sdk/commit/f8e55c97041ca1453f1f463c2bbf1e54c6e6ca5d))
* tests ([7d9a742](https://github.com/astariaxyz/astaria-sdk/commit/7d9a742ccf0198dc065ac3daa6a9ced16d5ee061))
* tests ([324664b](https://github.com/astariaxyz/astaria-sdk/commit/324664bbb7953f86ae4a02a081fcf2d52359b82e))
* unchecksum all addresses ([d4ca57c](https://github.com/astariaxyz/astaria-sdk/commit/d4ca57c1d550c6bdc918a714ed50266c55234a10))
* unique offer path ([bda90b9](https://github.com/astariaxyz/astaria-sdk/commit/bda90b9a1eb42b7730b99a92c88c11e67c81558f))
* unnecassary constant ([f50c666](https://github.com/astariaxyz/astaria-sdk/commit/f50c6663011f3130f87c5218be14be1d569385c8))
* update abi ([cafb6b7](https://github.com/astariaxyz/astaria-sdk/commit/cafb6b7764a63f6426cf62f6671e49fc3e26e36e))
* update prepare in package.json ([#15](https://github.com/astariaxyz/astaria-sdk/issues/15)) ([edebf4b](https://github.com/astariaxyz/astaria-sdk/commit/edebf4b145335df1a7ef73fae504c8335f0de68e))
* Updates collateralId generation ([cdc60e3](https://github.com/astariaxyz/astaria-sdk/commit/cdc60e3ca77d7f32eb58a3ecb8102ecdf90965dc))
* use namespace import for zod ([cf34c10](https://github.com/astariaxyz/astaria-sdk/commit/cf34c107c654433e8a6d709ef9f239c0f0e30a03))
* use tuple for args in write transaction ([34cc5f2](https://github.com/astariaxyz/astaria-sdk/commit/34cc5f2d9420a279c2e3e7edeab1c94caff48cb9))
* use Uint256Schema, not bigint ([7da4c1c](https://github.com/astariaxyz/astaria-sdk/commit/7da4c1c8df1ac8c3e67d756daf39abceb2779bb8))
* values for StrategyLeafType enum are now strings ([e5aa7cb](https://github.com/astariaxyz/astaria-sdk/commit/e5aa7cba95c517e1e13874847bb71da3dc25d7c0))
* vault implementation export ([f5d0d96](https://github.com/astariaxyz/astaria-sdk/commit/f5d0d96047e948da9265f74d2be542a981803fd8))
* vault implementation export in factories index ([a08133e](https://github.com/astariaxyz/astaria-sdk/commit/a08133e773fb7047221d0650c4e26b86d8ce3caf))


### chore

* require node 18 ([5cac753](https://github.com/astariaxyz/astaria-sdk/commit/5cac7539853bbf0463f9fa955ceeff9db3ae8b81))
* use tsup to build our app ([11d780d](https://github.com/astariaxyz/astaria-sdk/commit/11d780d49073ae7762d45e1d5b7b37d371d72cc5))


### Code Refactoring

* don't export strategy type ([4ad5be2](https://github.com/astariaxyz/astaria-sdk/commit/4ad5be2edb5c613441d89578f3f50503f58e37a3))


### Features

* add codegen output to git, update config ([91bb2b2](https://github.com/astariaxyz/astaria-sdk/commit/91bb2b29aebfd949dd905d130affd3bcc0674bed))
* add custom resolutions to support typescript v4 ([a20bd68](https://github.com/astariaxyz/astaria-sdk/commit/a20bd68148538d84fb4bbe0197e5a7fc43b3c3da))
* add erc20 support ([#49](https://github.com/astariaxyz/astaria-sdk/issues/49)) ([c33b507](https://github.com/astariaxyz/astaria-sdk/commit/c33b507b0c2675ae9ecb03d631619443a79bd184))
* add erc20 to the offer schema for decoding within the front end ([#51](https://github.com/astariaxyz/astaria-sdk/issues/51)) ([e8c3de1](https://github.com/astariaxyz/astaria-sdk/commit/e8c3de1c294793b8a3084ca1d558b974c9f3ae4b))
* add field to UserScoreResponse ([13ca9bd](https://github.com/astariaxyz/astaria-sdk/commit/13ca9bde5fd41a62cabab98336c2160fd7cbfe4e))
* add strategy constants ([e16100a](https://github.com/astariaxyz/astaria-sdk/commit/e16100a1c17cab7fd1fda7303df8c4634898a133))
* add typechain integration ([e53498c](https://github.com/astariaxyz/astaria-sdk/commit/e53498c0216874b9df831e7d66576f00a96780e1))
* add types for the new offers endpoint ([9b9649f](https://github.com/astariaxyz/astaria-sdk/commit/9b9649f18de57e78cf208b9e0b05adc074cb604e))
* add typescript bindings to distribution ([4822ddb](https://github.com/astariaxyz/astaria-sdk/commit/4822ddb26ce2254f1c0893406b271a99967e3ad1))
* add Uint8Schema ([9991228](https://github.com/astariaxyz/astaria-sdk/commit/999122839082d4fca37539551633293c646e617f))
* add zod validation ([#16](https://github.com/astariaxyz/astaria-sdk/issues/16)) ([6dd5bdb](https://github.com/astariaxyz/astaria-sdk/commit/6dd5bdb25f2e0749f4846ed05e3a117fdd9a7cf6))
* added fromParsedStrategyRow method to StrategyTree ([de6a54a](https://github.com/astariaxyz/astaria-sdk/commit/de6a54aeb8580185ef63a68d676492fd1f15d214))
* build and release, dispatch trigger ([e23dd88](https://github.com/astariaxyz/astaria-sdk/commit/e23dd8844ace3b127c361755bc829f8d9a943644))
* bump abi version ([e94dcdc](https://github.com/astariaxyz/astaria-sdk/commit/e94dcdc6d4fd61057065311770a08411b81f207b))
* config module, resolve circular dependency ([aa8e3bb](https://github.com/astariaxyz/astaria-sdk/commit/aa8e3bbf749b76cfec16ab7c64283cbc0a8e1d92))
* dto work for get positions ([7a535bb](https://github.com/astariaxyz/astaria-sdk/commit/7a535bbcbb5585f37149aff998df17c215e1f665))
* dto work for offer origination ([f9880ef](https://github.com/astariaxyz/astaria-sdk/commit/f9880ef33376c242fbf5eb8df3e6a051f96b66c3))
* dto work on get position payment ([cb22d9b](https://github.com/astariaxyz/astaria-sdk/commit/cb22d9bf3268bbf5d853d739d22639effaf1aa09))
* dynamic runtime configuration ([781755e](https://github.com/astariaxyz/astaria-sdk/commit/781755e6eec11f002a2871475bc35f69598fdea5))
* export package.json files to npm ([cdf6b2b](https://github.com/astariaxyz/astaria-sdk/commit/cdf6b2ba4a076ac6aa5f9374dad6f4354ed3240d))
* implement changes for a queueing system ([bac7324](https://github.com/astariaxyz/astaria-sdk/commit/bac73248ff5c26d250653864168fceb28dc3d451))
* implement OfferRouter ([fe9bd35](https://github.com/astariaxyz/astaria-sdk/commit/fe9bd3532e1167a5a078dc35b588b622fbe1629a))
* implement signature verification ([e88a1ce](https://github.com/astariaxyz/astaria-sdk/commit/e88a1ce012c79d08821b8f716699fdeb50f504f3))
* improved zod validation ([48f5e63](https://github.com/astariaxyz/astaria-sdk/commit/48f5e6365e900ff9cd917c22fba710bcc585e749))
* increase test timeout ([c9f8fec](https://github.com/astariaxyz/astaria-sdk/commit/c9f8fec38f9352a8c2b509978333430ece6a0171))
* increase timeouts ([7c84ac4](https://github.com/astariaxyz/astaria-sdk/commit/7c84ac4d6ee138b9f4cd17bf3bfe67a5f9042bfd))
* initial split of types ([bd6906a](https://github.com/astariaxyz/astaria-sdk/commit/bd6906ab886d32709bde817c4fdb0916478a5a3f))
* lift timeout into describe block ([e018d96](https://github.com/astariaxyz/astaria-sdk/commit/e018d965c7eddf5f0cd2c5754e8e3c2f71d0a864))
* lint distribution on build ([b90bcc5](https://github.com/astariaxyz/astaria-sdk/commit/b90bcc59eb221a995293b2aef3b219d8d7c876bd))
* more refined types for HexSchema and AddressSchema ([f7a806c](https://github.com/astariaxyz/astaria-sdk/commit/f7a806c46d1bc35c888d00a7170f93a8b2422e5a))
* move all dtos to sdk ([6415de3](https://github.com/astariaxyz/astaria-sdk/commit/6415de377d3f924bd988028c8218d91c4154f15c))
* optional dry-run for manual trigger ([05a6cb8](https://github.com/astariaxyz/astaria-sdk/commit/05a6cb8a55b7894a60c08d8ff75dbba6b9d16ed7))
* publishing alpha releases ([40308b1](https://github.com/astariaxyz/astaria-sdk/commit/40308b1f262659902c1344a7c9e2024f376d536e))
* release dry-run ([caf3cd9](https://github.com/astariaxyz/astaria-sdk/commit/caf3cd91b08dcb0dd03cc6e809e868cc9111c113))
* remove path native module dependency ([fc946d5](https://github.com/astariaxyz/astaria-sdk/commit/fc946d50db195825f728427e2f131b4120cecfd6))
* semantic-release workflow dispatch ([8f57069](https://github.com/astariaxyz/astaria-sdk/commit/8f5706942bfee97d9c483d121b05ac518ebb5ea9))
* split InvalidDuration and InvalidExpiration ([1532517](https://github.com/astariaxyz/astaria-sdk/commit/15325174f1b9495ecaca969df6fddf6ffe4d80e1))
* store raw csv on StategyTree ([b6f94ac](https://github.com/astariaxyz/astaria-sdk/commit/b6f94ac49a2c5fb8860e14018ae8a11b2d7e10bf))
* update actions config ([82924b3](https://github.com/astariaxyz/astaria-sdk/commit/82924b3cea95b602febfca1c6a425f96193671eb))
* update license ([c251fd2](https://github.com/astariaxyz/astaria-sdk/commit/c251fd2def7957b26feec53fd493a64996fb2298))
* update package name ([77bec3e](https://github.com/astariaxyz/astaria-sdk/commit/77bec3e70d72f2af4a13e1fb93473704723c7dbd))
* update publish config to public access ([3a6bf73](https://github.com/astariaxyz/astaria-sdk/commit/3a6bf73375a227f1ffe799d4113f19474e0c2c8b))
* update readme with alpha installation ([103d854](https://github.com/astariaxyz/astaria-sdk/commit/103d8548bbe2069b6fd2eb74a6607874010bffa2))
* update release branch config ([8d3dc4d](https://github.com/astariaxyz/astaria-sdk/commit/8d3dc4db4e410b7b18ec212c0d0027fe5f8c5ff2))
* update release config and prepare for publish ([0fb5e1e](https://github.com/astariaxyz/astaria-sdk/commit/0fb5e1e66695f874be682bf415958ce954a26fd6))
* update testing version matrix ([906d026](https://github.com/astariaxyz/astaria-sdk/commit/906d0264b4a8a5275896479b41e1671df8c0fd23))
* update workflow dependencies to latest ([6c146cb](https://github.com/astariaxyz/astaria-sdk/commit/6c146cbd96ebef747b73d5885dc95355f3d378e7))
* upgrade dependencies ([3774ceb](https://github.com/astariaxyz/astaria-sdk/commit/3774ceb20f2c74913e0d3bbff2bd50e6b3627d8d))
* upgrade dev dependencies ([8655676](https://github.com/astariaxyz/astaria-sdk/commit/86556760dc08db90355a9f27408fe4e78f8803ee))
* use destructured import for zod ([db1e897](https://github.com/astariaxyz/astaria-sdk/commit/db1e897d786f4653116062fc11f8fde77ea6f770))
* workflow dispatch ([b1cda8a](https://github.com/astariaxyz/astaria-sdk/commit/b1cda8a88732f8d0404e9b6fc1b829549dbe3c20))
* workflow_dispatch dryRun variable ([d186080](https://github.com/astariaxyz/astaria-sdk/commit/d1860807dd37dc337b3715736ab4167b6faab99b))


### Reverts

* Revert "refactor: remove extensions" ([7acbaa2](https://github.com/astariaxyz/astaria-sdk/commit/7acbaa25fc37e6f9958a0c6644f3464cbb3a52ce))


### BREAKING CHANGES

* `LoanSchema` renamed to `LoanBaseSchema`. `Loan` renamed to `LoanBase`
* AssetSchema and Asset no longer exported
* Node 18 or higher is required
* back to cjs and esm folders in lib
* error codes changed for strategyValidationResponse, and schema was renamed
* ScorableEventsResponse type has an additional timestamp field
* lib folder and files built are different formats
* UserScoreResponse interface changed
* StrategyTree constructor, type updates

# [1.0.0-alpha.56](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.55...v1.0.0-alpha.56) (2023-09-28)


### Code Refactoring

* don't export strategy type ([4ad5be2](https://github.com/astariaxyz/astaria-sdk/commit/4ad5be2edb5c613441d89578f3f50503f58e37a3))


### BREAKING CHANGES

* AssetSchema and Asset no longer exported

# [1.0.0-alpha.55](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.54...v1.0.0-alpha.55) (2023-09-28)


### Features

* add types for the new offers endpoint ([9b9649f](https://github.com/astariaxyz/astaria-sdk/commit/9b9649f18de57e78cf208b9e0b05adc074cb604e))

# [1.0.0-alpha.54](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.53...v1.0.0-alpha.54) (2023-09-27)


### Bug Fixes

* prettier plugin syntax for compatibility with vscode ([49372c7](https://github.com/astariaxyz/astaria-sdk/commit/49372c78e77eb20ffe658be173ff6a5e2949627f))


### Features

* upgrade dev dependencies ([8655676](https://github.com/astariaxyz/astaria-sdk/commit/86556760dc08db90355a9f27408fe4e78f8803ee))

# [1.0.0-alpha.53](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.52...v1.0.0-alpha.53) (2023-09-27)


### Bug Fixes

* remove the unused vaultBalance field on VaultResponseSchema ([bf24235](https://github.com/astariaxyz/astaria-sdk/commit/bf2423577e2c3d7d058729462c0d8baef1c521cc))

# [1.0.0-alpha.52](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.51...v1.0.0-alpha.52) (2023-09-25)


### chore

* require node 18 ([5cac753](https://github.com/astariaxyz/astaria-sdk/commit/5cac7539853bbf0463f9fa955ceeff9db3ae8b81))


### BREAKING CHANGES

* Node 18 or higher is required

# [1.0.0-alpha.51](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.50...v1.0.0-alpha.51) (2023-09-18)


### Bug Fixes

* export constatns for strategy ([9c5be9d](https://github.com/astariaxyz/astaria-sdk/commit/9c5be9d37ec1a616fd38323119de3b27b8a27aa6))

# [1.0.0-alpha.50](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.49...v1.0.0-alpha.50) (2023-09-18)


### Bug Fixes

* eslint ([eee52c1](https://github.com/astariaxyz/astaria-sdk/commit/eee52c18cf0c3b79add1372f288ecbe3e12a392e))
* unnecassary constant ([f50c666](https://github.com/astariaxyz/astaria-sdk/commit/f50c6663011f3130f87c5218be14be1d569385c8))


### Features

* add strategy constants ([e16100a](https://github.com/astariaxyz/astaria-sdk/commit/e16100a1c17cab7fd1fda7303df8c4634898a133))

# [1.0.0-alpha.49](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.48...v1.0.0-alpha.49) (2023-09-15)


### Bug Fixes

* cjs build ([4a8e3d7](https://github.com/astariaxyz/astaria-sdk/commit/4a8e3d7684ea58248b7ef6224cee6a5d9b49f8ea))


### Reverts

* Revert "fix: remove file extensions" ([e135752](https://github.com/astariaxyz/astaria-sdk/commit/e1357529045603710979988194e1728c8777fcd3))


### BREAKING CHANGES

* back to cjs and esm folders in lib

# [1.0.0-alpha.48](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.47...v1.0.0-alpha.48) (2023-09-14)


### Bug Fixes

* remove file extensions ([142a70f](https://github.com/astariaxyz/astaria-sdk/commit/142a70f1740eeacece89ff13e4beafcac3cba431))

# [1.0.0-alpha.47](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.46...v1.0.0-alpha.47) (2023-09-14)


### Bug Fixes

* add timestamp to scorable events response ([8af9458](https://github.com/astariaxyz/astaria-sdk/commit/8af9458f0569beb2a016b19d68d43b0a86f675ee))


### Features

* split InvalidDuration and InvalidExpiration ([1532517](https://github.com/astariaxyz/astaria-sdk/commit/15325174f1b9495ecaca969df6fddf6ffe4d80e1))


### BREAKING CHANGES

* error codes changed for strategyValidationResponse, and schema was renamed
* ScorableEventsResponse type has an additional timestamp field

# [1.0.0-alpha.46](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.45...v1.0.0-alpha.46) (2023-09-08)


### Reverts

* Revert "refactor: remove extensions" ([7acbaa2](https://github.com/astariaxyz/astaria-sdk/commit/7acbaa25fc37e6f9958a0c6644f3464cbb3a52ce))

# [1.0.0-alpha.45](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.44...v1.0.0-alpha.45) (2023-09-08)


### Bug Fixes

* make the AstariaSDKConfig params optional ([27b32e6](https://github.com/astariaxyz/astaria-sdk/commit/27b32e6fcc8b51279c880c2f8adcf6ddb1b27660))


### chore

* use tsup to build our app ([11d780d](https://github.com/astariaxyz/astaria-sdk/commit/11d780d49073ae7762d45e1d5b7b37d371d72cc5))


### Features

* add field to UserScoreResponse ([13ca9bd](https://github.com/astariaxyz/astaria-sdk/commit/13ca9bde5fd41a62cabab98336c2160fd7cbfe4e))
* lint distribution on build ([b90bcc5](https://github.com/astariaxyz/astaria-sdk/commit/b90bcc59eb221a995293b2aef3b219d8d7c876bd))


### BREAKING CHANGES

* lib folder and files built are different formats
* UserScoreResponse interface changed

# [1.0.0-alpha.44](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.43...v1.0.0-alpha.44) (2023-09-07)


### Bug Fixes

* circular dependencies ([7ac41a1](https://github.com/astariaxyz/astaria-sdk/commit/7ac41a173ea91c41f102bea081ee8d8af247efd0))

# [1.0.0-alpha.43](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.42...v1.0.0-alpha.43) (2023-09-07)


### Features

* initial split of types ([bd6906a](https://github.com/astariaxyz/astaria-sdk/commit/bd6906ab886d32709bde817c4fdb0916478a5a3f))
* move all dtos to sdk ([6415de3](https://github.com/astariaxyz/astaria-sdk/commit/6415de377d3f924bd988028c8218d91c4154f15c))

# [1.0.0-alpha.42](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.41...v1.0.0-alpha.42) (2023-09-05)


### Bug Fixes

* add pointsBaseURL to AstariaSDKConfig type ([1509273](https://github.com/astariaxyz/astaria-sdk/commit/150927377f549fc1be993714a9e08bfd4f59a669))

# [1.0.0-alpha.41](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.40...v1.0.0-alpha.41) (2023-09-01)


### Bug Fixes

* make merkletreejs import esm compatible ([6497203](https://github.com/astariaxyz/astaria-sdk/commit/6497203cf7ac9ed78b00070649e6ec2ce7408028))

# [1.0.0-alpha.40](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.39...v1.0.0-alpha.40) (2023-09-01)


### Bug Fixes

* change papaparse to default import as it's a commonjs module ([6739869](https://github.com/astariaxyz/astaria-sdk/commit/6739869d234499d30dd3c064967f94302bb3d2c4))

# [1.0.0-alpha.39](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.38...v1.0.0-alpha.39) (2023-09-01)


### Bug Fixes

* abi import paths ([075591e](https://github.com/astariaxyz/astaria-sdk/commit/075591eab222322f634aabd4c4ed41a08b404849))

# [1.0.0-alpha.38](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.37...v1.0.0-alpha.38) (2023-09-01)


### Bug Fixes

* refactor imports to have .js ending as required by ESM ([8f9eee1](https://github.com/astariaxyz/astaria-sdk/commit/8f9eee129593662195beeb1e0d3be0d59e8bed42))

# [1.0.0-alpha.37](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.36...v1.0.0-alpha.37) (2023-08-31)


### Features

* export package.json files to npm ([cdf6b2b](https://github.com/astariaxyz/astaria-sdk/commit/cdf6b2ba4a076ac6aa5f9374dad6f4354ed3240d))

# [1.0.0-alpha.36](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.35...v1.0.0-alpha.36) (2023-08-31)


### Bug Fixes

* add missing types export ([768a254](https://github.com/astariaxyz/astaria-sdk/commit/768a254f10644752dc2aa4bb130b38a8c68d2fdb))


### Features

* upgrade dependencies ([3774ceb](https://github.com/astariaxyz/astaria-sdk/commit/3774ceb20f2c74913e0d3bbff2bd50e6b3627d8d))

# [1.0.0-alpha.35](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.34...v1.0.0-alpha.35) (2023-08-28)


### Features

* add erc20 to the offer schema for decoding within the front end ([#51](https://github.com/astariaxyz/astaria-sdk/issues/51)) ([e8c3de1](https://github.com/astariaxyz/astaria-sdk/commit/e8c3de1c294793b8a3084ca1d558b974c9f3ae4b))

# [1.0.0-alpha.34](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.33...v1.0.0-alpha.34) (2023-08-21)


### Bug Fixes

* nonce hashing incorrectly ([#50](https://github.com/astariaxyz/astaria-sdk/issues/50)) ([b6aff3e](https://github.com/astariaxyz/astaria-sdk/commit/b6aff3e85f95b99c755c9217ae35b44cadbfb745))

# [1.0.0-alpha.33](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.32...v1.0.0-alpha.33) (2023-08-15)


### Features

* add erc20 support ([#49](https://github.com/astariaxyz/astaria-sdk/issues/49)) ([c33b507](https://github.com/astariaxyz/astaria-sdk/commit/c33b507b0c2675ae9ecb03d631619443a79bd184))

# [1.0.0-alpha.32](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.31...v1.0.0-alpha.32) (2023-06-14)

### Bug Fixes

- cast proper type for transformed AddressSchema ([5ec99fb](https://github.com/astariaxyz/astaria-sdk/commit/5ec99fbf6acdd57a4d3f155576db191ead82ca8d))
- explicit type for UniqueOfferSchema to pass through field types ([72c3864](https://github.com/astariaxyz/astaria-sdk/commit/72c386463b79f53ab6028ead87a5732503e757e5))

### Features

- add Uint8Schema ([9991228](https://github.com/astariaxyz/astaria-sdk/commit/999122839082d4fca37539551633293c646e617f))
- more refined types for HexSchema and AddressSchema ([f7a806c](https://github.com/astariaxyz/astaria-sdk/commit/f7a806c46d1bc35c888d00a7170f93a8b2422e5a))

# [1.0.0-alpha.31](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.30...v1.0.0-alpha.31) (2023-05-07)

### Features

- use destructured import for zod ([db1e897](https://github.com/astariaxyz/astaria-sdk/commit/db1e897d786f4653116062fc11f8fde77ea6f770))

# [1.0.0-alpha.30](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.29...v1.0.0-alpha.30) (2023-05-07)

### Bug Fixes

- use namespace import for zod ([cf34c10](https://github.com/astariaxyz/astaria-sdk/commit/cf34c107c654433e8a6d709ef9f239c0f0e30a03))

# [1.0.0-alpha.29](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.28...v1.0.0-alpha.29) (2023-04-22)

### Bug Fixes

- remove offerrouter ([a68fc0e](https://github.com/astariaxyz/astaria-sdk/commit/a68fc0e241d7ae843736ab94679a4fe0ce7e14b3))

# [1.0.0-alpha.28](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.27...v1.0.0-alpha.28) (2023-04-21)

### Bug Fixes

- expose method for filtering dynamicVaultDetails ([9e61293](https://github.com/astariaxyz/astaria-sdk/commit/9e612935fb01b1b50eac0c3ba159ba7a3c56be29))

# [1.0.0-alpha.27](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.26...v1.0.0-alpha.27) (2023-04-21)

### Bug Fixes

- convert OfferRouter to hook etc ([0f0dd96](https://github.com/astariaxyz/astaria-sdk/commit/0f0dd96d3074c5e778cb5e0c031a3f9bce5d133e))

# [1.0.0-alpha.26](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.25...v1.0.0-alpha.26) (2023-04-17)

### Bug Fixes

- changes to collateralId calculation ([bce6d93](https://github.com/astariaxyz/astaria-sdk/commit/bce6d939e57b4a3188542eba9ba1e2f4a8b4ec7c))
- Updates collateralId generation ([cdc60e3](https://github.com/astariaxyz/astaria-sdk/commit/cdc60e3ca77d7f32eb58a3ecb8102ecdf90965dc))

# [1.0.0-alpha.25](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.24...v1.0.0-alpha.25) (2023-03-27)

### Bug Fixes

- adds babel config to fix es module issues ([6f7f091](https://github.com/astariaxyz/astaria-sdk/commit/6f7f09153d476a99dabda01508bab8306d71e476))

# [1.0.0-alpha.24](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.23...v1.0.0-alpha.24) (2023-03-17)

### Bug Fixes

- unchecksum all addresses ([d4ca57c](https://github.com/astariaxyz/astaria-sdk/commit/d4ca57c1d550c6bdc918a714ed50266c55234a10))

# [1.0.0-alpha.23](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.22...v1.0.0-alpha.23) (2023-03-17)

### Bug Fixes

- replace ganache with ethereum-waffle ([f7b4a06](https://github.com/astariaxyz/astaria-sdk/commit/f7b4a06e0759699bf18583743b1c30e02057e569))
- replace ganache with ethereum-waffle ([aa568a7](https://github.com/astariaxyz/astaria-sdk/commit/aa568a71f248d0f1ed74c34fe72062409466089b))
- unique offer path ([bda90b9](https://github.com/astariaxyz/astaria-sdk/commit/bda90b9a1eb42b7730b99a92c88c11e67c81558f))

### Features

- implement changes for a queueing system ([bac7324](https://github.com/astariaxyz/astaria-sdk/commit/bac73248ff5c26d250653864168fceb28dc3d451))
- increase test timeout ([c9f8fec](https://github.com/astariaxyz/astaria-sdk/commit/c9f8fec38f9352a8c2b509978333430ece6a0171))
- increase timeouts ([7c84ac4](https://github.com/astariaxyz/astaria-sdk/commit/7c84ac4d6ee138b9f4cd17bf3bfe67a5f9042bfd))
- lift timeout into describe block ([e018d96](https://github.com/astariaxyz/astaria-sdk/commit/e018d965c7eddf5f0cd2c5754e8e3c2f71d0a864))

# [1.0.0-alpha.22](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.21...v1.0.0-alpha.22) (2023-03-14)

### Features

- config module, resolve circular dependency ([aa8e3bb](https://github.com/astariaxyz/astaria-sdk/commit/aa8e3bbf749b76cfec16ab7c64283cbc0a8e1d92))
- dynamic runtime configuration ([781755e](https://github.com/astariaxyz/astaria-sdk/commit/781755e6eec11f002a2871475bc35f69598fdea5))

# [1.0.0-alpha.21](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2023-03-03)

### Bug Fixes

- update abi ([cafb6b7](https://github.com/astariaxyz/astaria-sdk/commit/cafb6b7764a63f6426cf62f6671e49fc3e26e36e))

### Features

- bump abi version ([e94dcdc](https://github.com/astariaxyz/astaria-sdk/commit/e94dcdc6d4fd61057065311770a08411b81f207b))

# [1.0.0-alpha.20](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2023-02-23)

### Bug Fixes

- bump ABI for the new deployment ([276475a](https://github.com/astariaxyz/astaria-sdk/commit/276475a3e9986f7ded681d5c10ac46877f497bbb))

# [1.0.0-alpha.19](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2023-02-21)

### Features

- implement OfferRouter ([fe9bd35](https://github.com/astariaxyz/astaria-sdk/commit/fe9bd3532e1167a5a078dc35b588b622fbe1629a))

# [1.0.0-alpha.18](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.17...v1.0.0-alpha.18) (2023-01-19)

### Bug Fixes

- implemented changes for pagination and guerilla-frontend ([ad9486f](https://github.com/astariaxyz/astaria-sdk/commit/ad9486fb19fabedc2f1fc5642c71fd7f727fe140))

# [1.0.0-alpha.17](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2023-01-16)

### Bug Fixes

- remove eth-sig-util ([63de092](https://github.com/astariaxyz/astaria-sdk/commit/63de092ec17bc933164070558da7738970007d43))
- removing slash ([3091e4b](https://github.com/astariaxyz/astaria-sdk/commit/3091e4bfec711d063d4d734a7b2d2cd05c63e792))

### Features

- remove path native module dependency ([fc946d5](https://github.com/astariaxyz/astaria-sdk/commit/fc946d50db195825f728427e2f131b4120cecfd6))

# [1.0.0-alpha.16](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2023-01-12)

### Features

- update readme with alpha installation ([103d854](https://github.com/astariaxyz/astaria-sdk/commit/103d8548bbe2069b6fd2eb74a6607874010bffa2))

# 1.0.0-alpha.1 (2023-01-12)

### Bug Fixes

- add module name mappings to jest config ([e71fb39](https://github.com/astariaxyz/astaria-sdk/commit/e71fb3907513db0d0c9c9b672ac065e7f09481e9))
- build and test passing ([1d07915](https://github.com/astariaxyz/astaria-sdk/commit/1d07915b15b8fd03e5d97ea8745270c5ddf6e959))
- changes to fix v3 types ([1e73a2a](https://github.com/astariaxyz/astaria-sdk/commit/1e73a2a2e9c3fd305010814b18400ef7cef62965))
- ci/cd issues with linter ([0365530](https://github.com/astariaxyz/astaria-sdk/commit/03655306e51b6aa124bac45e3ab2fec7984f2a2e))
- decodeIPFSStrategyPayload now properly handles BigNumbers ([355dbc4](https://github.com/astariaxyz/astaria-sdk/commit/355dbc4f1b10f397c59f0fb76e2d69e7d7dfb1d4))
- disable husky pre-commit hooks in ci ([9c74a77](https://github.com/astariaxyz/astaria-sdk/commit/9c74a7753bc4508ee4d2ec238099927ad61188db))
- ensure that the results of encodeIPFSStrategyPayload are deterministic ([f41bd99](https://github.com/astariaxyz/astaria-sdk/commit/f41bd99757ab3daf2d37882dbde36ae7533ade7b))
- fixed parsing for signed BigNumbers ([55d52a9](https://github.com/astariaxyz/astaria-sdk/commit/55d52a99a235fadbc0801412930c860c54a312fd))
- fromParsedStrategyRow is now public ([8ea69e3](https://github.com/astariaxyz/astaria-sdk/commit/8ea69e3f1ec2720adc9666e82668bec07192d06c))
- git actions ([a2fd9d1](https://github.com/astariaxyz/astaria-sdk/commit/a2fd9d1edc139b1fa0430b345c962dd4441359b5))
- git actions ([5efb590](https://github.com/astariaxyz/astaria-sdk/commit/5efb5902b27827ddac21e91ded948a563c62c1bd))
- git actions ([d761de6](https://github.com/astariaxyz/astaria-sdk/commit/d761de68f4fd953c5c0059c589d8674337f76db7))
- git actions ([0888cb7](https://github.com/astariaxyz/astaria-sdk/commit/0888cb731a9af083c4d713fc1140a5248d4d6bb9))
- git actions ([1d65781](https://github.com/astariaxyz/astaria-sdk/commit/1d65781fc08baee58af323ba78d396edee385c1e))
- git actions ([447ce3a](https://github.com/astariaxyz/astaria-sdk/commit/447ce3ae7352ef2e6db85b3d709559d640fa2e4c))
- git actions ([e6a478d](https://github.com/astariaxyz/astaria-sdk/commit/e6a478d63d5e64a4b7dff4e2ad35e862186d9f30))
- git actions ([bbb8e62](https://github.com/astariaxyz/astaria-sdk/commit/bbb8e62fa692ddd3dbaaf623714e9a3dd856ba55))
- git actions ([28ef8dd](https://github.com/astariaxyz/astaria-sdk/commit/28ef8ddc9f0026c066d7e7c9bbf8e61ec0e56424))
- git actions ([6b13665](https://github.com/astariaxyz/astaria-sdk/commit/6b13665b4c78844776f851319bec459677c6bda1))
- github actions and lint errors ([4850337](https://github.com/astariaxyz/astaria-sdk/commit/4850337eb25f9830cb0b26bd89a196faf5899d36))
- implement API logic, and proof response to contract conversion ([#21](https://github.com/astariaxyz/astaria-sdk/issues/21)) ([f14fa8b](https://github.com/astariaxyz/astaria-sdk/commit/f14fa8b8f4bb108a4be5f2fc69279bbe92335b98))
- moved strategy row invariant check to constructor, changed leaf type values, fixed csv parsing ([5d72878](https://github.com/astariaxyz/astaria-sdk/commit/5d728781a92d0650197cc0582e0f852e8f220438))
- relative paths, tests broken ([eaee739](https://github.com/astariaxyz/astaria-sdk/commit/eaee739cda5b9b476c895a84b3a749d4c1bff6b6))
- remove linter from ci workflow, exclude src from build ([7c6a470](https://github.com/astariaxyz/astaria-sdk/commit/7c6a470f56e137c022f43aaa20e6bd1a13fafaef))
- replaced vaultImplementation ([24dfa27](https://github.com/astariaxyz/astaria-sdk/commit/24dfa271fb37e738ca79e963526e26e2666c830b))
- revert ([cfe82e2](https://github.com/astariaxyz/astaria-sdk/commit/cfe82e28a6df714bc8d239f6b8b42efce3b3dfc7))
- target in tsconfig es6 -> ES6 ([f8e55c9](https://github.com/astariaxyz/astaria-sdk/commit/f8e55c97041ca1453f1f463c2bbf1e54c6e6ca5d))
- tests ([7d9a742](https://github.com/astariaxyz/astaria-sdk/commit/7d9a742ccf0198dc065ac3daa6a9ced16d5ee061))
- tests ([324664b](https://github.com/astariaxyz/astaria-sdk/commit/324664bbb7953f86ae4a02a081fcf2d52359b82e))
- update prepare in package.json ([#15](https://github.com/astariaxyz/astaria-sdk/issues/15)) ([edebf4b](https://github.com/astariaxyz/astaria-sdk/commit/edebf4b145335df1a7ef73fae504c8335f0de68e))
- values for StrategyLeafType enum are now strings ([e5aa7cb](https://github.com/astariaxyz/astaria-sdk/commit/e5aa7cba95c517e1e13874847bb71da3dc25d7c0))
- vault implementation export ([f5d0d96](https://github.com/astariaxyz/astaria-sdk/commit/f5d0d96047e948da9265f74d2be542a981803fd8))
- vault implementation export in factories index ([a08133e](https://github.com/astariaxyz/astaria-sdk/commit/a08133e773fb7047221d0650c4e26b86d8ce3caf))

### Features

- add codegen output to git, update config ([91bb2b2](https://github.com/astariaxyz/astaria-sdk/commit/91bb2b29aebfd949dd905d130affd3bcc0674bed))
- add custom resolutions to support typescript v4 ([a20bd68](https://github.com/astariaxyz/astaria-sdk/commit/a20bd68148538d84fb4bbe0197e5a7fc43b3c3da))
- add typechain integration ([e53498c](https://github.com/astariaxyz/astaria-sdk/commit/e53498c0216874b9df831e7d66576f00a96780e1))
- add typescript bindings to distribution ([4822ddb](https://github.com/astariaxyz/astaria-sdk/commit/4822ddb26ce2254f1c0893406b271a99967e3ad1))
- add zod validation ([#16](https://github.com/astariaxyz/astaria-sdk/issues/16)) ([6dd5bdb](https://github.com/astariaxyz/astaria-sdk/commit/6dd5bdb25f2e0749f4846ed05e3a117fdd9a7cf6))
- added fromParsedStrategyRow method to StrategyTree ([de6a54a](https://github.com/astariaxyz/astaria-sdk/commit/de6a54aeb8580185ef63a68d676492fd1f15d214))
- build and release, dispatch trigger ([e23dd88](https://github.com/astariaxyz/astaria-sdk/commit/e23dd8844ace3b127c361755bc829f8d9a943644))
- implement signature verification ([e88a1ce](https://github.com/astariaxyz/astaria-sdk/commit/e88a1ce012c79d08821b8f716699fdeb50f504f3))
- improved zod validation ([48f5e63](https://github.com/astariaxyz/astaria-sdk/commit/48f5e6365e900ff9cd917c22fba710bcc585e749))
- optional dry-run for manual trigger ([05a6cb8](https://github.com/astariaxyz/astaria-sdk/commit/05a6cb8a55b7894a60c08d8ff75dbba6b9d16ed7))
- publishing alpha releases ([40308b1](https://github.com/astariaxyz/astaria-sdk/commit/40308b1f262659902c1344a7c9e2024f376d536e))
- release dry-run ([caf3cd9](https://github.com/astariaxyz/astaria-sdk/commit/caf3cd91b08dcb0dd03cc6e809e868cc9111c113))
- semantic-release workflow dispatch ([8f57069](https://github.com/astariaxyz/astaria-sdk/commit/8f5706942bfee97d9c483d121b05ac518ebb5ea9))
- store raw csv on StategyTree ([b6f94ac](https://github.com/astariaxyz/astaria-sdk/commit/b6f94ac49a2c5fb8860e14018ae8a11b2d7e10bf))
- update actions config ([82924b3](https://github.com/astariaxyz/astaria-sdk/commit/82924b3cea95b602febfca1c6a425f96193671eb))
- update license ([c251fd2](https://github.com/astariaxyz/astaria-sdk/commit/c251fd2def7957b26feec53fd493a64996fb2298))
- update package name ([77bec3e](https://github.com/astariaxyz/astaria-sdk/commit/77bec3e70d72f2af4a13e1fb93473704723c7dbd))
- update publish config to public access ([3a6bf73](https://github.com/astariaxyz/astaria-sdk/commit/3a6bf73375a227f1ffe799d4113f19474e0c2c8b))
- update release branch config ([8d3dc4d](https://github.com/astariaxyz/astaria-sdk/commit/8d3dc4db4e410b7b18ec212c0d0027fe5f8c5ff2))
- update release config and prepare for publish ([0fb5e1e](https://github.com/astariaxyz/astaria-sdk/commit/0fb5e1e66695f874be682bf415958ce954a26fd6))
- update testing version matrix ([906d026](https://github.com/astariaxyz/astaria-sdk/commit/906d0264b4a8a5275896479b41e1671df8c0fd23))
- update workflow dependencies to latest ([6c146cb](https://github.com/astariaxyz/astaria-sdk/commit/6c146cbd96ebef747b73d5885dc95355f3d378e7))
- workflow dispatch ([b1cda8a](https://github.com/astariaxyz/astaria-sdk/commit/b1cda8a88732f8d0404e9b6fc1b829549dbe3c20))
- workflow_dispatch dryRun variable ([d186080](https://github.com/astariaxyz/astaria-sdk/commit/d1860807dd37dc337b3715736ab4167b6faab99b))

### BREAKING CHANGES

- StrategyTree constructor, type updates

# [1.0.0-alpha.15](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2023-01-12)

### Bug Fixes

- implement API logic, and proof response to contract conversion ([#21](https://github.com/astariaxyz/astaria-sdk/issues/21)) ([f14fa8b](https://github.com/astariaxyz/astaria-sdk/commit/f14fa8b8f4bb108a4be5f2fc69279bbe92335b98))
- moved strategy row invariant check to constructor, changed leaf type values, fixed csv parsing ([5d72878](https://github.com/astariaxyz/astaria-sdk/commit/5d728781a92d0650197cc0582e0f852e8f220438))

# [1.0.0-alpha.14](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2023-01-05)

### Bug Fixes

- vault implementation export ([f5d0d96](https://github.com/astariaxyz/astaria-sdk/commit/f5d0d96047e948da9265f74d2be542a981803fd8))
- vault implementation export in factories index ([a08133e](https://github.com/astariaxyz/astaria-sdk/commit/a08133e773fb7047221d0650c4e26b86d8ce3caf))

# [1.0.0-alpha.13](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2023-01-05)

### Bug Fixes

- replaced vaultImplementation ([24dfa27](https://github.com/astariaxyz/astaria-sdk/commit/24dfa271fb37e738ca79e963526e26e2666c830b))

# [1.0.0-alpha.12](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2023-01-05)

### Bug Fixes

- fixed parsing for signed BigNumbers ([55d52a9](https://github.com/astariaxyz/astaria-sdk/commit/55d52a99a235fadbc0801412930c860c54a312fd))

# [1.0.0-alpha.11](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2023-01-03)

### Bug Fixes

- values for StrategyLeafType enum are now strings ([e5aa7cb](https://github.com/astariaxyz/astaria-sdk/commit/e5aa7cba95c517e1e13874847bb71da3dc25d7c0))

### Features

- improved zod validation ([48f5e63](https://github.com/astariaxyz/astaria-sdk/commit/48f5e6365e900ff9cd917c22fba710bcc585e749))

# [1.0.0-alpha.10](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2023-01-02)

### Features

- add zod validation ([#16](https://github.com/astariaxyz/astaria-sdk/issues/16)) ([6dd5bdb](https://github.com/astariaxyz/astaria-sdk/commit/6dd5bdb25f2e0749f4846ed05e3a117fdd9a7cf6))

### BREAKING CHANGES

- StrategyTree constructor, type updates

# [1.0.0-alpha.9](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2022-12-28)

### Bug Fixes

- update prepare in package.json ([#15](https://github.com/astariaxyz/astaria-sdk/issues/15)) ([edebf4b](https://github.com/astariaxyz/astaria-sdk/commit/edebf4b145335df1a7ef73fae504c8335f0de68e))

# [1.0.0-alpha.8](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2022-12-28)

### Bug Fixes

- target in tsconfig es6 -> ES6 ([f8e55c9](https://github.com/astariaxyz/astaria-sdk/commit/f8e55c97041ca1453f1f463c2bbf1e54c6e6ca5d))

# [1.0.0-alpha.7](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2022-12-23)

### Bug Fixes

- fromParsedStrategyRow is now public ([8ea69e3](https://github.com/astariaxyz/astaria-sdk/commit/8ea69e3f1ec2720adc9666e82668bec07192d06c))

# [1.0.0-alpha.6](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2022-12-23)

### Bug Fixes

- decodeIPFSStrategyPayload now properly handles BigNumbers ([355dbc4](https://github.com/astariaxyz/astaria-sdk/commit/355dbc4f1b10f397c59f0fb76e2d69e7d7dfb1d4))

### Features

- added fromParsedStrategyRow method to StrategyTree ([de6a54a](https://github.com/astariaxyz/astaria-sdk/commit/de6a54aeb8580185ef63a68d676492fd1f15d214))

# [1.0.0-alpha.5](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2022-12-21)

### Bug Fixes

- changes to fix v3 types ([1e73a2a](https://github.com/astariaxyz/astaria-sdk/commit/1e73a2a2e9c3fd305010814b18400ef7cef62965))
- ensure that the results of encodeIPFSStrategyPayload are deterministic ([f41bd99](https://github.com/astariaxyz/astaria-sdk/commit/f41bd99757ab3daf2d37882dbde36ae7533ade7b))
- remove linter from ci workflow, exclude src from build ([7c6a470](https://github.com/astariaxyz/astaria-sdk/commit/7c6a470f56e137c022f43aaa20e6bd1a13fafaef))

### Features

- implement signature verification ([e88a1ce](https://github.com/astariaxyz/astaria-sdk/commit/e88a1ce012c79d08821b8f716699fdeb50f504f3))

# [1.0.0-alpha.4](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2022-12-21)

### Features

- add typescript bindings to distribution ([4822ddb](https://github.com/astariaxyz/astaria-sdk/commit/4822ddb26ce2254f1c0893406b271a99967e3ad1))

# [1.0.0-alpha.3](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2022-12-21)

### Features

- add custom resolutions to support typescript v4 ([a20bd68](https://github.com/astariaxyz/astaria-sdk/commit/a20bd68148538d84fb4bbe0197e5a7fc43b3c3da))

# [1.0.0-alpha.2](https://github.com/astariaxyz/astaria-sdk/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2022-12-21)

### Features

- add codegen output to git, update config ([91bb2b2](https://github.com/astariaxyz/astaria-sdk/commit/91bb2b29aebfd949dd905d130affd3bcc0674bed))

# 1.0.0-alpha.1 (2022-12-20)

### Bug Fixes

- add module name mappings to jest config ([e71fb39](https://github.com/astariaxyz/astaria-sdk/commit/e71fb3907513db0d0c9c9b672ac065e7f09481e9))
- build and test passing ([1d07915](https://github.com/astariaxyz/astaria-sdk/commit/1d07915b15b8fd03e5d97ea8745270c5ddf6e959))
- ci/cd issues with linter ([0365530](https://github.com/astariaxyz/astaria-sdk/commit/03655306e51b6aa124bac45e3ab2fec7984f2a2e))
- disable husky pre-commit hooks in ci ([9c74a77](https://github.com/astariaxyz/astaria-sdk/commit/9c74a7753bc4508ee4d2ec238099927ad61188db))
- git actions ([a2fd9d1](https://github.com/astariaxyz/astaria-sdk/commit/a2fd9d1edc139b1fa0430b345c962dd4441359b5))
- git actions ([5efb590](https://github.com/astariaxyz/astaria-sdk/commit/5efb5902b27827ddac21e91ded948a563c62c1bd))
- git actions ([d761de6](https://github.com/astariaxyz/astaria-sdk/commit/d761de68f4fd953c5c0059c589d8674337f76db7))
- git actions ([0888cb7](https://github.com/astariaxyz/astaria-sdk/commit/0888cb731a9af083c4d713fc1140a5248d4d6bb9))
- git actions ([1d65781](https://github.com/astariaxyz/astaria-sdk/commit/1d65781fc08baee58af323ba78d396edee385c1e))
- git actions ([447ce3a](https://github.com/astariaxyz/astaria-sdk/commit/447ce3ae7352ef2e6db85b3d709559d640fa2e4c))
- git actions ([e6a478d](https://github.com/astariaxyz/astaria-sdk/commit/e6a478d63d5e64a4b7dff4e2ad35e862186d9f30))
- git actions ([bbb8e62](https://github.com/astariaxyz/astaria-sdk/commit/bbb8e62fa692ddd3dbaaf623714e9a3dd856ba55))
- git actions ([28ef8dd](https://github.com/astariaxyz/astaria-sdk/commit/28ef8ddc9f0026c066d7e7c9bbf8e61ec0e56424))
- git actions ([6b13665](https://github.com/astariaxyz/astaria-sdk/commit/6b13665b4c78844776f851319bec459677c6bda1))
- github actions and lint errors ([4850337](https://github.com/astariaxyz/astaria-sdk/commit/4850337eb25f9830cb0b26bd89a196faf5899d36))
- relative paths, tests broken ([eaee739](https://github.com/astariaxyz/astaria-sdk/commit/eaee739cda5b9b476c895a84b3a749d4c1bff6b6))
- revert ([cfe82e2](https://github.com/astariaxyz/astaria-sdk/commit/cfe82e28a6df714bc8d239f6b8b42efce3b3dfc7))
- tests ([7d9a742](https://github.com/astariaxyz/astaria-sdk/commit/7d9a742ccf0198dc065ac3daa6a9ced16d5ee061))
- tests ([324664b](https://github.com/astariaxyz/astaria-sdk/commit/324664bbb7953f86ae4a02a081fcf2d52359b82e))

### Features

- add typechain integration ([e53498c](https://github.com/astariaxyz/astaria-sdk/commit/e53498c0216874b9df831e7d66576f00a96780e1))
- build and release, dispatch trigger ([e23dd88](https://github.com/astariaxyz/astaria-sdk/commit/e23dd8844ace3b127c361755bc829f8d9a943644))
- optional dry-run for manual trigger ([05a6cb8](https://github.com/astariaxyz/astaria-sdk/commit/05a6cb8a55b7894a60c08d8ff75dbba6b9d16ed7))
- publishing alpha releases ([40308b1](https://github.com/astariaxyz/astaria-sdk/commit/40308b1f262659902c1344a7c9e2024f376d536e))
- release dry-run ([caf3cd9](https://github.com/astariaxyz/astaria-sdk/commit/caf3cd91b08dcb0dd03cc6e809e868cc9111c113))
- semantic-release workflow dispatch ([8f57069](https://github.com/astariaxyz/astaria-sdk/commit/8f5706942bfee97d9c483d121b05ac518ebb5ea9))
- store raw csv on StategyTree ([b6f94ac](https://github.com/astariaxyz/astaria-sdk/commit/b6f94ac49a2c5fb8860e14018ae8a11b2d7e10bf))
- update actions config ([82924b3](https://github.com/astariaxyz/astaria-sdk/commit/82924b3cea95b602febfca1c6a425f96193671eb))
- update license ([c251fd2](https://github.com/astariaxyz/astaria-sdk/commit/c251fd2def7957b26feec53fd493a64996fb2298))
- update package name ([77bec3e](https://github.com/astariaxyz/astaria-sdk/commit/77bec3e70d72f2af4a13e1fb93473704723c7dbd))
- update publish config to public access ([3a6bf73](https://github.com/astariaxyz/astaria-sdk/commit/3a6bf73375a227f1ffe799d4113f19474e0c2c8b))
- update release branch config ([8d3dc4d](https://github.com/astariaxyz/astaria-sdk/commit/8d3dc4db4e410b7b18ec212c0d0027fe5f8c5ff2))
- update release config and prepare for publish ([0fb5e1e](https://github.com/astariaxyz/astaria-sdk/commit/0fb5e1e66695f874be682bf415958ce954a26fd6))
- update testing version matrix ([906d026](https://github.com/astariaxyz/astaria-sdk/commit/906d0264b4a8a5275896479b41e1671df8c0fd23))
- update workflow dependencies to latest ([6c146cb](https://github.com/astariaxyz/astaria-sdk/commit/6c146cbd96ebef747b73d5885dc95355f3d378e7))
- workflow dispatch ([b1cda8a](https://github.com/astariaxyz/astaria-sdk/commit/b1cda8a88732f8d0404e9b6fc1b829549dbe3c20))
- workflow_dispatch dryRun variable ([d186080](https://github.com/astariaxyz/astaria-sdk/commit/d1860807dd37dc337b3715736ab4167b6faab99b))
