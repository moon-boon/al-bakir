import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import WhatsAppButton from "../components/WhatsAppButton";
import EmapButton from "../components/EmapButton";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Al Bakir Pvt Ltd, Design, Construction & Real Estate, Islamabad" },
      { name: "description", content: "Al Bakir Pvt Ltd: architecture, construction and real estate in B-17 Islamabad. Where dreams become true." },
      { property: "og:title", content: "Al Bakir Pvt Ltd, Design, Construction & Real Estate, Islamabad" },
      { property: "og:description", content: "Al Bakir Pvt Ltd: architecture, construction and real estate in B-17 Islamabad. Where dreams become true." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://albakirpvtltd.com" },
      { property: "og:site_name", content: "Al Bakir Pvt Ltd" },
      { property: "og:locale", content: "en_PK" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Al Bakir Pvt Ltd, Design, Construction & Real Estate, Islamabad" },
      { name: "twitter:description", content: "Al Bakir Pvt Ltd: architecture, construction and real estate in B-17 Islamabad. Where dreams become true." },
      { property: "og:image", content: "https://albakirpvtltd.com/hero-construction-poster.jpg" },
      { name: "twitter:image", content: "https://albakirpvtltd.com/hero-construction-poster.jpg" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Al Bakir Pvt Ltd",
  description:
    "Integrated construction, architectural design, engineering, interior design and real estate services in B-17 Islamabad.",
  url: "https://albakirpvtltd.com",
  telephone: "+92-334-7402123",
  email: "Bakirassociates@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Multi Gardens B-17",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  areaServed: "Islamabad, Pakistan",
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+92-51-2765184", contactType: "customer service" },
    { "@type": "ContactPoint", telephone: "+92-334-7402123", contactType: "customer service" },
    { "@type": "ContactPoint", telephone: "+92-333-5116302", contactType: "customer service" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [
    "https://www.facebook.com/p/Al-Bakir-pvtltd-100075875230679/",
    "https://www.instagram.com/al_bakir_pvt_ltd/",
    "https://www.youtube.com/@al-bakirstudio",
    "https://www.tiktok.com/@albakirpvtltd",
    "https://www.zameen.com/agents/Islamabad/AL-Bakir-pvt-ltd-196777/",
  ],
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          // Static, developer-authored business data - not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <WhatsAppButton />
      <EmapButton />
    </QueryClientProvider>
  );
}
