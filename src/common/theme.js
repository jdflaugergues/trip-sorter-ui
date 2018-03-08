import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import {
  cyan500, cyan700,
  grey100, grey300, grey400, grey500,
  darkBlack, fullBlack, white
} from 'material-ui/styles/colors';


const typography = {
  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightBold: 600,

  fontStyleStandardSize: '14px',
  fontStyleMenuSize: '16px',
  fontStyleHeaderSize: '20px',
  fontStyleTitleSize: '36px',
  fontStyleSearchSize: '48px'
};

const palette = {
  primary1Color: cyan500,
  primary2Color: cyan700,
  primary3Color: grey400,
  accent1Color: grey100,
  accent2Color: grey300,
  accent3Color: grey500,
  textColor: darkBlack,
  secondaryTextColor: fade(darkBlack, 0.54),
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey300,
  disabledColor: fade(darkBlack, 0.3),
  pickerHeaderColor: cyan500,
  clockCircleColor: fade(darkBlack, 0.07),
  shadowColor: fullBlack
};

export default function getTripSorterTheme() {
  return getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    typography,
    palette,
    appBar: {
      color: palette.primary1Color
    },
    checkbox: {
      boxColor: palette.accent3Color,
      checkedColor: palette.primary1Color
    },
    radioButton: {
      borderColor: palette.accent3Color,
      checkedColor: palette.primary1Color
    },
    textField: {
      focusColor: palette.primary1Color
    },
    raisedButton: {
      primaryColor: palette.primary1Color
    },
    icon: {
      color: palette.alternateTextColor
    }
  })
};
