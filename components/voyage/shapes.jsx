import { memo } from "react";

/**
 * A three-masted barque, side on, bow to the right.
 *
 * What makes a tall ship read as real in silhouette is mostly rigging
 * geometry, not hull detail:
 *   - a sheer line that rises toward bow and stern rather than a flat deck
 *   - yards (the horizontal spars) extending past the sails they carry
 *   - sails that get wider as they go down the mast
 *   - shrouds fanning from each masthead to the hull
 *   - headsails strung along the bowsprit
 * The earlier version had none of those and read as a child's drawing.
 */
export const Ship = memo(function Ship(props) {
  const rig = {
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 1.6,
    vectorEffect: "non-scaling-stroke",
  };

  return (
    /* Bow to the RIGHT, so the masts run mizzen → main → fore left to
       right, shortest to tallest to middling. The viewBox is cropped to
       the waterline and anchored YMax, so the hull bottom lands exactly
       on the container's bottom edge — otherwise the letterboxing floats
       the whole ship above the horizon. */
    <svg
      viewBox="0 0 380 228"
      preserveAspectRatio="xMidYMax meet"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      {/* Standing rigging, drawn under the canvas. */}
      <g {...rig}>
        <path d="M110 84 L84 186 M110 84 L96 188 M110 84 L124 188 M110 84 L140 186" />
        <path d="M178 44 L146 188 M178 44 L162 190 M178 44 L196 190 M178 44 L214 188" />
        <path d="M248 70 L220 188 M248 70 L236 190 M248 70 L262 189 M248 70 L286 182" />
        <path d="M178 44 L110 84 M178 44 L248 70 M250 76 L370 140" />
      </g>

      {/* Hull. The sheer — deck rising toward bow and stern rather than
          running flat — is most of what makes it read as a ship. */}
      <path
        d="M48 174
           C92 188 142 193 192 193
           C244 193 290 184 318 168
           L322 180
           C316 200 296 214 266 219
           C204 226 112 224 76 213
           C56 207 48 192 48 174 Z"
      />
      {/* stern castle */}
      <path d="M48 174 L52 150 L78 148 L80 178 Z" />
      {/* bowsprit */}
      <path d="M316 170 L374 140 L377 148 L319 178 Z" />

      {/* Masts, stern → bow: mizzen, main, fore. */}
      <rect x="107.6" y="82" width="4.8" height="111" />
      <rect x="175.2" y="42" width="5.6" height="151" />
      <rect x="245.6" y="68" width="5" height="125" />

      {/* Yards run wider than the sail they carry, so the spar tips stay
          visible against the sky. */}
      <g>
        <rect x="82" y="84" width="56" height="3" />
        <rect x="78" y="126" width="64" height="3.2" />

        <rect x="142" y="46" width="72" height="3.2" />
        <rect x="138" y="92" width="80" height="3.4" />
        <rect x="134" y="138" width="88" height="3.6" />

        <rect x="216" y="72" width="64" height="3" />
        <rect x="212" y="116" width="72" height="3.2" />
      </g>

      {/* Square sails. Widths are capped so neighbouring masts never
          overlap — full-width canvas is accurate but fuses the whole rig
          into one blob at this size. */}
      <g>
        <path d="M88 88 H132 L136 118 Q110 126 84 118 Z" />
        <path d="M85 130 H135 L139 160 Q110 168 81 160 Z" />

        <path d="M151 50 H205 L209 84 Q178 92 147 84 Z" />
        <path d="M148 96 H208 L212 130 Q178 139 144 130 Z" />
        <path d="M145 142 H211 L215 176 Q178 185 141 176 Z" />

        <path d="M222 76 H274 L278 108 Q248 116 218 108 Z" />
        <path d="M219 120 H277 L281 152 Q248 161 215 152 Z" />
      </g>

      {/* Single jib, forward of the fore mast along the bowsprit. */}
      <path d="M252 92 L360 132 L338 142 L252 118 Z" opacity="0.9" />

      {/* Spanker — the fore-and-aft sail aft of the mizzen. */}
      <path d="M107.6 100 L107.6 190 L58 192 L66 108 Z" opacity="0.94" />

      <path d="M180.8 42 L212 50 L180.8 58 Z" />
    </svg>
  );
});

/* ── docks ──────────────────────────────────────────────────────────
   All share a viewBox so the crossfade between them lands in the same
   place. Rendered with preserveAspectRatio="none", so strokes carry
   vectorEffect to stop them smearing when the box is stretched.        */

const DOCK_VIEWBOX = "0 0 1200 300";
const line = {
  stroke: "currentColor",
  fill: "none",
  vectorEffect: "non-scaling-stroke",
};

