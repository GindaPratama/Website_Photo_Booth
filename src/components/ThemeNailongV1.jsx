import React from "react";

export default function ThemeNailongV1({ layoutId }) {
  const getOrnamentPos = (name) => {
    const isHorizontal = layoutId === "2-horizontal";
    const isGrid = ["4-grid", "6-grid", "9-grid"].includes(layoutId);

    if (isHorizontal) {
      switch (name) {
        case "top":
          return "top-[1%] left-[2%] w-[60px]";
        case "semiTop":
          return "top-[2%] w-[50px] right-[0%]";
        case "mid":
          return "hidden";
        case "semiBottom":
          return "right-[0%] w-[100px] top-[53%]";
        case "bottom":
          return "bottom-[0%] left-[0%] w-[130px]";
        case "friends":
          return "bottom-[50px]";
      }
    } else if (isGrid) {
      switch (name) {
        case "top":
          return "top-[10px] left-[5px] w-[55px]";
        case "semiTop":
          return "top-[80px] right-[0px] w-[70px]";
        case "mid":
          return "top-[40%] left-[0px] w-[70px]";
        case "semiBottom":
          return "top-[60%] right-[0px] w-[70px]";
        case "bottom":
          return "bottom-[5px] left-[0px] w-[120px]";
        case "friends":
          return "bottom-[38px]";
      }
    }

    switch (name) {
      case "top":
        return "top-[10px] left-[10px] w-[55px]";
      case "semiTop":
        return "top-[100px] right-[0px] w-[70px]";
      case "mid":
        return "top-[40%] left-[0px] w-[70px]";
      case "semiBottom":
        return "top-[62%] right-[0px] w-[70px]";
      case "bottom":
        return "bottom-[0px] left-[0px] w-[120px]";
      case "friends":
        return "bottom-[38px]";
    }
    return "";
  };

  return (
    <>
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          backgroundColor: "#f5e4a0",
          backgroundImage: `linear-gradient(rgba(200,170,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,170,60,0.3) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className={`absolute ${getOrnamentPos("top")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/nailongv1/NailongTop.svg"
          alt=""
          className={getOrnamentPos("top").includes("w-") ? "" : "w-[55px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("semiTop")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/nailongv1/NailongSemiTop.svg"
          alt=""
          className={getOrnamentPos("semiTop").includes("w-") ? "" : "w-[70px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("mid")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/nailongv1/NailongMid.svg"
          alt=""
          className={getOrnamentPos("mid").includes("w-") ? "" : "w-[70px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("semiBottom")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/nailongv1/NailongSemiBottom.svg"
          alt=""
          className={
            getOrnamentPos("semiBottom").includes("w-") ? "" : "w-[70px]"
          }
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("bottom")} z-30 pointer-events-none drop-shadow-md`}
      >
        <img
          src="/random/nailongv1/NailongBottom.svg"
          alt=""
          className={getOrnamentPos("bottom").includes("w-") ? "" : "w-[120px]"}
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("friends")} left-0 w-full z-30 flex items-center justify-center pointer-events-none`}
      >
        <img
          src="/random/nailongv1/FRIENDS.svg"
          alt="FRIENDS"
          className="h-[28px] object-contain"
        />
      </div>
    </>
  );
}
