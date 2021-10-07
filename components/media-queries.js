// Media queries
const mqXsmall = 0;
const mqSmall = 600;
const mqTablet = 768;
const mqMedium = 960;
const mqLarge = 1024;
const mqXlarge = 1200;
const mqXxlarge = 1400;
const mqXxxlarge = 1920;

const gutter = 20;
const fw = 1538;

const fullWidth = `${fw}px`;
const fullWidthGutters = fw + gutter * 2;

const cw = 1430;
const cWidth = `${cw}px`;
const cWidthGutters = cw + gutter * 2;

const tw = 1150;
const twWidth = `{$tw}px`;
const twWidthGutters = tw + gutter * 2;

const smallUp = `(min-width: ${mqSmall}px)`;
const tabletUp = `(min-width: ${mqTablet}px)`;
const postTablet = `(min-width: ${mqLarge + 1}px)`;
const mediumUp = `(min-width: ${mqMedium}px)`;
const largeUp = `(min-width: ${mqLarge}px)`;
const postLargeUp = `(min-width: ${mqLarge + 1}px)`;
const xlargeUp = `(min-width: ${mqXlarge}px)`;
const xxlargeUp = `(min-width: ${mqXxlarge}px)`;
const xxxlargeUp = `(min-width: ${mqXxxlarge}px)`;

const smallDown = `(max-width: ${mqTablet - 1}px)`;
const tabletDown = `(max-width: ${mqMedium - 1}px)`;
const mediumDown = `(max-width: ${mqLarge - 1}px)`;
const largeDown = `(max-width: ${mqLarge - 1}px)`;
const postLargeDown = `(max-width: ${mqLarge}px)`;
const xlargeDown = `(max-width: ${mqXlarge - 1}px)`;
const xxlargeDown = `(max-width: ${mqXxlarge - 1}px)`;
const xxxlargeDown = `(max-width: ${mqXxxlarge - 1}px)`;

const xsmallOnly = `(min-width: ${mqXsmall}px) and (max-width: ${
  mqSmall - 1
}px)`;
const smallOnly = `(min-width: ${mqSmall}px)  and (max-width: ${
  mqMedium - 1
}px)`;
const tabletOnly = `(min-width: ${mqTablet}px) and (max-width: ${
  mqLarge - 1
}px)`;
const mediumOnly = `(min-width: ${mqMedium}px) and (max-width: ${
  mqLarge - 1
}px)`;
const largeOnly = `(min-width: ${mqLarge}px)  and (max-width: ${
  mqXlarge - 1
}px)`;
const xlargeOnly = `(min-width: ${mqXlarge}px)  and (max-width: ${
  mqXxlarge - 1
}px)`;
const xxlargeOnly = `(min-width: ${mqXxlarge}px)  and (max-width: ${
  mqXxxlarge - 1
}px)`;
const xxxlargeOnly = xxxlargeUp;

const maxWidth = mqXlarge;

//https://dev.to/mario/lots-of-fun-with-hover-css-selectors-on-mobile-devices-3kh6
const coarsePointer = '(-moz-touch-enabled: 1), (pointer: coarse)';
const finePointer = '(-moz-touch-enabled: 0), (pointer: fine)';
const testColor = 'purple';
export {
  testColor,
  fullWidth,
  fullWidthGutters,
  cWidth,
  cWidthGutters,
  tw,
  twWidth,
  twWidthGutters,
  smallUp,
  tabletUp,
  postTablet,
  mediumUp,
  largeUp,
  postLargeUp,
  xlargeUp,
  xxlargeUp,
  xxxlargeUp,
  smallDown,
  tabletDown,
  mediumDown,
  largeDown,
  postLargeDown,
  xlargeDown,
  xxlargeDown,
  xxxlargeDown,
  xsmallOnly,
  smallOnly,
  tabletOnly,
  mediumOnly,
  largeOnly,
  xlargeOnly,
  xxlargeOnly,
  xxxlargeOnly,
  maxWidth,
  coarsePointer,
  finePointer,
};
