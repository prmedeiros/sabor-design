import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Clock3, CreditCard, Instagram, MapPin, MessageCircle, Minus, Plus, ShoppingBag, Store, Trash2, Zap } from "lucide-react";

import logoAsset from "@/assets/aj-logo.png.asset.json";
import heroBurger from "@/assets/aj-hero-burger.jpg";
import carroChefeImage from "@/assets/aj-combo-carro-chefe.jpg";
import terceiraoImage from "@/assets/aj-combo-terceirao.jpg";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatCurrency, useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hamburgueria AJ | Cardápio de Hambúrgueres e Delivery" },
      {
        name: "description",
        content:
          "Conheça o cardápio da Hamburgueria AJ: combos, hambúrgueres, hot dogs, porções e bebidas. Loja física e delivery a partir das 18h.",
      },
      { property: "og:title", content: "Hamburgueria AJ | Cardápio Oficial" },
      {
        property: "og:description",
        content: "Combos, hambúrgueres, hot dogs, porções e bebidas. Atendimento em loja física e delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RestaurantPage,
});

type MenuItem = { name: string; description: string; price: string; badge?: string };

function productFrom(item: MenuItem) {
  const matchedPrice = item.price.match(/[\d]+(?:[.,]\d{2})?/g)?.at(-1) ?? "0";
  return {
    id: item.name.toLocaleLowerCase("pt-BR").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name: item.name,
    price: Number(matchedPrice.replace(".", "").replace(",", ".")),
  };
}

const combos = [
  {
    name: "Combo Carro-Chefe",
    description: "2 hambúrgueres de picanha suculentos + batata com cheddar e bacon + 6 anéis de cebola crocantes.",
    price: "R$ 72,99",
    image: carroChefeImage,
    badge: "TOP",
  },
  {
    name: "Combo Terceirão",
    description: "3 Cheddar Triplo + batata frita com cheddar e bacon + 1 Coca-Cola 1,5L.",
    price: "R$ 92,99",
    image: terceiraoImage,
  },
  {
    name: "Combo 2 Cheddar Triplo",
    description: "2 Cheddar Triplo + 2 batatas P + 2 Coca-Cola lata.",
    price: "R$ 54,99",
    image: carroChefeImage,
  },
  {
    name: "AJ Duplo + Duplo Bacon",
    description: "1 Hambúrguer AJ Duplo + 1 Duplo Bacon + 1 Guaraná Antarctica 1L.",
    price: "R$ 42,99",
    image: terceiraoImage,
  },
];

const burgers: MenuItem[] = [
  { name: "Costela e Queijo Coalho", description: "Hambúrguer de picanha, costela desfiada da casa, queijo coalho na chapa, cheddar cremoso, farofa de bacon e barbecue.", price: "R$ 36,99" },
  { name: "Ignorância Dupla", description: "Carne de picanha em dobro, queijo derretido, cream cheese, bacon crocante e geleia de pimenta no pão premium tostado.", price: "R$ 34,99", badge: "Picante" },
  { name: "Estilo BK", description: "Hambúrguer de picanha duplo, cheddar cremoso abundante, fatias de bacon e cebola picadinha refogada no pão bimbo macio.", price: "R$ 32,99" },
  { name: "AJRitos Duplo", description: "Hambúrguer duplo, fatias de cheddar, bacon crocante, Doritos e cream cheese.", price: "R$ 28,99" },
  { name: "Picanha Duplo AJ", description: "2 hambúrgueres de picanha, maionese especial, bacon crocante, cheddar derretido, alface e tomate frescos.", price: "R$ 27,99", badge: "Destaque" },
  { name: "Quarteirão J (Comum)", description: "4 carnes de hambúrguer comum, cheddar derretido, bacon crocante e maionese especial no pão bimbo macio.", price: "R$ 27,99" },
  { name: "Picanha AJ", description: "Hambúrguer de picanha suculento, maionese especial, bacon crocante, cheddar derretido, alface e tomate fresquinhos.", price: "R$ 23,99", badge: "Destaque" },
  { name: "Cheddar Triplo (Comum)", description: "3 carnes de hambúrguer comum, cheddar derretido, fatias de bacon crocante e maionese especial da casa no pão bimbo.", price: "R$ 22,99" },
  { name: "AJ Duplo (Comum)", description: "2 carnes comuns no pão bimbo macio, cheddar derretido, fatias de bacon, alface, tomate e ketchup.", price: "R$ 19,99" },
  { name: "Duplo Bacon", description: "2 hambúrgueres comuns, cheddar em dobro, fatias de bacon e maionese verde da casa.", price: "R$ 19,99" },
  { name: "AJtinha + Guaravita", description: "Hambúrguer comum com cheddar derretido, maionese cremosa, alface, tomate + 1 Guaravita 290ml.", price: "R$ 16,99" },
];

