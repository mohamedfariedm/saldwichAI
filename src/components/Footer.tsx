import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t py-8 px-4 md:px-6 lg:px-8">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Company Info */}
      <div className="space-y-4 text-center md:text-start flex flex-col items-center md:items-start">
        <Image src="/logo.svg" alt="Mizan Logo" width={120} height={40} />
        <p className="text-base text-muted-foreground max-w-xs mx-auto">
          {t.rich("title", {
            strong: (chunks) => (
              <span className="text-deepBlue">{chunks}</span>
            ),
          })}
        </p>
      </div>

      {/* Authorized By */}
      <div className="space-y-4 text-center md:text-start">
        <h3 className="text-sm font-medium">{t("authorizedBy")}</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <Image
            src="/capital-market-color.svg"
            alt="Capital Market Authority"
            width={100}
            height={40}
            className="w-40"
          />
          <Image
            src="/central-bank-color.svg"
            alt="Saudi Central Bank"
            width={100}
            height={40}
            className="w-40"
          />
        </div>
      </div>

      {/* Download Apps */}
      <div className="space-y-4 text-center md:text-start">
        <h3 className="text-sm font-medium">{t("downloadNow")}</h3>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Link href="#" className="sm:w-auto">
            <div className="bg-charcoal text-white px-6 py-3 rounded-full flex items-center gap-3">
              <Image
                src="/google-play.svg"
                alt="Google Play icon"
                width={24}
                height={24}
              />
              <div className="text-start">
                <div className="text-xs">{t("getItOn")}</div>
                <div className="text-sm font-medium">Google Play</div>
              </div>
            </div>
          </Link>
          <Link href="#" className="sm:w-auto">
            <div className="bg-charcoal text-white px-6 py-3 rounded-full flex items-center gap-3">
              <Image
                src="/app-store.svg"
                alt="App Store icon"
                width={24}
                height={24}
              />
              <div className="text-start">
                <div className="text-xs">{t("getItOn")}</div>
                <div className="text-sm font-medium">App Store</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4 text-center md:text-start">
        <h3 className="text-sm font-medium">{t("followUs")}</h3>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link
            href="#"
            className="bg-charcoal text-white p-2 rounded-full hover:opacity-80 transition"
          >
            <Image
              src="/twitter.svg"
              alt="Twitter icon"
              width={24}
              height={24}
              className="w-5 h-5"
            />
          </Link>
          <Link
            href="#"
            className="bg-charcoal text-white p-2 rounded-full hover:opacity-80 transition"
          >
            <Image
              src="/in.svg"
              alt="LinkedIn icon"
              width={24}
              height={24}
              className="w-5 h-5"
            />
          </Link>
          <Link
            href="#"
            className="bg-charcoal text-white p-2 rounded-full hover:opacity-80 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram w-5 h-5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </div>
</footer>

  );
}
