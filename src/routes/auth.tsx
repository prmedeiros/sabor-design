import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Loader2, LogIn } from "lucide-react";

import logoAsset from "@/assets/aj-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Acesso do Proprietário | AJ Delivery" },
    { name: "description", content: "Acesso reservado para gerenciar as fotos dos produtos da AJ Delivery." },
    { property: "og:title", content: "Acesso do Proprietário | AJ Delivery" },
    { property: "og:description", content: "Área reservada da AJ Delivery." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (result.error) {
      setMessage("Não foi possível entrar. Confira os dados e tente novamente.");
      return;
    }
    if (mode === "signup" && !result.data.session) {
      setMessage("Confira seu e-mail para confirmar o cadastro e depois entre aqui.");
      return;
    }
    await navigate({ to: "/admin/fotos" });
  }

  async function signInWithGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      setMessage("Não foi possível entrar com o Google.");
      setBusy(false);
      return;
    }
    if (!result.redirected) await navigate({ to: "/admin/fotos" });
  }

  return (
    <main className="min-h-screen bg-secondary px-5 py-10 text-foreground">
      <div className="mx-auto max-w-md">
        <Button variant="ghost" asChild><Link to="/"><ArrowLeft /> Voltar ao cardápio</Link></Button>
        <section className="mt-8 checkout-panel">
          <img src={logoAsset.url} alt="AJ Delivery" className="mx-auto size-24 rounded-full" />
          <h1 className="mt-5 text-center font-display text-4xl uppercase text-primary">Área do proprietário</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">Entre para escolher as fotos exibidas no cardápio.</p>
          <form className="mt-7 grid gap-4" onSubmit={submit}>
            <label className="form-field"><span>E-mail</span><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label className="form-field"><span>Senha</span><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required /></label>
            <Button className="h-11" disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <LogIn />}{mode === "signin" ? "Entrar" : "Criar acesso"}</Button>
          </form>
          <Button className="mt-3 h-11 w-full" variant="outline" disabled={busy} onClick={signInWithGoogle}>Continuar com Google</Button>
          {message && <p className="mt-4 text-center text-sm font-semibold text-primary" role="status">{message}</p>}
          <button type="button" className="mx-auto mt-5 block text-sm font-bold text-primary underline" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }}>
            {mode === "signin" ? "Criar o primeiro acesso" : "Já tenho acesso"}
          </button>
        </section>
      </div>
    </main>
  );
}