export const LighthouseIsle = memo(function LighthouseIsle(props) {
  return (
    <svg viewBox={DOCK_VIEWBOX} preserveAspectRatio="none" fill="currentColor" aria-hidden {...props}>
      {/* island — irregular, with a shoulder rather than a smooth dome */}
      <path
        d="M84 300 L116 262 L142 250 L168 238 L196 234 L214 224 L238 220
           L262 226 L286 222 L308 232 L330 248 L352 262 L378 280 L392 300 Z"
      />
      {/* rocks at the waterline */}
      <path d="M60 300 L82 286 L100 292 L112 300 Z" opacity="0.85" />
      <path d="M392 300 L410 288 L428 294 L436 300 Z" opacity="0.85" />

      {/* lighthouse: tapered tower, gallery, lantern room, cap */}
      <path d="M242 224 L246 138 L268 138 L272 224 Z" />
      <rect x="240" y="132" width="34" height="7" />
      <path d="M238 132 L276 132 L272 124 L242 124 Z" />
      <rect x="246" y="104" width="22" height="21" />
      <rect x="243" y="99" width="28" height="6" />
      <path d="M245 99 L269 99 L262 84 L252 84 Z" />
      <rect x="255.5" y="76" width="3" height="9" />
      {/* gallery railing */}
      <g {...line} strokeWidth="1.6">
        <path d="M241 128 H273" />
      </g>

      {/* keeper's cottage */}
      <path d="M296 232 V206 H344 V236 Z" />
      <path d="M292 207 L320 190 L348 207 Z" />
      <rect x="332" y="184" width="7" height="14" />

      {/* far skerries */}
      <path d="M868 300 L892 276 L916 268 L944 274 L968 288 L982 300 Z" opacity="0.55" />
      <path d="M1044 300 L1064 286 L1086 282 L1106 290 L1120 300 Z" opacity="0.4" />
    </svg>
  );
});

export const Harbour = memo(function Harbour(props) {
  return (
    <svg viewBox={DOCK_VIEWBOX} preserveAspectRatio="none" fill="currentColor" aria-hidden {...props}>
      {/* pier deck */}
      <path d="M0 258 H588 V272 H0 Z" />
      {/* pilings with cross-bracing */}
      {[26, 96, 166, 236, 306, 376, 446, 516].map((x) => (
        <g key={x}>
          <rect x={x} y="272" width="10" height="28" />
          <g {...line} strokeWidth="2">
            <path d={`M${x + 10} 278 L${x + 60} 296`} />
          </g>
        </g>
      ))}
      {/* bollards */}
      {[64, 204, 344, 484].map((x) => (
        <path key={x} d={`M${x} 258 L${x} 248 L${x + 9} 248 L${x + 9} 258 Z`} />
      ))}

      {/* warehouses — pitched roofs, chimneys */}
      <path d="M54 258 V202 H150 V258 Z" />
      <path d="M46 203 L102 174 L158 203 Z" />
      <rect x="128" y="170" width="9" height="20" />
      <path d="M188 258 V196 H300 V258 Z" />
      <path d="M180 197 L244 166 L308 197 Z" />
      <rect x="276" y="160" width="10" height="22" />

      {/* gantry crane: A-frame legs, jib, hoist */}
      <path d="M352 258 L364 150 L372 150 L366 258 Z" />
      <path d="M406 258 L400 150 L408 150 L418 258 Z" />
      <rect x="356" y="144" width="60" height="8" />
      <path d="M414 146 L500 158 L500 166 L414 154 Z" />
      <g {...line} strokeWidth="2">
        <path d="M486 162 V196" />
      </g>
      <rect x="478" y="196" width="18" height="12" />

      {/* moored vessels: hulls, masts, a little rigging */}
      <path d="M436 258 C452 250 492 248 520 252 L514 264 C486 268 452 266 436 258 Z" />
      <rect x="470" y="180" width="3.4" height="72" />
      <rect x="498" y="196" width="3" height="56" />
      <g {...line} strokeWidth="1.4">
        <path d="M471 180 L446 250 M471 180 L498 198 M499 196 L520 250" />
      </g>

      {/* pier-head light */}
      <path d="M556 258 L560 220 L574 220 L578 258 Z" />
      <rect x="556" y="212" width="22" height="7" />
      <path d="M559 212 L575 212 L571 200 L563 200 Z" />

      {/* far headland */}
      <path d="M912 300 L952 254 L1004 236 L1064 234 L1122 246 L1176 268 L1200 284 V300 Z" opacity="0.5" />
    </svg>
  );
});

export const Cliffs = memo(function Cliffs(props) {
  return (
    <svg viewBox={DOCK_VIEWBOX} preserveAspectRatio="none" fill="currentColor" aria-hidden {...props}>
      {/* headland with an eroded, stepped profile */}
      <path
        d="M0 300 V196 L38 182 L74 176 L112 170 L146 174 L172 186 L192 204
           L206 232 L222 262 L238 300 Z"
      />
      {/* strata */}
      <g {...line} strokeWidth="1.4" opacity="0.35">
        <path d="M8 216 L188 214 M14 240 L206 238 M22 266 L222 264" />
      </g>
      {/* talus at the base */}
      <path d="M196 300 L214 282 L232 288 L242 300 Z" opacity="0.8" />

      {/* sea arch */}
      <path
        d="M272 300 V212 L292 194 L322 186 L354 190 L380 206 L392 226 V300
           H352 V250 C340 232 312 230 300 248 V300 Z"
      />
      <g {...line} strokeWidth="1.4" opacity="0.3">
        <path d="M278 232 L344 230 M280 258 L348 256" />
      </g>

      {/* stack */}
      <path d="M436 300 L442 240 C448 226 464 224 472 238 L486 300 Z" opacity="0.85" />
      <path d="M498 300 L502 268 L512 262 L520 300 Z" opacity="0.7" />

      {/* far cliffs */}
      <path d="M974 300 V236 L1022 214 L1078 206 L1136 212 L1200 226 V300 Z" opacity="0.45" />
    </svg>
  );
});

export const DOCKS = {
  lighthouse: LighthouseIsle,
  harbour: Harbour,
  cliffs: Cliffs,
};
