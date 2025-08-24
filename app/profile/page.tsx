import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const { user } = data;

  return (
    <div className="flex flex-col min-h-svh items-center justify-center p-6 md:p-10 pb-20">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="font-semibold">Email</div>
              <div className="text-muted-foreground text-sm">{user.email}</div>
            </div>
            <form action="/auth/sign-out" method="post">
              <Button type="submit" className="w-full" variant="destructive">
                Sign Out
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
