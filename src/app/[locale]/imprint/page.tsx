import { getTranslations } from "next-intl/server";
import { Metadata } from "next"; // 1. Metadaten-Typ importieren

// 2. Diese Funktion für dynamische Metadaten hinzufügen
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ImprintPage");

  return {
    title: t("title"),
    icons: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-imprint-light.svg",
        href: "/favicon-imprint-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-imprint-dark.svg",
        href: "/favicon-imprint-dark.svg",
      },
    ],
  };
}

export default async function Imprintage() {
  const t = await getTranslations("ImprintPage");

  const values = {
    name: process.env.NEXT_PUBLIC_FULL_NAME || "",
    street: process.env.NEXT_PUBLIC_STREET_ADDRESS || "",
    city: process.env.NEXT_PUBLIC_CITY_ADDRESS || "",
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "[Not specified]",
    email: process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "",
  };

  // 2. Build the content arrays by calling `t()` for each line and passing the values
  const section1Content = [
    t("section1_content.name", values),
    t("section1_content.street", values),
    t("section1_content.city", values),
    t("section1_content.country"), // This line has no variable
  ];

  const section2Content = [
    t("section2_content.phone", values),
    t("section2_content.email", values),
  ];

  const section3Content = [
    t("section3_content.name", values),
    t("section3_content.address", values),
  ];

  const ContentBlock = ({
    title,
    content,
  }: {
    title: string;
    content: string[];
  }) => (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold">{title}</h2>
      {content.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <h1 className="text-4xl font-bold border-b-2 border-foreground pb-4">
        {t("title")}
      </h1>
      <div className="mt-8 space-y-8 text-muted-foreground">
        <ContentBlock title={t("section1_title")} content={section1Content} />
        <ContentBlock title={t("section2_title")} content={section2Content} />
        <ContentBlock title={t("section3_title")} content={section3Content} />
        <div>
          <h2 className="text-2xl font-semibold">{t("disclaimer_title")}</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {t("disclaimer_links_title")}
              </h3>
              <p>{t("disclaimer_links_content")}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("disclaimer_copyright_title")}
              </h3>
              <p>{t("disclaimer_copyright_content")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
