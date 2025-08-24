import { AuthButton } from "@/components/auth-button";
import { FeaturedItems } from "@/components/carousel-items";
import Hero from "@/components/hero";
import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default async function Home() {
  // Fetch featured images server-side
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("image_url, name")
    .eq("is_feature", true)
    .not("image_url", "is", null);
  const featuredImages = (error || !data)
    ? []
    : data.map(item => ({ src: item.image_url, alt: item.name }));

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center pb-20">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Café</Link>
            </div>
            <div className="flex items-center gap-4">
              <AuthButton />
              <ThemeSwitcher />
            </div>
          </div>
        </nav>

        <div className="w-full">
          <div className="aspect-[16/9] relative">
            <FeaturedItems />
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col gap-20 max-w-5xl p-5">
          <Hero images={featuredImages} />
          <div className="flex-1 flex flex-col gap-16 px-4">
            <section className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Visit Us Today</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Experience the perfect blend of comfort and taste at our café. 
                  Open daily from 7 AM to 8 PM.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-left">
                <div className="space-y-2">
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">123 Coffee Street<br />Café City, ST 12345</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 7 AM - 8 PM<br />Sat-Sun: 8 AM - 7 PM</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Contact</h3>
                  <p className="text-sm text-muted-foreground">Phone: (555) 123-4567<br />Email: hello@cafe.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="w-full border-t">
          <div className="max-w-5xl mx-auto py-8 text-center text-xs">
            <p>© 2025 Café. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
