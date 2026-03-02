import React from "react";

export default function ThemeMyBoyfriend() {
  return (
    <>
      <img
        src="/random/myboyfriend/Background.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      <div className="absolute top-[2%] right-[-12px] z-30 pointer-events-none drop-shadow-md">
        <img src="/random/myboyfriend/PopIce.svg" 
        alt=""
        className="w-[55px]" />
      </div>

      <div className="absolute top-[30%] z-30 pointer-events-none drop-shadow-md">
        <img
          src="/random/myboyfriend/VariansDrinkCup.svg"
          alt=""
          className="w-[50px] rotate-6"
        />
      </div>

      <div className="absolute top-[50%] right-[0px] z-30 pointer-events-none drop-shadow-md">
        <img
          src="/random/myboyfriend/Ballons.svg"
          alt=""
          className="w-[70px]"
        />
      </div>

      <div className="absolute top-[75%] left-[5px] z-30 pointer-events-none drop-shadow-md">
        <img src="/random/myboyfriend/Eskrim.svg" 
        alt="" 
        className="w-[60px]" />
      </div>

      <div className="absolute bottom-[12px] left-[6px] z-20 pointer-events-none">
        <img
          src="/random/myboyfriend/ElementBottomLeft.svg"
          alt=""
          className="w-[60px]"
        />
      </div>

      <div className="absolute bottom-[8px] right-[10px] z-30 pointer-events-none drop-shadow-md">
        <img
          src="/random/myboyfriend/TeksMyBf.svg"
          alt="My Boyfriend"
          className="w-[130px]"
        />
      </div>

      <div className="absolute bottom-[12px] right-[6px] z-20 pointer-events-none">
        <img
          src="/random/myboyfriend/ElemenBottomRight.svg"
          alt=""
          className="w-[50px]"
        />
      </div>
    </>
  );
}
