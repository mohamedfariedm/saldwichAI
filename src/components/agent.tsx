"use client";

import { PhoneIcon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useTranslations } from "next-intl";

interface AgentProps {
  onClose: () => void;
  onStartCall: () => void;
}

const Agent = ({ onClose, onStartCall }: AgentProps) => {
  const t = useTranslations("agent");

  return (
    <div className="bg-[#e6eeed] border-[5.21px] border-solid border-[#06aa89] w-[90vw] max-w-[428px] min-h-[766.54px] flex flex-col relative rounded-3xl">
      {/* Close Button */}
      <div className="flex justify-end p-8">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 gap-[52.15px] mt-8">
        <h1 className="font-medium text-[#1f2020] text-[20.9px] text-center tracking-[0] leading-[33.4px] max-w-[314.18px]">
          {t("title")}
        </h1>

        <Avatar className="w-[151.29px] h-[151.29px] border-[6px] border-solid border-[#b8d5d2]">
          <AvatarImage
            src="/image-4.png"
            alt="AI Chef"
            className="object-contain scale-[0.8]"
          />
        </Avatar>
      </div>

      {/* Call Button */}
      <div className="flex justify-center pb-[65px]">
        <Button
          onClick={onStartCall}
          className="w-[65px] h-[65px] bg-[#008e2f] hover:bg-[#007025] rounded-full p-[10.4px]"
          size="icon"
        >
          <img
            className="w-[38.22px] h-[38.21px]"
            alt={t("callAlt")}
            src="/call-02.png"
          />
        </Button>
      </div>
    </div>
  );
};

export default Agent;