const hotDogs: MenuItem[] = [
  { name: "Hot Dog Duplo", description: "Pão, 2 linguiças ou salsichas, milho, ervilha, uva-passa, batata palha, 2 ovos de codorna, queijo ralado, azeitona, pimenta biquinho, alho frito, cheddar, cream cheese e molhos completos.", price: "R$ 21,99" },
  { name: "Hot Cheddar Bacon", description: "Pão, 2 salsichas, batata palha, cheddar cremoso e molhos da casa: ketchup, maioneses, mostarda e barbecue.", price: "R$ 18,99", badge: "Promo" },
  { name: "Hot Dog Comum", description: "Pão, salsicha ou linguiça, milho, ervilha, uva-passa, batata palha, ovo de codorna, queijo ralado, azeitona, pimenta biquinho, alho frito, cheddar, cream cheese e molhos da casa.", price: "R$ 18,99" },
  { name: "Hot Dog Kids", description: "Pão macio, salsicha, batata palha, ovo de codorna, ketchup, maionese e mostarda.", price: "R$ 16,99" },
];

const sides: MenuItem[] = [
  { name: "Batata Completa G", description: "Porção grande crocante com cheddar e bacon, aproximadamente 550g.", price: "R$ 36,99" },
  { name: "Batata Completa M", description: "Porção média crocante com cheddar e bacon, aproximadamente 350g.", price: "R$ 29,99" },
  { name: "Anéis de Cebola Empanados", description: "20 unidades por R$ 24,99 ou 10 unidades por R$ 13,99.", price: "A partir de R$ 13,99" },
  { name: "Batata Frita Simples P", description: "Batata palito tradicional crocante com aproximadamente 90g.", price: "R$ 7,99" },
  { name: "Nuggets Crocantes", description: "12 unidades por R$ 13,00 ou mini nuggets com 6 unidades por R$ 6,99.", price: "A partir de R$ 6,99" },
];

const drinks: MenuItem[] = [
  { name: "Coca-Cola 1,5L", description: "Garrafa pet 1,5 litro.", price: "R$ 14,00" },
  { name: "Guaraná Antarctica 1L", description: "Garrafa pet 1 litro.", price: "R$ 10,00" },
  { name: "Refrigerantes Lata", description: "Coca-Cola comum, Coca-Cola Zero ou Guaraná Antarctica — 350ml.", price: "R$ 7,00" },
  { name: "Guaraviton", description: "Garrafinha 500ml.", price: "R$ 7,00" },
  { name: "Guaravita Tradicional", description: "Copo 290ml.", price: "R$ 3,00" },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src={logoAsset.url} alt="Logo da Hamburgueria AJ" width={96} height={96} className={compact ? "size-12 rounded-full" : "size-16 rounded-full"} />
      <div className="hidden sm:block">
        <span className="block font-display text-2xl uppercase leading-none text-primary">AJ Delivery</span>
        <span className="text-[0.65rem] font-extrabold uppercase text-muted-foreground">Hamburgueria &amp; Pizzaria</span>
      </div>
    </div>
  );
}

