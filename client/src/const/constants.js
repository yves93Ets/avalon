import blueSrc from "../images/lancelot.png";
import redSrc from "../images/mordred.png";
import neutralSrc from "../images/neutral.jpg";
import { isSuccesfullEnum } from "../const/enums";

export const succes = {
  isSuccesfull: isSuccesfullEnum.SUCCES,
  src: blueSrc,
  cssClass: "card-header-blue",
};

export const fail = {
  isSuccesfull: isSuccesfullEnum.FAIL,
  src: redSrc,
  cssClass: "card-header-red",
};

export const neutral = {
  isSuccesfull: isSuccesfullEnum.NEUTRAL,
  src: neutralSrc,
  cssClass: "card-header-neutral",
};
