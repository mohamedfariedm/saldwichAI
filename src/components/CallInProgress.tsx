"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

interface CallInProgressProps {
  onEndCall: () => void;
}

const CallInProgress = ({ onEndCall }: CallInProgressProps) => {
  const [duration, setDuration] = useState(0);
  const t = useTranslations("callInProgress");

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#e6eeed] border-[5.21px] border-solid border-[#06aa89] w-[90vw] max-w-[428px] min-h-[766.54px] flex flex-col relative rounded-3xl">
      {/* Header */}
      <div className="flex flex-col items-center gap-[52.15px] mx-auto mt-[121px]">
        <h2 className="font-medium text-[#1f2020] text-[20.9px] text-center tracking-[0] leading-[33.4px]">
          {t("title")}
        </h2>

        <img
          className="w-[192.94px] h-[192.94px]"
          alt={t("aiChefAlt")}
          src="/group-2.png"
        />
      </div>

      {/* Timer */}
      <div className="mx-auto mt-[13.5px] font-medium text-[20.9px] text-[#1f2020] text-center tracking-[0] leading-[33.4px] whitespace-nowrap">
        {formatTime(duration)}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-[52.15px] mx-auto mt-[170.4px]">
        {/* End Call Button */}
        <Button
          onClick={onEndCall}
          className="w-[65.18px] h-[65.18px] bg-red-500 hover:bg-red-600 rounded-full p-[10.43px]"
          size="icon"
        >
          <img
            className="w-[44.25px] h-[44.25px]"
            alt={t("endCallAlt")}
            src="/elements.svg"
          />
        </Button>

        {/* Mute Button */}
        <Button
          className="w-[65.18px] h-[65.18px] bg-white hover:bg-gray-100 rounded-full p-[10.43px]"
          size="icon"
          variant="outline"
        >
          <div className="w-[31.29px] h-[31.29px] flex justify-center items-center">
            <div
              className="relative  w-[23px] h-7 bg-[url(/icon-1.svg)] bg-[100%_100%]"
              aria-label={t("muteAlt")}
            />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default CallInProgress;
