<script setup lang="ts">
import { computed, ref } from 'vue'
import { countries, REGIONS, FLAVOR_KEYS, REGION_COLOR, type CoffeeCountry, type Region } from './data'

const activeRegion = ref<Region | '全部'>('全部')
const selectedId = ref('et')

const visible = computed(() =>
  activeRegion.value === '全部' ? countries : countries.filter(c => c.region === activeRegion.value),
)
const selected = computed<CoffeeCountry>(() =>
  countries.find(c => c.id === selectedId.value) ?? countries[0],
)

// belt geometry
const W = 900, H = 430, px = { l: 34, r: 20, t: 18, b: 28 }
function xOf(lon: number) { return px.l + ((lon + 180) / 360) * (W - px.l - px.r) }
function yOf(lat: number) { return px.t + ((25 - lat) / 50) * (H - px.t - px.b) }

const dots = computed(() =>
  visible.value.map(c => ({ c, x: xOf(c.lon), y: yOf(c.lat), r: 4 + Math.sqrt(c.production / 1000) * 1.1 })),
)

const ranked = computed(() => [...visible.value].sort((a, b) => b.production - a.production))

// radar geometry (pentagon)
const R = 80, CX = 110, CY = 110
const radar = computed(() =>
  FLAVOR_KEYS.map((f, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / FLAVOR_KEYS.length
    const v = selected.value.flavor[f.key]
    return {
      label: f.label,
      x: CX + Math.cos(ang) * (R * v / 5),
      y: CY + Math.sin(ang) * (R * v / 5),
      gx: CX + Math.cos(ang) * R,
      gy: CY + Math.sin(ang) * R,
      lx: CX + Math.cos(ang) * (R + 20),
      ly: CY + Math.sin(ang) * (R + 20),
    }
  }),
)
const radarPoly = computed(() => radar.value.map(p => `${p.x},${p.y}`).join(' '))
</script>

<template>
  <main class="app">
    <header class="hero">
      <p class="kicker">数据可视化 · 全球咖啡产地</p>
      <h1>咖啡带</h1>
      <p class="lede">
        咖啡树主要生长在南北回归线之间的「咖啡带」。把 28 个主要产国按经纬度落在带上，
        圆点大小即产量，颜色即大洲。点击任一国家，右侧会展开它的风味五维雷达与产量排名。
      </p>
      <p class="note">产量为千袋（60kg/袋）的简化参考值，用于展示产地分布与风味差异，不代表官方统计。</p>
    </header>

    <section class="controls" aria-label="地区筛选">
      <button :class="{ on: activeRegion === '全部' }" @click="activeRegion = '全部'">全部</button>
      <button v-for="r in REGIONS" :key="r" :class="{ on: activeRegion === r }" @click="activeRegion = r">{{ r }}</button>
    </section>

    <section class="map-panel">
      <div class="map-head">
        <h2>咖啡带分布</h2>
        <div class="legend">
          <span v-for="r in REGIONS" :key="r"><i :style="{ background: REGION_COLOR[r] }"></i>{{ r }}</span>
          <span class="size-note">圆点大小 = 产量</span>
        </div>
      </div>
      <svg :viewBox="`0 0 ${W} ${H}`" class="belt" role="img" aria-label="咖啡带产地分布图">
        <rect :x="px.l" :y="yOf(23.5)" :width="W-px.l-px.r" :height="yOf(-23.5)-yOf(23.5)" class="belt-band" />
        <line :x1="px.l" :y1="yOf(23.5)" :x2="W-px.r" :y2="yOf(23.5)" class="tropic" />
        <line :x1="px.l" :y1="yOf(-23.5)" :x2="W-px.r" :y2="yOf(-23.5)" class="tropic" />
        <line :x1="px.l" :y1="yOf(0)" :x2="W-px.r" :y2="yOf(0)" class="equator" />
        <text :x="px.l+4" :y="yOf(23.5)-4" class="tropic-label">北回归线 23.5°</text>
        <text :x="px.l+4" :y="yOf(0)-4" class="equator-label">赤道 0°</text>
        <text :x="px.l+4" :y="yOf(-23.5)-4" class="tropic-label">南回归线 23.5°</text>
        <g v-for="d in dots" :key="d.c.id" class="dot-g" @click="selectedId = d.c.id">
          <circle :cx="d.x" :cy="d.y" :r="d.r" :fill="REGION_COLOR[d.c.region]"
            :opacity="selected.id === d.c.id ? 1 : 0.82"
            :stroke="selected.id === d.c.id ? '#3a2414' : 'none'" stroke-width="2" />
          <title>{{ d.c.name }} — {{ d.c.production.toLocaleString() }} 千袋</title>
        </g>
      </svg>
    </section>

    <section class="split">
      <div class="panel">
        <h2>{{ selected.name }}</h2>
        <dl>
          <div><dt>地区</dt><dd>{{ selected.region }}</dd></div>
          <div><dt>年产量</dt><dd>{{ selected.production.toLocaleString() }} 千袋</dd></div>
          <div><dt>海拔</dt><dd>{{ selected.altMin }}–{{ selected.altMax }} m</dd></div>
          <div><dt>纬度</dt><dd>{{ selected.lat }}°</dd></div>
        </dl>
        <h3>风味五维</h3>
        <svg viewBox="0 0 220 220" class="radar" role="img" aria-label="风味雷达图">
          <g v-for="(p, i) in radar" :key="i">
            <line :x1="CX" :y1="CY" :x2="p.gx" :y2="p.gy" class="rline" />
            <text :x="p.lx" :y="p.ly" class="rlabel" text-anchor="middle" dominant-baseline="middle">{{ p.label }}</text>
          </g>
          <polygon :points="radarPoly" class="radar-fill" />
          <circle v-for="(p, i) in radar" :key="'d'+i" :cx="p.x" :cy="p.y" r="3" class="radar-dot" />
        </svg>
      </div>

      <div class="panel">
        <h2>产量排名</h2>
        <ol class="rank">
          <li v-for="(c, i) in ranked.slice(0, 12)" :key="c.id" :class="{ sel: c.id === selected.id }" @click="selectedId = c.id">
            <span class="no">{{ i + 1 }}</span>
            <span class="nm">{{ c.name }}</span>
            <span class="track"><i :style="{ width: (c.production / 55000) * 100 + '%', background: REGION_COLOR[c.region] }"></i></span>
            <span class="val">{{ c.production.toLocaleString() }}</span>
          </li>
        </ol>
      </div>
    </section>

    <footer class="about">
      <h2>关于这份数据</h2>
      <p>
        产量为按 60kg 袋计的简化参考量级；风味五维（果酸、甜感、醇厚、花香、苦度）为 0–5 的示意评分，
        用于呈现不同产区之间的口感取向差异，并非品鉴标准。视觉编码：<strong>位置 = 经纬度，颜色 = 大洲，大小 = 产量</strong>。
      </p>
    </footer>
  </main>
