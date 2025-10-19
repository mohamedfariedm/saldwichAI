"use client";

import Agent from "@/components/agent";
import CallEnded from "@/components/CallEnded";
import CallInProgress from "@/components/CallInProgress";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";
import { useTranslations } from "next-intl";

type CallState = "initial" | "agent" | "in-progress" | "ended";

export default function Home() {
  const [callState, setCallState] = useState<CallState>("initial");
  const [callDuration, setCallDuration] = useState("00:00");
  const t = useTranslations("home");

  const handleStartCall = () => {
    setCallState("in-progress");
  };

  const handleEndCall = () => {
    const duration =
      document.querySelector('[class*="font-medium text-[20.9px]"]')?.textContent ||
      "02:13";
    setCallDuration(duration);
    setCallState("ended");
  };

  const handleCallAgain = () => {
    setCallState("agent");
  };

  const handleClose = () => {
    setCallState("initial");
  };

  return (
    <>
      <div className="main-container max-w-[1440px] w-full xl:min-h-[1024px] bg-[#fff] relative overflow-hidden mx-auto my-0">
        <div className="min-h-[564px] xl:absolute top-[44px] start-[163px] end-[699px] z-[8]">
          {/* Logo + Language Switcher */}
          <div className="relative flex items-center gap-3 mt-5 xl:mt-0 ml-[12px]">
            <div className="w-[104px] h-[26px] bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-10-19/kPygtoEeph.png')] bg-cover bg-no-repeat relative z-[8]" />
            <LanguageSwitcher />
          </div>

          {/* Hero Section */}
          <div className="flex w-full xl:w-[578px] flex-col gap-[32px] justify-center items-center flex-nowrap relative mt-12 xl:mt-[346px] mr-0 mb-0 ml-0">
            <div
              className="
                w-full sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[404px]
                h-[300px] sm:h-[500px] md:h-[600px] lg:h-[750px] xl:h-[860px]
                bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-10-19/y6bBVWgcNG.png')]
                bg-contain bg-center bg-no-repeat relative xl:absolute xl:start-[911px]
                mx-auto mt-8 lg:mt-0 z-[9] rounded-2xl
              "
            />

            <div className="flex flex-col  gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[1]">
              <div className="flex w-full xl:w-[564px] gap-[7px] items-center shrink-0 flex-nowrap relative z-[2]">
                <span className="xl:h-[56px] w-full shrink-0 basis-auto text-[48px] font-bold leading-[56px] text-[#1f2020] relative text-center ltr:xl:text-start xl:whitespace-nowrap z-[3]">
                  {t("title")}
                </span>
              </div>
              <span className="xl:h-[32px] shrink-0 basis-auto text-[20px] font-medium leading-[32px] text-[#1f2020] relative text-center xl:text-start xl:whitespace-nowrap z-[4]">
                {t("subtitle")}
              </span>
            </div>

            {/* CTA Button */}
            <div
              onClick={() => setCallState("agent")}
              className="
                flex ltr:w-[212px] pt-4 pb-4 px-8 gap-2 justify-center items-center
                shrink-0 flex-nowrap
                bg-[#045746] hover:bg-[#067a61]
                rounded-[40px] cursor-pointer
                transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-lg
                relative z-[5]
              "
            >
              <span className="h-[24px] shrink-0 basis-auto text-[16px] font-medium leading-[24px] text-white text-center xl:text-start xl:whitespace-nowrap z-[6]">
                {t("cta")}
              </span>
              <div
                className="
                  w-[28px] h-[20px] shrink-0
                  bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-10-19/D4GLZ8nrtT.png')]
                  bg-contain bg-no-repeat
                  transition-transform duration-300
                  group-hover:translate-x-1
                  relative z-[7]
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Agent Modal */}
      {callState === "agent" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <Agent onClose={handleClose} onStartCall={handleStartCall} />
          </div>
        </div>
      )}

      {/* Call In Progress */}
      {callState === "in-progress" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <CallInProgress onEndCall={handleEndCall} />
          </div>
        </div>
      )}

      {/* Call Ended */}
      {callState === "ended" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <CallEnded
              onClose={handleClose}
              onCallAgain={handleCallAgain}
              duration={callDuration}
              output="1,884"
              cost="0.05$"
            />
          </div>
        </div>
      )}
    </>
  );
}