function MenuSection({ id, eyebrow, title, items, tone = "light" }: { id: string; eyebrow: string; title: string; items: MenuItem[]; tone?: "light" | "dark" }) {
  const { addItem } = useCart();
  return (
    <section id={id} className={tone === "dark" ? "menu-band bg-foreground text-background" : "menu-band bg-background text-foreground"}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="mb-8 md:mb-12">
          <p className={tone === "dark" ? "section-kicker text-accent" : "section-kicker text-primary"}>{eyebrow}</p>
          <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl md:text-7xl">{title}</h2>
        </div>
        <div className={tone === "dark" ? "divide-y divide-background/15" : "divide-y divide-border"}>
          {items.map((item) => (
            <article key={item.name} className="menu-row grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-extrabold uppercase sm:text-xl">{item.name}</h3>
                  {item.badge && <span className="menu-badge">{item.badge}</span>}
                </div>
                <p className={tone === "dark" ? "mt-2 max-w-3xl text-sm leading-relaxed text-background/65" : "mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground"}>{item.description}</p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <p className={tone === "dark" ? "font-display text-2xl text-accent sm:text-right" : "font-display text-2xl text-primary sm:text-right"}>{item.price}</p>
                <Button type="button" variant={tone === "dark" ? "secondary" : "default"} size="sm" onClick={() => addItem(productFrom(item))}><Plus /> Adicionar</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CartDrawer() {
  const { items, itemCount, subtotal, setQuantity, removeItem } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative h-11 bg-accent text-accent-foreground hover:bg-accent/90" aria-label={`Abrir carrinho com ${itemCount} itens`}>
          <ShoppingBag /> <span className="hidden sm:inline">Carrinho</span>
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl uppercase text-primary">Seu carrinho</SheetTitle>
          <SheetDescription>Revise os itens antes de concluir.</SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center"><ShoppingBag className="size-10 text-muted-foreground" /><p className="mt-4 font-bold">Seu carrinho está vazio.</p></div>
        ) : (
          <>
            <div className="mt-5 flex-1 overflow-y-auto divide-y divide-border">
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
            <div className="border-t-2 border-foreground pt-5">
              <div className="flex justify-between text-lg font-black"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <Button className="mt-4 h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild><Link to="/checkout">Continuar pedido</Link></Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function RestaurantPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background font-sans text-foreground">
      <div className="bg-primary px-4 py-2 text-center text-xs font-extrabold uppercase text-primary-foreground">
        Pedido mínimo R$ 6,00 <span aria-hidden="true">•</span> Pix ou cartão
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <a href="#inicio" aria-label="Ir para o início"><Logo compact /></a>
          <nav aria-label="Categorias do cardápio" className="hidden items-center gap-6 text-xs font-extrabold uppercase lg:flex">
            <a className="nav-link" href="#combos">Combos</a>
            <a className="nav-link" href="#hamburgueres">Hambúrgueres</a>
            <a className="nav-link" href="#hotdogs">Hot dogs</a>
            <a className="nav-link" href="#porcoes">Porções</a>
            <a className="nav-link" href="#bebidas">Bebidas</a>
            <a className="nav-link" href="#loja">A loja</a>
          </nav>
          <CartDrawer />
        </div>
      </header>

      <section id="inicio" className="hero-burst relative bg-primary text-primary-foreground">
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
          <div>
            <span className="tilted-label">Aberto a partir das 18h</span>
            <h1 className="mt-6 font-display text-6xl uppercase leading-[0.86] sm:text-8xl lg:text-[7rem]">
              Fome de <span className="text-accent">verdade?</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg font-semibold leading-relaxed text-primary-foreground/85 md:text-xl">
              Hambúrgueres caprichados, combos para compartilhar e aquele sabor que não economiza no recheio.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#combos" className="cta-button cta-button-light"><ShoppingBag className="size-5" /> Conhecer os combos</a>
              <span className="text-sm font-bold uppercase text-primary-foreground/75">Loja física + delivery</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="hero-image-shell">
              <img src={heroBurger} alt="Hambúrguer duplo com cheddar e bacon" width={1200} height={1200} className="h-full w-full object-cover" />
            </div>
            <div className="price-sticker">
              <Zap className="size-5 fill-current" />
              <span>Combos a partir de</span>
              <strong>R$ 42,99</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 sm:grid-cols-3">
          <div className="info-chip"><Clock3 /><div><strong>Funcionamento</strong><span>Terça a domingo, 18h–23h45</span></div></div>
          <div className="info-chip"><Store /><div><strong>Atendimento</strong><span>Loja física e delivery</span></div></div>
          <div className="info-chip"><CreditCard /><div><strong>Pagamento online</strong><span>Chave Pix ou cartão</span></div></div>
        </div>
      </section>

      <section id="combos" className="scroll-mt-24 bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div><p className="section-kicker text-primary">Para dividir ou encarar sozinho</p><h2 className="font-display text-5xl uppercase leading-none text-primary sm:text-6xl md:text-7xl">Combos explosivos</h2></div>
            <div className="hidden h-2 w-24 bg-accent md:block" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {combos.map((combo) => (
              <article key={combo.name} className="combo-card">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img src={combo.image} alt="" width={816} height={816} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {combo.badge && <span className="absolute left-3 top-3 bg-accent px-3 py-1 text-xs font-black uppercase text-accent-foreground">{combo.badge}</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-black uppercase leading-tight">{combo.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{combo.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3"><p className="font-display text-3xl text-primary">{combo.price}</p><Button type="button" size="sm" onClick={() => addItem(productFrom(combo))}><Plus /> Adicionar</Button></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="cardapio" className="scroll-mt-20">
        <MenuSection id="hamburgueres" eyebrow="Artesanais e comuns" title="Hambúrgueres" items={burgers} />
        <MenuSection id="hotdogs" eyebrow="Tradicionais e especiais" title="Hot Dogs" items={hotDogs} tone="dark" />
        <MenuSection id="porcoes" eyebrow="Para acompanhar" title="Petiscos & Porções" items={sides} />
        <MenuSection id="bebidas" eyebrow="Geladas para completar" title="Bebidas" items={drinks} tone="dark" />
      </div>

      <section id="loja" className="scroll-mt-20 bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="mb-10">
            <p className="section-kicker text-primary">Delivery e loja física</p>
            <h2 className="font-display text-5xl uppercase leading-none text-primary sm:text-6xl md:text-7xl">Peça do seu jeito</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="store-panel">
              <div className="store-panel-heading"><Clock3 /><h3>Horário de atendimento</h3></div>
              <dl className="store-list">
                <div><dt>Segunda-feira</dt><dd>Fechado</dd></div>
                <div><dt>Terça a domingo</dt><dd>18h às 23h45</dd></div>
              </dl>

              <div className="store-panel-heading mt-8"><CreditCard /><h3>Formas de pagamento</h3></div>
              <ul className="store-list" aria-label="Formas de pagamento aceitas">
                <li><span>Online</span><strong>Pix, Nubank e cartão de crédito</strong></li>
                <li><span>Na entrega</span><strong>Dinheiro e cartão de crédito</strong></li>
              </ul>
              <p className="mt-5 flex items-center gap-2 text-sm font-bold text-primary"><Banknote className="size-5" /> Pedido mínimo: R$ 6,00</p>
            </div>

            <div className="store-panel">
              <div className="store-panel-heading"><MapPin /><h3>Onde estamos</h3></div>
              <p className="mt-5 text-lg font-bold leading-relaxed">Rua Heitor Levi, 10 — Sete Pontes<br />São Gonçalo — RJ, CEP 24412-300</p>
              <a className="cta-button mt-6" href="https://www.google.com/maps/search/?api=1&query=Rua+Heitor+Levi%2C+10%2C+Sete+Pontes%2C+Sao+Goncalo%2C+RJ%2C+24412-300" target="_blank" rel="noreferrer"><MapPin className="size-4" /> Abrir no mapa</a>

              <div className="mt-10 border-t border-border pt-7">
                <p className="section-kicker text-primary">Fale com a gente</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a className="contact-link" href="https://wa.me/5521983179620" target="_blank" rel="noreferrer"><MessageCircle /><span><small>WhatsApp</small>(21) 98317-9620</span></a>
                  <a className="contact-link" href="https://www.instagram.com/ajhamburgueriapizzaria/" target="_blank" rel="noreferrer"><Instagram /><span><small>Instagram</small>@ajhamburgueriapizzaria</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
          <div><p className="text-xs font-black uppercase">Bateu a fome?</p><h2 className="font-display text-4xl uppercase sm:text-5xl">Escolha seu lanche favorito.</h2></div>
           <a href="https://wa.me/5521983179620" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-extrabold uppercase"><MessageCircle className="size-6" /><span>Peça pelo WhatsApp</span></a>
        </div>
      </section>

      <footer className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 text-center sm:flex-row sm:text-left">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">Rua Heitor Levi, 10 — Sete Pontes, São Gonçalo. Atendimento de terça a domingo, das 18h às 23h45.</p>
        </div>
      </footer>

      {itemCount > 0 && <Button className="mobile-menu-button" asChild><Link to="/checkout"><ShoppingBag className="size-5" /> Ver carrinho · {formatCurrency(subtotal)}</Link></Button>}
    </main>
  );
}