import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Presale',
    icon: 'TicketIcon',
    href: '/presale',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.goosedefi.com/',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.goosedefi.com/#/pool',
      },
    ],
  },

  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/nests',
  },
  {
    label: 'Buyback Protocol',
    icon: 'BondsIcon',
    href: '/buyback',
  },
  {
    label: 'Dollars Network (Referral)',
    icon: 'GroupsIcon',
    href: '/referral',
  },

  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  {
    label: 'Countdown to Farms',
    icon: 'MoonIcon',
    href: 'https://bscscan.com/block/countdown/9296359',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'PancakeSwap',
        href: 'https://pancakeswap.info/token/',
      },
      {
        label: 'Poocoin',
        href: '/',
      },
      {
        label: 'DexGuru',
        href: '/',
      },
      {
        label: 'DexTool',
        href: '/',
      },
    ],
  },
  {
    label: 'Listing',
    icon: 'VaultsIcon',
    items: [
      {
        label: 'Rug Doc Review (Pending)',
        href: '/',
      },
      {
        label: 'DappRadar (Pending)',
        href: '/',
      },
      {
        label: 'CoinHunt (Pending)',
        href: '/',
      },
      {
        label: 'CoinGecko (Pending)',
        href: '/',
      },
      {
        label: 'CoinMarket Cap (Pending)',
        href: '/',
      },
    ],
  },
  {
    label: 'Features',
    icon: 'NftIcon',
    items: [
      {
        label: 'Buyback Protocol',
        href: 'https://dollarfarmbsc.gitbook.io/dollar-farm-defi/features/usddollar-buyback-pools',
      },
      {
        label: 'Auto Liquidity and Burn',
        href: 'https://dollarfarmbsc.gitbook.io/dollar-farm-defi/features/tax',
      },
      {
        label: 'Capped Supply',
        href: 'https://dollarfarmbsc.gitbook.io/dollar-farm-defi/features/supply-shortage',
      },
      {
        label: 'Anti Whale Mechanism',
        href: 'https://dollarfarmbsc.gitbook.io/dollar-farm-defi/features/dump-prevention-mechanism-anti-whale',
      },
      {
        label: 'Referral Network',
        href: 'https://dollarfarmbsc.gitbook.io/dollar-farm-defi/features/referral',
      },
    ],
  },
  {
    label: 'Partnerships/IFO',
    icon: 'HandshakeIcon',
    href: '/',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/DollarFarm/dollarfarm-contracts',
      },
      {
        label: 'Docs',
        href: 'https://dollarfarmbsc.gitbook.io/dollar-farm-defi/',
      },
      {
        label: 'Blog',
        href: 'https://medium.com/@dollarfarmbsc',
      },
    ],
  },


]

export default config
