CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE TABLE public.product_photos (
  product_id text PRIMARY KEY,
  storage_path text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid NOT NULL
);
GRANT SELECT ON public.product_photos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_photos TO authenticated;
GRANT ALL ON public.product_photos TO service_role;
ALTER TABLE public.product_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product photos are publicly listed"
ON public.product_photos FOR SELECT TO anon, authenticated
USING (true);
CREATE POLICY "Admins can insert product photos"
ON public.product_photos FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') AND updated_by = auth.uid());
CREATE POLICY "Admins can update product photos"
ON public.product_photos FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin') AND updated_by = auth.uid());
CREATE POLICY "Admins can delete product photos"
ON public.product_photos FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view product photo files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can upload product photo files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can replace product photo files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete product photo files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'));