export type Region = '非洲' | '亚洲 / 大洋洲' | '美洲'

export interface Flavor { acidity: number; sweetness: number; body: number; floral: number; bitterness: number }

export interface CoffeeCountry {
  id: string
  name: string
  region: Region
  lat: number
  lon: number
  production: number // thousand 60kg bags (simplified)
  altMin: number
  altMax: number
  flavor: Flavor
}

export const REGIONS: Region[] = ['非洲', '亚洲 / 大洋洲', '美洲']

export const countries: CoffeeCountry[] = [
  { id: 'br', name: '巴西 Brazil', region: '美洲', lat: -10, lon: -51, production: 55000, altMin: 400, altMax: 1300, flavor: { acidity: 3, sweetness: 4, body: 4, floral: 2, bitterness: 3 } },
  { id: 'vn', name: '越南 Vietnam', region: '亚洲 / 大洋洲', lat: 15, lon: 108, production: 30000, altMin: 500, altMax: 1500, flavor: { acidity: 2, sweetness: 3, body: 4, floral: 1, bitterness: 4 } },
  { id: 'co', name: '哥伦比亚 Colombia', region: '美洲', lat: 4, lon: -72, production: 13000, altMin: 1200, altMax: 2000, flavor: { acidity: 4, sweetness: 4, body: 3, floral: 3, bitterness: 2 } },
  { id: 'id', name: '印度尼西亚 Indonesia', region: '亚洲 / 大洋洲', lat: -3, lon: 110, production: 11000, altMin: 800, altMax: 1700, flavor: { acidity: 2, sweetness: 3, body: 5, floral: 1, bitterness: 3 } },
  { id: 'et', name: '埃塞俄比亚 Ethiopia', region: '非洲', lat: 8, lon: 40, production: 7000, altMin: 1500, altMax: 2200, flavor: { acidity: 5, sweetness: 4, body: 2, floral: 5, bitterness: 1 } },
  { id: 'hn', name: '洪都拉斯 Honduras', region: '美洲', lat: 14, lon: -86, production: 6000, altMin: 900, altMax: 1800, flavor: { acidity: 4, sweetness: 4, body: 3, floral: 2, bitterness: 2 } },
  { id: 'in', name: '印度 India', region: '亚洲 / 大洋洲', lat: 15, lon: 77, production: 5200, altMin: 700, altMax: 1600, flavor: { acidity: 3, sweetness: 3, body: 4, floral: 2, bitterness: 3 } },
  { id: 'ug', name: '乌干达 Uganda', region: '非洲', lat: 1, lon: 32, production: 4800, altMin: 1200, altMax: 2100, flavor: { acidity: 4, sweetness: 3, body: 3, floral: 2, bitterness: 2 } },
  { id: 'mx', name: '墨西哥 Mexico', region: '美洲', lat: 20, lon: -102, production: 3900, altMin: 700, altMax: 1600, flavor: { acidity: 4, sweetness: 3, body: 3, floral: 2, bitterness: 2 } },
  { id: 'pe', name: '秘鲁 Peru', region: '美洲', lat: -11, lon: -75, production: 3800, altMin: 1000, altMax: 1900, flavor: { acidity: 4, sweetness: 3, body: 3, floral: 3, bitterness: 2 } },
  { id: 'gt', name: '危地马拉 Guatemala', region: '美洲', lat: 14, lon: -90, production: 3400, altMin: 1300, altMax: 2000, flavor: { acidity: 4, sweetness: 4, body: 3, floral: 2, bitterness: 2 } },
  { id: 'ni', name: '尼加拉瓜 Nicaragua', region: '美洲', lat: 12, lon: -85, production: 2600, altMin: 900, altMax: 1600, flavor: { acidity: 4, sweetness: 3, body: 3, floral: 2, bitterness: 2 } },
  { id: 'ci', name: '科特迪瓦 Côte d’Ivoire', region: '非洲', lat: 7, lon: -5, production: 2200, altMin: 300, altMax: 700, flavor: { acidity: 2, sweetness: 2, body: 4, floral: 1, bitterness: 4 } },
  { id: 'tz', name: '坦桑尼亚 Tanzania', region: '非洲', lat: -6, lon: 35, production: 1500, altMin: 1100, altMax: 2000, flavor: { acidity: 4, sweetness: 3, body: 3, floral: 2, bitterness: 2 } },
  { id: 'cr', name: '哥斯达黎加 Costa Rica', region: '美洲', lat: 9, lon: -84, production: 1400, altMin: 1000, altMax: 1900, flavor: { acidity: 5, sweetness: 4, body: 3, floral: 3, bitterness: 1 } },
  { id: 'ke', name: '肯尼亚 Kenya', region: '非洲', lat: -1, lon: 37, production: 800, altMin: 1400, altMax: 2200, flavor: { acidity: 5, sweetness: 4, body: 3, floral: 3, bitterness: 1 } },
  { id: 'pg', name: '巴布亚新几内亚 PNG', region: '亚洲 / 大洋洲', lat: -6, lon: 145, production: 750, altMin: 1300, altMax: 1900, flavor: { acidity: 3, sweetness: 3, body: 4, floral: 2, bitterness: 3 } },
  { id: 'ec', name: '厄瓜多尔 Ecuador', region: '美洲', lat: -1, lon: -78, production: 700, altMin: 800, altMax: 1800, flavor: { acidity: 4, sweetness: 3, body: 3, floral: 3, bitterness: 2 } },
  { id: 'sv', name: '萨尔瓦多 El Salvador', region: '美洲', lat: 13, lon: -89, production: 600, altMin: 900, altMax: 1800, flavor: { acidity: 4, sweetness: 3, body: 3, floral: 2, bitterness: 2 } },
  { id: 'cm', name: '喀麦隆 Cameroon', region: '非洲', lat: 5, lon: 12, production: 500, altMin: 800, altMax: 1600, flavor: { acidity: 3, sweetness: 3, body: 4, floral: 2, bitterness: 2 } },
  { id: 've', name: '委内瑞拉 Venezuela', region: '美洲', lat: 7, lon: -66, production: 500, altMin: 800, altMax: 1700, flavor: { acidity: 3, sweetness: 4, body: 3, floral: 2, bitterness: 2 } },
  { id: 'th', name: '泰国 Thailand', region: '亚洲 / 大洋洲', lat: 14, lon: 100, production: 400, altMin: 800, altMax: 1600, flavor: { acidity: 3, sweetness: 3, body: 4, floral: 2, bitterness: 2 } },
  { id: 'la', name: '老挝 Laos', region: '亚洲 / 大洋洲', lat: 18, lon: 102, production: 400, altMin: 1000, altMax: 1800, flavor: { acidity: 3, sweetness: 4, body: 4, floral: 3, bitterness: 2 } },
  { id: 'rw', name: '卢旺达 Rwanda', region: '非洲', lat: -2, lon: 30, production: 300, altMin: 1400, altMax: 2200, flavor: { acidity: 5, sweetness: 4, body: 3, floral: 3, bitterness: 1 } },
  { id: 'bi', name: '布隆迪 Burundi', region: '非洲', lat: -3, lon: 29, production: 400, altMin: 1300, altMax: 2000, flavor: { acidity: 4, sweetness: 4, body: 3, floral: 3, bitterness: 2 } },
  { id: 'do', name: '多米尼加 Dominican R.', region: '美洲', lat: 18, lon: -70, production: 350, altMin: 600, altMax: 1500, flavor: { acidity: 3, sweetness: 3, body: 3, floral: 2, bitterness: 2 } },
  { id: 'ye', name: '也门 Yemen', region: '亚洲 / 大洋洲', lat: 15, lon: 48, production: 200, altMin: 1500, altMax: 2400, flavor: { acidity: 4, sweetness: 3, body: 4, floral: 3, bitterness: 2 } },
  { id: 'ht', name: '海地 Haiti', region: '美洲', lat: 19, lon: -72, production: 300, altMin: 300, altMax: 1200, flavor: { acidity: 3, sweetness: 3, body: 4, floral: 1, bitterness: 3 } },
]

export const FLAVOR_KEYS: { key: keyof Flavor; label: string }[] = [
  { key: 'acidity', label: '果酸' },
  { key: 'sweetness', label: '甜感' },
  { key: 'body', label: '醇厚' },
  { key: 'floral', label: '花香' },
  { key: 'bitterness', label: '苦度' },
]

export const REGION_COLOR: Record<Region, string> = {
  '非洲': '#a86a3a',
  '亚洲 / 大洋洲': '#7a5c3e',
  '美洲': '#c98e4f',
}
