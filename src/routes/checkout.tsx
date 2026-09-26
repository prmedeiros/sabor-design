import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronDown, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: "Finalizar pedido | Hamburgueria AJ" },
    { name: "description", content: "Revise seu carrinho e envie seu pedido para a Hamburgueria AJ." },
    { property: "og:title", content: "Finalizar pedido | Hamburgueria AJ" },
    { property: "og:description", content: "Revise seu carrinho e envie seu pedido para a Hamburgueria AJ." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState("Pix");
  const [error, setError] = useState("");
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;
  const canOrder = items.length > 0 && subtotal >= 6;
  const paymentOptions = useMemo(() => ["Pix", "Nubank", "Cartão na entrega", "Dinheiro na entrega"], []);

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!canOrder) {
      setError(items.length ? "O pedido mínimo é de R$ 6,00." : "Adicione pelo menos um item ao carrinho.");
      return;
    }
    const lines = items.map((item) => `• ${item.quantity}x ${item.name} — ${formatCurrency(item.price * item.quantity)}`);
    const address = fulfillment === "delivery"
      ? `Endereço: ${form.get("address")}, ${form.get("number")} — ${form.get("neighborhood")}\nComplemento: ${form.get("complement") || "Não informado"}`
      : "Retirada na loja: Rua Heitor Levi, 10 — Sete Pontes";
    const message = [
      "Olá! Quero fazer um pedido na Hamburgueria AJ:", "", ...lines, "",
      `Subtotal: ${formatCurrency(subtotal)}`,
      `Forma de recebimento: ${fulfillment === "delivery" ? "Entrega" : "Retirada"}`,
      address,
      `Pagamento: ${payment}`,
      `Nome: ${form.get("name")}`,
      `Telefone: ${form.get("phone")}`,
      `Observações: ${form.get("notes") || "Nenhuma"}`,
    ].join("\n");
    window.open(`https://wa.me/5521983179620?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-secondary pb-16 font-sans text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <Button variant="ghost" asChild><Link to="/"><ArrowLeft /> Voltar ao cardápio</Link></Button>
          <span className="font-display text-2xl uppercase text-primary">AJ Delivery</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
        <p className="section-kicker text-primary">Última etapa</p>
        <h1 className="font-display text-5xl uppercase leading-none text-primary sm:text-7xl">Finalizar pedido</h1>

        {items.length === 0 ? (
          <section className="checkout-empty mt-10">
            <ShoppingBag className="size-10 text-primary" />
            <h2 className="mt-4 text-xl font-black uppercase">Seu carrinho está vazio</h2>
            <p className="mt-2 text-sm text-muted-foreground">Escolha seus lanches antes de continuar.</p>
            <Button className="mt-6" asChild><Link to="/">Ver cardápio</Link></Button>
          </section>
        ) : (
          <form onSubmit={submitOrder} className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_24rem]">
            <div className="space-y-6">
              <section className="checkout-panel">
                <h2 className="checkout-title"><span>1</span> Como você quer receber?</h2>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button type="button" variant={fulfillment === "delivery" ? "default" : "outline"} className="h-12" onClick={() => setFulfillment("delivery")}>Entrega</Button>
                  <Button type="button" variant={fulfillment === "pickup" ? "default" : "outline"} className="h-12" onClick={() => setFulfillment("pickup")}>Retirada</Button>
                </div>
                {fulfillment === "delivery" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="form-field sm:col-span-2"><span>Endereço</span><Input name="address" placeholder="Rua ou avenida" required /></label>
                    <label className="form-field"><span>Número</span><Input name="number" placeholder="123" required /></label>
                    <label className="form-field"><span>Bairro</span><Input name="neighborhood" placeholder="Seu bairro" required /></label>
                    <label className="form-field sm:col-span-2"><span>Complemento</span><Input name="complement" placeholder="Casa, bloco ou ponto de referência" /></label>
                  </div>
                )}
              </section>

              <section className="checkout-panel">
                <h2 className="checkout-title"><span>2</span> Seus dados</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="form-field"><span>Nome</span><Input name="name" placeholder="Como podemos chamar você?" required /></label>
                  <label className="form-field"><span>Telefone</span><Input name="phone" type="tel" placeholder="(21) 99999-9999" required /></label>
                  <label className="form-field sm:col-span-2"><span>Observações</span><Textarea name="notes" rows={3} placeholder="Ex.: retirar cebola, entregar na portaria..." /></label>
                </div>
              </section>

              <section className="checkout-panel">
                <h2 className="checkout-title"><span>3</span> Pagamento</h2>
                <div className="relative mt-5">
                  <select value={payment} onChange={(event) => setPayment(event.target.value)} className="checkout-select" aria-label="Forma de pagamento">
                    {paymentOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3 size-5" />
                </div>
                <div className="mt-4 rounded-md border border-border bg-muted p-4 text-sm text-muted-foreground">
                  <strong className="block text-foreground">Pagamento online em breve</strong>
                  A opção será liberada após a conexão da loja Shopify. Por enquanto, confirme o pedido pelo WhatsApp.
                </div>
              </section>
            </div>

            <aside className="checkout-summary lg:sticky lg:top-6">
              <h2 className="font-display text-3xl uppercase text-primary">Seu pedido</h2>
              <div className="mt-5 divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="py-4">
                    <div className="flex justify-between gap-4"><strong className="text-sm">{item.name}</strong><span className="text-sm font-black">{formatCurrency(item.price * item.quantity)}</span></div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="quantity-control">
                        <Button type="button" variant="ghost" size="icon" aria-label={`Diminuir ${item.name}`} onClick={() => setQuantity(item.id, item.quantity - 1)}><Minus /></Button>
                        <span>{item.quantity}</span>
                        <Button type="button" variant="ghost" size="icon" aria-label={`Aumentar ${item.name}`} onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus /></Button>
                      </div>
                      <Button type="button" variant="ghost" size="icon" aria-label={`Remover ${item.name}`} onClick={() => removeItem(item.id)}><Trash2 /></Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-between border-t-2 border-foreground pt-4 text-lg font-black"><span>Total</span><span>{formatCurrency(total)}</span></div>
              <p className="mt-2 text-xs text-muted-foreground">A taxa de entrega será confirmada pela loja no WhatsApp.</p>
              {error && <p role="alert" className="mt-4 text-sm font-bold text-primary">{error}</p>}
              <Button type="submit" className="mt-5 h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90"><Check /> Enviar pedido pelo WhatsApp</Button>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}