</template>

<style>
:root { --paper: #f6efe4; --ink: #3a2414; --muted: #8a725a; --line: #e2d3bc; color-scheme: light; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: Georgia, 'Songti SC', serif; }
.app { max-width: 1120px; margin: 0 auto; padding: 48px 22px 80px; }
.kicker { color: #a86a3a; letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; font-family: 'Segoe UI', sans-serif; }
h1 { font-size: clamp(44px, 8vw, 86px); margin: 10px 0 14px; line-height: 1; font-weight: 700; }
.lede { max-width: 64ch; font-size: 17px; line-height: 1.75; color: #5a4632; }
.note { color: var(--muted); font-size: 13px; }

.controls { display: flex; flex-wrap: wrap; gap: 8px; margin: 26px 0; }
.controls button { background: transparent; color: var(--ink); border: 1px solid var(--line); border-radius: 999px; padding: 8px 16px; font-size: 14px; cursor: pointer; font-family: 'Segoe UI', sans-serif; }
.controls button.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.controls button:focus-visible { outline: 2px solid #a86a3a; outline-offset: 2px; }

.map-panel { background: #fffaf1; border: 1px solid var(--line); border-radius: 18px; padding: 22px; }
.map-head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 8px; }
.map-head h2 { margin: 0; font-size: 20px; }
.legend { display: flex; gap: 16px; font-size: 13px; align-items: center; flex-wrap: wrap; color: #6b543c; font-family: 'Segoe UI', sans-serif; }
.legend i { display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 5px; }
.legend .size-note { color: var(--muted); }
.belt { width: 100%; height: auto; }
.belt-band { fill: #f1e4cd; }
.tropic { stroke: #d9a96a; stroke-width: 1; stroke-dasharray: 5 5; }
.equator { stroke: #b98a55; stroke-width: 1; }
.tropic-label, .equator-label { fill: #a98a62; font-size: 11px; font-family: 'Segoe UI', sans-serif; }
.dot-g { cursor: pointer; }

.split { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 30px; }
.panel { background: #fffaf1; border: 1px solid var(--line); border-radius: 16px; padding: 22px; }
.panel h2 { margin: 0 0 12px; font-size: 22px; }
.panel h3 { font-size: 16px; margin: 18px 0 4px; }
dl { margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px; font-family: 'Segoe UI', sans-serif; }
dt { color: var(--muted); font-size: 12px; }
dd { margin: 2px 0 0; font-size: 15px; }
.radar { width: 210px; height: 210px; }
.rline { stroke: #eadbc3; }
.rlabel { fill: #7b6248; font-size: 12px; font-family: 'Segoe UI', sans-serif; }
.radar-fill { fill: rgba(168,106,58,0.35); stroke: #a86a3a; stroke-width: 1.5; }
.radar-dot { fill: #a86a3a; }

.rank { list-style: none; margin: 8px 0 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
.rank li { display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 8px; cursor: pointer; font-size: 14px; }
.rank li:hover { background: #f3e8d5; }
.rank li.sel { background: #f0e0c8; outline: 1px solid #c99a66; }
.no { color: #b08a5f; width: 20px; text-align: right; }
.nm { flex: 0 0 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.track { flex: 1; height: 12px; background: #f0e4d0; border-radius: 6px; overflow: hidden; }
.track i { display: block; height: 100%; border-radius: 6px; }
.val { width: 70px; text-align: right; }

.about { margin-top: 42px; border-top: 1px solid var(--line); padding-top: 26px; max-width: 72ch; }
.about p { color: #6b543c; line-height: 1.75; }

@media (max-width: 820px) {
  .split { grid-template-columns: 1fr; }
  .nm { flex-basis: 110px; }
}
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
</style>
