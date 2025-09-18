import { getTranslations } from "next-intl/server";

export default async function ImprintPage() {
  const t = await getTranslations("ImprintPage");

  // Helper component for structured content
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
        <ContentBlock
          title={t("section1_title")}
          content={t.raw("section1_content")}
        />
        <ContentBlock
          title={t("section2_title")}
          content={t.raw("section2_content")}
        />
        <ContentBlock
          title={t("section3_title")}
          content={t.raw("section3_content")}
        />

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
