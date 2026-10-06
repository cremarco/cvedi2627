export interface CoverLine {
  route: string
  tone: 'track' | 'accent'
  duration: number
  delay: number
  reverse?: boolean
  stopProgress?: number
  stations: { x: number; y: number; delay: number }[]
}

// Geometry lives outside the reserved text area: x 68–1084, y 176–472.
// The bottom routes and right-hand turns are different for every opening.
export const coverRoutes = {
  course: [
    { route: 'M -32 580 H380 Q396 580 408 568 L460 516 Q472 504 488 504 H1096 Q1128 504 1128 472 V152 Q1128 120 1160 120 H1312', tone: 'track', stopProgress: 0.46202, duration: 720, delay: 0, stations: [{ x: 240, y: 580, delay: 160 }, { x: 740, y: 504, delay: 420 }, { x: 1128, y: 280, delay: 670 }] },
    { route: 'M -32 620 H460 Q476 620 488 608 L540 556 Q552 544 568 544 H1064 Q1080 544 1092 556 L1124 588 Q1136 600 1152 600 H1312', tone: 'accent', duration: 620, delay: 100, stations: [] },
  ],
  exam: [
    { route: 'M 1312 176 H1216 Q1184 176 1184 208 V520 Q1184 552 1152 552 H1008 Q992 552 980 564 L936 608 Q924 620 908 620 H-32', tone: 'track', stopProgress: 0.35334, duration: 700, delay: 30, reverse: true, stations: [{ x: 320, y: 620, delay: 180 }, { x: 1056, y: 552, delay: 490 }, { x: 1184, y: 288, delay: 680 }] },
    { route: 'M -32 536 H588 Q604 536 616 548 L668 600 Q680 612 696 612 H792 Q808 612 820 600 L856 564 Q868 552 884 552 H1008', tone: 'accent', duration: 600, delay: 140, stations: [{ x: 480, y: 536, delay: 390 }] },
  ],
  archive: [
    { route: 'M -32 620 H320 Q336 620 348 608 L404 552 Q416 540 432 540 H904 Q920 540 932 528 L1148 312 Q1160 300 1160 284 V104 Q1160 72 1192 72 H1312', tone: 'track', stopProgress: 0.43524, duration: 740, delay: 0, stations: [{ x: 200, y: 620, delay: 140 }, { x: 672, y: 540, delay: 380 }, { x: 1160, y: 184, delay: 700 }] },
    { route: 'M 1312 420 H1228 Q1212 420 1200 432 L1048 584 Q1036 596 1020 596 H568 Q552 596 540 608 L520 628 Q508 640 492 640 H-32', tone: 'accent', duration: 560, delay: 180, stations: [] },
  ],
  brief: [
    { route: 'M -32 520 H456 Q472 520 484 532 L520 568 Q532 580 548 580 H980 Q996 580 1008 568 L1144 432 Q1156 420 1156 404 V160 Q1156 128 1188 128 H1312', tone: 'track', stopProgress: 0.47617, duration: 700, delay: 20, stations: [{ x: 256, y: 520, delay: 150 }, { x: 760, y: 580, delay: 420 }, { x: 1156, y: 280, delay: 650 }] },
    { route: 'M -32 628 H508 Q524 628 536 616 L560 592 Q572 580 588 580 H980', tone: 'accent', duration: 520, delay: 100, stations: [{ x: 368, y: 628, delay: 340 }] },
  ],
  research: [
    { route: 'M -32 564 H724 Q740 564 752 552 L780 524 Q792 512 808 512 H1024 Q1040 512 1052 500 L1136 416 Q1148 404 1148 388 V72', tone: 'track', stopProgress: 0.61226, duration: 680, delay: 0, stations: [{ x: 272, y: 564, delay: 160 }, { x: 912, y: 512, delay: 480 }, { x: 1148, y: 208, delay: 650 }] },
    { route: 'M 1312 624 H988 Q972 624 960 612 L924 576 Q912 564 896 564 H724', tone: 'accent', duration: 480, delay: 200, stations: [{ x: 1112, y: 624, delay: 390 }] },
  ],
  introduction: [
    { route: 'M 1192 -32 V472 Q1192 504 1160 504 H944 Q928 504 916 516 L824 608 Q812 620 796 620 H-32', tone: 'track', stopProgress: 0.36816, duration: 730, delay: 0, stations: [{ x: 1192, y: 224, delay: 180 }, { x: 1056, y: 504, delay: 410 }, { x: 352, y: 620, delay: 690 }] },
    { route: 'M -32 528 H592 Q608 528 620 540 L652 572 Q664 584 680 584 H984 Q1000 584 1012 596 L1044 628 Q1056 640 1072 640 H1312', tone: 'accent', duration: 600, delay: 120, stations: [] },
  ],
  history: [
    { route: 'M -32 612 H240 Q256 612 268 600 L312 556 Q324 544 340 544 H744 Q760 544 772 556 L804 588 Q816 600 832 600 H1032 Q1048 600 1060 588 L1188 460 Q1200 448 1200 432 V-32', tone: 'track', stopProgress: 0.33955, duration: 750, delay: 0, stations: [{ x: 176, y: 612, delay: 100 }, { x: 560, y: 544, delay: 300 }, { x: 1200, y: 264, delay: 690 }] },
    { route: 'M -32 512 H216 Q232 512 244 524 L328 608 Q340 620 356 620 H744', tone: 'accent', duration: 540, delay: 140, stations: [] },
  ],
  closing: [
    { route: 'M -32 548 H528 Q544 548 556 560 L596 600 Q608 612 624 612 H1008 Q1024 612 1036 600 L1172 464 Q1184 452 1184 436 V248 Q1184 216 1216 216 H1312', tone: 'track', stopProgress: 0.53156, duration: 700, delay: 0, stations: [{ x: 352, y: 548, delay: 160 }, { x: 824, y: 612, delay: 400 }, { x: 1184, y: 336, delay: 670 }] },
    { route: 'M 1312 576 H1096 Q1080 576 1068 588 L1016 640 Q1004 652 988 652 H624', tone: 'accent', duration: 540, delay: 160, stations: [] },
  ],
} satisfies Record<string, CoverLine[]>

export type CoverRouteId = keyof typeof coverRoutes
