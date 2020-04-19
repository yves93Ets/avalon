import successSrc from "../images/Success.jpeg";
import failSrc from "../images/Fail.jpeg";
import mordredSrc from "../images/Mordred.jpeg";
import morganaSrc from "../images/Morgana.jpeg";
import assassinSrc from "../images/Assassin.jpeg";
import oberonSrc from "../images/Oberon.jpeg";
import minionOneSrc from "../images/Minion-1.jpeg";
import minionTwoSrc from "../images/Minion-2.jpeg";
import minionThreeSrc from "../images/Minion-3.jpeg";
import merlinSrc from "../images/Merlin.jpg";
import percivalSrc from "../images/Percival.jpeg";
import LoyalOneSrc from "../images/Loyal-1.jpeg";
import LoyalTwoSrc from "../images/Loyal-2.jpeg";
import LoyalThreeSrc from "../images/Loyal-3.jpeg";
import LoyalFourSrc from "../images/Loyal-4.jpeg";
import LoyalFiveSrc from "../images/Loyal-5.jpeg";

import { isSuccesfullEnum } from "../const/enums";

export const succes = {
  isSuccesfull: isSuccesfullEnum.SUCCES,
  src: successSrc,
  cssClass: "card-header-blue",
};

export const fail = {
  isSuccesfull: isSuccesfullEnum.FAIL,
  src: failSrc,
  cssClass: "card-header-red",
};

export const neutral = {
  isSuccesfull: isSuccesfullEnum.NEUTRAL,
  src: successSrc,
  cssClass: "card-header-neutral",
};

export const characteres = [
   {
    src:mordredSrc,
    description:"You are the only BAD Guy that Merlin does not know about",
    isGood:false,
    name:"Mordred"
  },
  {
    src:morganaSrc,
    description:"You are a BAD guy who looks an awful lot like Merlin. Percival knows you're either Merlin or Morgana; use this to throw them off",
    isGood:false,
    name:"Morgana"
  },
  {
    src:assassinSrc,
    description:"You are a BAD guy. If the Good Guys win, you’ll get one chance to kill Merlin. Choose wisely. Think of who knew a little too much",
    isGood:false,
    name:"Assassin"
  },
  {
    src:oberonSrc,
    description:"You are a BAD guy, but you don’t reveal yourself to the other Bad Guys (and don’t know who they are either)",
    isGood:false,
    name:"Oberon"
  },

  {
    src:minionOneSrc,
    description:"You simply are a BAD guy",
    isGood:false,
    name:"Minion of Mordred"
  },
  {
    src:minionTwoSrc,
    description:"You simply are a BAD guy",
    isGood:false,
    name:"Minion of Mordred"
  },
  {
    src:minionThreeSrc,
    description:"You simply are a BAD guy",
    isGood:false,
    name:"Minion of Mordred"
  },
  {
    src:merlinSrc,
    description:"You are a GOOD Guy and you know who the Bad Guys are (except Mordred). Use this knowledge wisely, but don't give away who you are",
    isGood:true,
    name:"Merlin"
  },
  {
    src:percivalSrc,
    description:"You are a GOOD guy and you know who Merlin and Morgana are, but have no idea which is which. Try to figure it out quickly and influence group decisions",
    isGood:true,
    name:"Percival"
  },
  {
    src:LoyalOneSrc,
    description:"You are an innocent GOOD guy",
    isGood:true,
    name:"Loyal Servant of Arthur"
  },
  {
    src:LoyalTwoSrc,
    description:"You are an innocent GOOD guy",
    isGood:true,
    name:"Loyal Servant of Arthur"
  },
  {
    src:LoyalThreeSrc,
    description:"You are an innocent GOOD guy",
    isGood:true,
    name:"Loyal Servant of Arthur"
  },
  {
    src:LoyalFourSrc,
    description:"You are an innocent GOOD guy",
    isGood:true,
    name:"Loyal Servant of Arthur"
  },
  {
    src:LoyalFiveSrc,
    description:"You are an innocent GOOD guy",
    isGood:true,
    name:"Loyal Servant of Arthur"
  },
];
