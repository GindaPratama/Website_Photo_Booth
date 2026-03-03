import React from "react";

export default function ThemeMyBoyfriend({ layoutId }) {
  const getOrnamentPos = (name) => {
    const isHorizontal = layoutId === "2-horizontal";
    const isGrid = ["4-grid", "6-grid", "9-grid"].includes(layoutId);

    if (isHorizontal) {
      switch (name) {
        case "popIce":
          return "hidden";
        case "varians":
          return "top-[8%] left-[2%] w-[45px] rotate-6";
        case "ballons":
          return "hidden";
        case "eskrim":
          return "hidden";
        case "bl":
          return "bottom-[5%] left-[5%] w-[50px]";
        case "teks":
          return "bottom-[5%] right-[40%] w-[120px]";
        case "br":
          return "bottom-[5%] right-[5%] w-[40px]";
      }
    } else if (isGrid) {
      switch (name) {
        case "popIce":
          return "top-[2%] right-[-5px] w-[55px]";
        case "varians":
          return "top-[25%] left-[0px] w-[50px] rotate-6";
        case "ballons":
          return "top-[45%] right-[0px] w-[70px]";
        case "eskrim":
          return "bottom-[15%] left-[5px] w-[60px]";
        case "bl":
          return "bottom-[10px] left-[15%] w-[60px]";
        case "teks":
          return "bottom-[15px] right-[30%] w-[130px]";
        case "br":
          return "bottom-[10px] right-[5px] w-[50px]";
      }
    }

    switch (name) {
      case "popIce":
        return "top-[2%] right-[-12px] w-[55px]";
      case "varians":
        return "top-[30%] left-[0px] w-[50px] rotate-6";
      case "ballons":
        return "top-[50%] right-[0px] w-[70px]";
      case "eskrim":
        return "top-[75%] left-[5px] w-[60px]";
      case "bl":
        return "bottom-[12px] left-[6px] w-[60px]";
      case "teks":
        return "bottom-[8px] right-[10px] w-[130px]";
      case "br":
        return "bottom-[12px] right-[6px] w-[50px]";
    }
    return "";
  };

  return (
    <>
      <img
        src="/random/myboyfriend/Background.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
      <div
        className={`absolute ${getOrnamentPos("popIce")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/myboyfriend/PopIce.svg"
          alt=""
          className={getOrnamentPos("popIce").includes("w-") ? "" : "w-[55px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("varians")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/myboyfriend/VariansDrinkCup.svg"
          alt=""
          className={getOrnamentPos("varians")}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("ballons")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/myboyfriend/Ballons.svg"
          alt=""
          className={getOrnamentPos("ballons").includes("w-") ? "" : "w-[70px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("eskrim")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/myboyfriend/Eskrim.svg"
          alt=""
          className={getOrnamentPos("eskrim").includes("w-") ? "" : "w-[60px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("bl")} z-20 pointer-events-none`}
      >
        <img
          src="/random/myboyfriend/ElementBottomLeft.svg"
          alt=""
          className={getOrnamentPos("bl").includes("w-") ? "" : "w-[60px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("teks")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/myboyfriend/TeksMyBf.svg"
          alt="My Boyfriend"
          className={getOrnamentPos("teks").includes("w-") ? "" : "w-[130px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("br")} z-20 pointer-events-none`}
      >
        <img
          src="/random/myboyfriend/ElemenBottomRight.svg"
          alt=""
          className={getOrnamentPos("br").includes("w-") ? "" : "w-[50px]"}
        />
      </div>
    </>
  );
}
