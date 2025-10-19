"use client";
import { useTranslations, useLocale } from "next-intl";
import React, { useState } from "react";

const ContactUs = () => {
  const t = useTranslations("ContactUs");
  const locale = useLocale(); // 'ar', 'en', etc.
  const isRTL = locale === "ar"; // adjust this if you support other RTL langs

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setToastMessage(null);

    try {
      const response = await fetch("https://mizan.com.sa/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        setIsSuccess(true);
        setToastMessage(t("success"));
        setToastType("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setIsError(true);
        setToastMessage(t("error"));
        setToastType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setToastMessage(t("error"));
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Toast */}
      <ol
        className={`fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:${isRTL ? "start-0" : "end-0"} sm:top-auto sm:flex-col md:max-w-[420px]`}
        role="alert"
      >
        {toastMessage && (
          <li
            className={`${
              toastType === "success" ? "bg-green-500" : "bg-red-500"
            } text-white p-4 rounded-md mb-4`}
          >
            {toastMessage}
          </li>
        )}
      </ol>

      <div className="container mx-auto py-10 px-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-xl mx-auto">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="tracking-tight text-3xl font-bold text-center">{t("title")}</div>
          </div>
          <div className="p-6 pt-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-lg text-start">{t("name")}</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background ps-3 pe-3 py-2 !text-xl ring-offset-background placeholder:text-neutral-400 placeholder:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="name"
                  name="name"
                  placeholder={t("namePlaceholder")}
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-lg text-start">{t("email")}</label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background ps-3 pe-3 py-2 !text-xl ring-offset-background placeholder:text-neutral-400 placeholder:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="email"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-lg text-start">{t("message")}</label>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background ps-3 pe-3 py-2 !text-xl ring-offset-background placeholder:text-neutral-400 placeholder:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[150px]"
                  id="message"
                  name="message"
                  placeholder={t("messagePlaceholder")}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 w-full text-lg py-6"
                disabled={isLoading}
              >
                {isLoading ? t("sending") : t("send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ContactUs;
