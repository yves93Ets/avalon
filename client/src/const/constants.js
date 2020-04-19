import blueSrc from "../images/lancelot.png";
import mordredSrc from "../images/mordred.png";
import neutralSrc from "../images/neutral.png";
import lancelotSrc from "../images/lancelot.png";
import assassinSrc from "../images/assassin.jpg";
import merlinSrc from "../images/merlin.jpg";

import { isSuccesfullEnum } from "../const/enums";

export const succes = {
  isSuccesfull: isSuccesfullEnum.SUCCES,
  src: blueSrc,
  cssClass: "card-header-blue",
};

export const fail = {
  isSuccesfull: isSuccesfullEnum.FAIL,
  src: mordredSrc,
  cssClass: "card-header-red",
};

export const neutral = {
  isSuccesfull: isSuccesfullEnum.NEUTRAL,
  src: neutralSrc,
  cssClass: "card-header-neutral",
};

export const characteres = {
  mordred: {
    src:mordredSrc,
    description:"Invisible",
    isGood:false,
    name:"Mordred"
  },
  assassin:  {
    src:assassinSrc,
    description:"Invisible",
    isGood:false,
    name:"Mordred"
  },
  merlin:  {
    src:merlinSrc,
    description:"Invisible",
    isGood:true,
    name:"Mordred"
  },
  lancelot:  {
    src:lancelotSrc,
    description:"Invisible",
    isGood:true,
    name:"Mordred"
  },
};
