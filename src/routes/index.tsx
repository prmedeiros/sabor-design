import { createFileRoute } from "@tanstack/react-router";
import { Clock3, CreditCard, MapPin, ShoppingBag, Store, Zap } from "lucide-react";

import logoAsset from "@/assets/aj-logo.png.asset.json";
import heroBurger from "@/assets/aj-hero-burger.jpg";
import carroChefeImage from "@/assets/aj-combo-carro-chefe.jpg";
import terceiraoImage from "@/assets/aj-combo-terceirao.jpg";

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
              <p className={tone === "dark" ? "font-display text-2xl text-accent sm:text-right" : "font-display text-2xl text-primary sm:text-right"}>{item.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
          </nav>
          <a href="#cardapio" className="cta-button">Ver cardápio</a>
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
          <div className="info-chip"><Clock3 /><div><strong>Funcionamento</strong><span>A partir das 18h</span></div></div>
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
                  <p className="mt-5 font-display text-3xl text-primary">{combo.price}</p>
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

      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
          <div><p className="text-xs font-black uppercase">Bateu a fome?</p><h2 className="font-display text-4xl uppercase sm:text-5xl">Escolha seu lanche favorito.</h2></div>
          <div className="flex items-center gap-3 font-extrabold uppercase"><MapPin className="size-6" /><span>Loja física e delivery</span></div>
        </div>
      </section>

      <footer className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 text-center sm:flex-row sm:text-left">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">Cardápio oficial da Hamburgueria AJ. Atendimento em nossa loja física e delivery a partir das 18h.</p>
        </div>
      </footer>

      <a href="#cardapio" className="mobile-menu-button" aria-label="Abrir cardápio"><ShoppingBag className="size-5" /> Ver cardápio</a>
    </main>
  );
}