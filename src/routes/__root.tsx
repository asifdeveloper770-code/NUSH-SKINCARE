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
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart-store";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-5xl text-charcoal">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for has drifted elsewhere.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-charcoal text-ivory px-8 py-3 text-xs tracking-[0.24em] uppercase hover:bg-charcoal/90 transition"
          >
            Return home
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
        <h1 className="font-serif text-3xl text-charcoal">Something didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">Please try again or head home.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-charcoal text-ivory px-8 py-3 text-xs tracking-[0.24em] uppercase hover:bg-charcoal/90"
          >
            Try again
          </button>
          <a href="/" className="border border-charcoal px-8 py-3 text-xs tracking-[0.24em] uppercase">
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
      { title: "Nush Skincare — Luminous, Glass-Like Skin. Scientifically Refined." },
      {
        name: "description",
        content:
          "Nush Skincare crafts clinical luxury skincare between Dubai and New York. Serums, cleansers and rituals engineered for luminous, glass-like skin.",
      },
      { name: "author", content: "Nush Skincare" },
      { property: "og:title", content: "Nush Skincare — Luminous, Glass-Like Skin. Scientifically Refined." },
      {
        property: "og:description",
        content: "Nush Skincare crafts clinical luxury skincare between Dubai and New York. Serums, cleansers and rituals engineered for luminous, glass-like skin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nush Skincare — Luminous, Glass-Like Skin. Scientifically Refined." },
      { name: "twitter:description", content: "Nush Skincare crafts clinical luxury skincare between Dubai and New York. Serums, cleansers and rituals engineered for luminous, glass-like skin." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/022d248d-921d-4ba3-8ece-84877d0cdaff/id-preview-46c01c54--0a7fe284-dc94-4f7f-822f-afb537de2cf8.lovable.app-1784147466148.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/022d248d-921d-4ba3-8ece-84877d0cdaff/id-preview-46c01c54--0a7fe284-dc94-4f7f-822f-afb537de2cf8.lovable.app-1784147466148.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
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
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-ivory">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
