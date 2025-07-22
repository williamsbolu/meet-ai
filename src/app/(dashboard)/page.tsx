import { headers } from "next/headers";
import { auth } from "@/lib/auth";
// import HomeView from "@/modules/home/ui/views/home-view";
import { redirect } from "next/navigation";
// import { caller } from "@/trpc/server";

const Page = async () => {
  // const greeting = await caller.hello({ text: "Williams" }); // calling tcrp on server components

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  } else {
    redirect("/agents");
  }

  // return <HomeView />;
};

export default Page;
