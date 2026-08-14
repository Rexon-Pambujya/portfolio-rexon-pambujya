/**
 * The voyage.
 *
 * The ocean is one continuous scene behind the whole page, not a hero
 * backdrop. Each stop below is a "dock" the ship sails toward; scrolling
 * interpolates every value between the stop you're leaving and the one
 * you're approaching, so the sky, water, light and landfall all change
 * together.
 *
 * `at` is scroll position, 0 = top of page, 1 = bottom.
 *
 * To retune the journey you only touch this file — colours are plain hex
 * so you can drop them straight into a colour picker.
 */

export const voyageStops = [
  {
    id: "hero",
    at: 0,
    sun: [0.63, 0.55],      // screen position of the sun/moon
    horizon: 0.46,
    wind: 0.62,
    advance: 0,             // how far the camera has sailed
    // kept right of centre — the headline occupies the left half
    ship: { x: 0.74, scale: 1.0 },
    dock: null,             // open water
    dark: {
      skyHigh: "#050A12", skyLow: "#15283C",
      seaFar: "#1E5A6B", seaNear: "#0A1520", sun: "#FFDCA4",
    },
    // Light mode has to actually be light here — a dark twilight sky under
    // the near-black header text is unreadable.
    light: {
      skyHigh: "#A8CFE8", skyLow: "#F6D6AE",
      seaFar: "#5AA3C4", seaNear: "#1A4763", sun: "#FFB65C",
    },
  },
  {
    id: "about",
    at: 0.26,
    sun: [0.26, 0.60],
    horizon: 0.48,
    wind: 0.45,
    advance: 26,
    ship: { x: 0.85, scale: 1.2 },
    dock: "cliffs",         // first landfall
    dark: {
      skyHigh: "#0B1526", skyLow: "#3A2C42",
      seaFar: "#2A6076", seaNear: "#0C1A28", sun: "#FF9E5E",
    },
    light: {
      skyHigh: "#7FB6DC", skyLow: "#FBD3A6",
      seaFar: "#4E9CC0", seaNear: "#17415F", sun: "#FF9440",
    },
  },
  {
    id: "work",
    at: 0.58,
    sun: [0.52, 0.78],
    horizon: 0.50,
    wind: 0.78,
    advance: 58,
    // sails the open channel kept clear to the right of the decks
    ship: { x: 0.87, scale: 1.35 },
    dock: "lighthouse",
    dark: {
      skyHigh: "#0D1B2E", skyLow: "#24455F",
      seaFar: "#2F7A92", seaNear: "#0D2032", sun: "#DCEBFF",
    },
    light: {
      skyHigh: "#8FCBEC", skyLow: "#D8ECF8",
      seaFar: "#5CAFD0", seaNear: "#1B4C6E", sun: "#FFFFFF",
    },
  },
  {
    // journey's end: the ship comes alongside and ties up. Big scale and
    // low wind so the arrival reads as docking, not passing by.
    id: "contact",
    at: 0.9,
    sun: [0.80, 0.52],
    horizon: 0.45,
    wind: 0.22,
    advance: 88,
    // just off the end of the pier, which runs to x=0.47
    ship: { x: 0.57, scale: 2.2 },
    dock: "harbour",
    dark: {
      skyHigh: "#08101F", skyLow: "#4A2740",
      seaFar: "#27556E", seaNear: "#080F1B", sun: "#FF7A4D",
    },
    light: {
      skyHigh: "#6FA6CF", skyLow: "#F9BE8C",
      seaFar: "#457F9F", seaNear: "#123049", sun: "#FF7638",
    },
  },
];

export default voyageStops;
