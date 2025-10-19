"use client";

import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface CallEndedProps {
  onClose: () => void;
  onCallAgain: () => void;
  duration: string;
  output: string;
  cost: string;
}

const CallEnded = ({
  onClose,
  onCallAgain,
  duration,
  output,
  cost,
}: CallEndedProps) => {
  const t = useTranslations("callEnded");

  const callStats = [
    { label: t("duration"), value: duration },
    { label: t("output"), value: output },
    { label: t("cost"), value: cost },
  ];

  return (
    <div className="bg-[#e6eeed] border-[5.21px] border-solid border-[#06aa89] w-[90vw] max-w-[428px] min-h-[766.54px] flex flex-col relative rounded-3xl">
      {/* Close Button */}
      <div className="ml-auto mr-8 mt-8 w-8 h-8">
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          style={{ borderColor: "black" }}
          className="w-8 h-8 rounded-md bg-transparent hover:bg-gray-200"
        >
          <XIcon className="w-5 h-5 text-[#1f2020]" />
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-[52.15px] mx-auto mt-[57px]">
        <h2 className="font-medium text-[#1f2020] text-[20.9px] text-center tracking-[0] leading-[33.4px]">
          {t("title")}
        </h2>

        <div className="w-[151.29px] h-[151.29px] rounded-full border-[6px] border-solid border-[#b8d5d2] relative">
          <img
            className="absolute top-[calc(50%-42px)] left-[calc(50%-61px)] w-[122px] h-[84px]"
            alt={t("aiChefAlt")}
            src="/image-4.png"
          />
        </div>
      </div>

      {/* Stats Card */}
      <Card className="mx-auto mt-[16.6px] w-full sm:w-[315px] rounded-3xl border border-solid border-[#cce0de] bg-transparent">
        <CardContent className="p-4">
          {callStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between w-full">
              <div className="font-normal text-[#1f2020] text-sm text-center tracking-[0] leading-[33.4px] whitespace-nowrap">
                {stat.label}
              </div>
              <div className="font-normal text-sm text-[#1f2020] text-center tracking-[0] leading-[33.4px] whitespace-nowrap">
                {stat.value}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Call Again Section */}
      <div className="flex flex-col items-center gap-1 mx-auto mt-[71px]">
        <Button
          onClick={onCallAgain}
          className="w-[65px] h-[65px] bg-[#008e2f] hover:bg-[#007025] rounded-full p-[10.4px]"
          size="icon"
        >
          <img
            className="w-[38.22px] h-[38.21px]"
            alt={t("callAlt")}
            src="/call-02.png"
          />
        </Button>

        <div className="font-medium text-[#1f2020] text-base text-center tracking-[0] leading-[33.4px]">
          {t("callAgain")}
        </div>
      </div>
    </div>
  );
};

export default CallEnded;
