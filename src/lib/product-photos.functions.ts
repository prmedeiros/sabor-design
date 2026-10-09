import { createServerFn } from "@tanstack/react-start";

export const getProductPhotoUrls = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("product_photos")
    .select("product_id, storage_path");

  if (error) throw new Error("Não foi possível carregar as fotos dos produtos.");

  const entries = await Promise.all(
    (data ?? []).map(async (photo) => {
      const { data: signed } = await supabaseAdmin.storage
        .from("product-photos")
        .createSignedUrl(photo.storage_path, 60 * 60);
      return [photo.product_id, signed?.signedUrl ?? ""] as const;
    }),
  );

  return Object.fromEntries(entries.filter((entry) => entry[1]));
});