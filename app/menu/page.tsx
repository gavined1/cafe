import type { Tables } from "@/lib/database.types";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Category = Tables<'categories'>;
type MenuItem = Tables<'menu_items'> & { categories: Category | null };

export default async function MenuPage() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getClaims();
  if (authError || !authData?.claims) {
    redirect("/auth/login");
  }


  // Fetch menu items with joined categories

  const { data: rawMenuItems, error: menuError } = await supabase
    .from("menu_items")
    .select(`id, name, price, description, is_feature, is_new, category_id, image_url, categories ( id, name, description, created_at )`)
    .order("category_id")
    .order("name");

  // Normalize categories: Supabase may return categories as array, so flatten
  const menuItems: MenuItem[] = (rawMenuItems || []).map((item) => {
    let cat: unknown = item.categories;
    if (Array.isArray(cat)) cat = cat[0];
    if (
      cat &&
      typeof cat === "object" &&
      "id" in cat &&
      "name" in cat &&
      "description" in cat &&
      "created_at" in cat
    ) {
      // valid
    } else {
      cat = null;
    }
    return {
      ...item,
      categories: cat as Category | null,
    } as MenuItem;
  });

  if (menuError) {
    return <div className="text-red-500 p-8">Failed to load menu: {menuError.message}</div>;
  }

  // Group items by category name
  const categoryMap = new Map<string, Category & { items: MenuItem[] }>();
  menuItems.forEach(item => {
    const cat = item.categories;
    if (!cat) return;
    if (!categoryMap.has(cat.id)) {
      categoryMap.set(cat.id, { ...cat, items: [] });
    }
    categoryMap.get(cat.id)!.items.push(item);
  });
  const categories = Array.from(categoryMap.values());

  return (
  <div className="flex-1 w-full flex flex-col gap-6 max-w-4xl mx-auto py-4">
  <div className="flex flex-col gap-1 mb-1">
        <h2 className="font-bold text-3xl">Our Menu</h2>
        <div className="text-sm text-muted-foreground">
          Freshly brewed coffee and delightful treats
        </div>
      </div>
  <div className="flex flex-col gap-6">
        {categories.map(category => (
          <section className="space-y-3" key={category.id} aria-labelledby={`cat-${category.id}`}> 
            <div className="flex items-center gap-2 mb-1">
              <span className="block w-2 h-6 rounded bg-gradient-to-b from-teal-400 to-cyan-400" aria-hidden="true" />
              <h3 id={`cat-${category.id}`} className="text-2xl font-semibold tracking-tight">{category.name}</h3>
            </div>
            {category.description && (
              <div className="text-muted-foreground text-sm mb-1 ml-3">{category.description}</div>
            )}
            <div className="grid gap-5 grid-cols-2">
              {category.items.map((item, idx) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow p-0 overflow-hidden">
                  <div className="flex flex-col sm:flex-row gap-0">
                    {item.image_url && (
                      <div className="relative w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none overflow-hidden border-b sm:border-b-0 sm:border-r bg-muted">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          sizes="(min-width: 640px) 160px, 100vw"
                          className="object-cover"
                          priority={idx === 0}
                        />
                        {(item.is_feature || item.is_new) && (
                          <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
                            {item.is_feature && (
                              <span className="px-2.5 py-1 text-sm rounded-full bg-teal-100 text-teal-700 font-semibold shadow">Featured</span>
                            )}
                            {item.is_new && (
                              <span className="px-2.5 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-semibold shadow">New</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex flex-col flex-1 justify-between min-w-0 p-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-xl truncate">{item.name}</span>
                        </div>
                        {item.description && (
                          <div className="text-muted-foreground text-base line-clamp-2 mt-2">{item.description}</div>
                        )}
                      </div>
                      <div className="flex items-end justify-between gap-2 mt-6">
                        <span className="font-bold text-2xl text-teal-700 dark:text-teal-400">${Number(item.price).toFixed(2)}</span>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="min-w-[50px]"
                          disabled
                        >
                          Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
