// src/app/[locale]/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, Link } from "@/i18n/navigation";
import { fetchAuthenticatedAPI } from "@/lib/strapi";
import { Album } from "@/lib/strapi";
import { useTranslations } from "next-intl"; // Import the hook
import { Button } from "@/components/ui/button"; // Import Button

export default function DashboardPage() {
  const t = useTranslations("Auth.DashboardPage");
  const { user, jwt, loading, logout } = useAuth();
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);

  // Route Protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Data Fetching
  useEffect(() => {
    if (user && jwt) {
      const loadAlbums = async () => {
        setIsLoadingAlbums(true);
        try {
          const userAlbums = await fetchAuthenticatedAPI<Album[]>(
            "/albums/me",
            {},
            {},
            jwt
          );
          setAlbums(userAlbums);
        } catch (error) {
          console.error("Failed to fetch albums:", error);
        } finally {
          setIsLoadingAlbums(false);
        }
      };
      loadAlbums();
    }
  }, [user, jwt]);

  if (loading || isLoadingAlbums) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {t("loading")}
      </div>
    );
  }

  if (!user) {
    return null; // or a redirect component
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {t("welcome", { username: user.username })}
        </h1>
        <Button variant="link" onClick={logout} className="p-0 h-auto">
          {t("logout")}
        </Button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">{t("albumsTitle")}</h2>
      {albums.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              className="border rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold">{album.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("albumStatus", {
                    status: album.approvalStatus ?? t("status.unknown"),
                  })}
                </p>
              </div>
              <div className="mt-4">
                {/* Example of linking to the secure approval page */}
                <Button asChild>
                  <Link href={`/dashboard/album/${album.id}`}>
                    {t("viewAlbum")}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{t("noAlbums")}</p>
      )}
    </div>
  );
}
