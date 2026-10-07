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
  'ux-research': [
    { route: 'M -32 592 H296 Q312 592 324 580 L372 532 Q384 520 400 520 H1108 Q1140 520 1140 488 V88 Q1140 56 1172 56 H1312', tone: 'track', stopProgress: 0.43000, duration: 710, delay: 0, stations: [{ x: 200, y: 592, delay: 150 }, { x: 720, y: 520, delay: 420 }, { x: 1140, y: 232, delay: 660 }] },
    { route: 'M -32 640 H464 Q480 640 492 628 L532 588 Q544 576 560 576 H1008', tone: 'accent', duration: 550, delay: 130, stations: [] },
  ],
  'ux-perception': [
    { route: 'M 1208 -32 V516 Q1208 548 1176 548 H984 Q968 548 956 560 L896 620 Q884 632 868 632 H-32', tone: 'track', stopProgress: 0.39140, duration: 730, delay: 20, reverse: true, stations: [{ x: 1208, y: 240, delay: 170 }, { x: 1056, y: 548, delay: 460 }, { x: 240, y: 632, delay: 690 }] },
    { route: 'M -32 572 H560 Q576 572 588 584 L632 628 Q644 640 660 640 H1312', tone: 'accent', duration: 560, delay: 100, stations: [] },
  ],
  'ux-color': [
    { route: 'M -32 628 H384 Q400 628 412 616 L448 580 Q460 568 476 568 H1120 Q1152 568 1152 536 V112 Q1152 80 1184 80 H1312', tone: 'track', stopProgress: 0.45565, duration: 690, delay: 30, stations: [{ x: 208, y: 628, delay: 160 }, { x: 780, y: 568, delay: 430 }, { x: 1152, y: 272, delay: 670 }] },
    { route: 'M 1312 632 H968 Q952 632 940 620 L900 580 Q888 568 872 568 H640', tone: 'accent', duration: 520, delay: 170, stations: [] },
  ],
  'ux-type': [
    { route: 'M -32 556 H504 Q520 556 532 568 L580 616 Q592 628 608 628 H1144 Q1176 628 1176 596 V96', tone: 'track', stopProgress: 0.48935, duration: 740, delay: 0, stations: [{ x: 288, y: 556, delay: 170 }, { x: 800, y: 628, delay: 450 }, { x: 1176, y: 264, delay: 700 }] },
    { route: 'M -32 612 H408 Q424 612 436 600 L480 556 Q492 544 508 544 H1032', tone: 'accent', duration: 570, delay: 110, stations: [] },
  ],
  'ux-prototype': [
    { route: 'M -32 604 H568 Q584 604 596 592 L628 560 Q640 548 656 548 H1152 Q1184 548 1184 516 V168 Q1184 136 1216 136 H1312', tone: 'track', stopProgress: 0.50915, duration: 710, delay: 20, stations: [{ x: 272, y: 604, delay: 150 }, { x: 840, y: 548, delay: 430 }, { x: 1184, y: 280, delay: 680 }] },
    { route: 'M 1312 644 H960 Q944 644 932 632 L896 596 Q884 584 868 584 H608', tone: 'accent', duration: 510, delay: 150, stations: [] },
  ],
  'ux-test': [
    { route: 'M 1168 -32 V476 Q1168 508 1136 508 H992 Q976 508 964 520 L896 588 Q884 600 868 600 H-32', tone: 'track', stopProgress: 0.61875, duration: 720, delay: 10, reverse: true, stations: [{ x: 1168, y: 248, delay: 170 }, { x: 640, y: 600, delay: 440 }, { x: 192, y: 600, delay: 690 }] },
    { route: 'M -32 636 H472 Q488 636 500 624 L548 576 Q560 564 576 564 H1016', tone: 'accent', duration: 550, delay: 120, stations: [] },
  ],
  closing: [
    { route: 'M -32 548 H528 Q544 548 556 560 L596 600 Q608 612 624 612 H1008 Q1024 612 1036 600 L1172 464 Q1184 452 1184 436 V248 Q1184 216 1216 216 H1312', tone: 'track', stopProgress: 0.53156, duration: 700, delay: 0, stations: [{ x: 352, y: 548, delay: 160 }, { x: 824, y: 612, delay: 400 }, { x: 1184, y: 336, delay: 670 }] },
    { route: 'M 1312 576 H1096 Q1080 576 1068 588 L1016 640 Q1004 652 988 652 H624', tone: 'accent', duration: 540, delay: 160, stations: [] },
  ],
} satisfies Record<string, CoverLine[]>

export type CoverRouteId = keyof typeof coverRoutes
