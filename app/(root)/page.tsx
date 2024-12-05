import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "../auth";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Hero />
      <SearchBar />

      <section>
        <h1 className="text-5xl text-main text-center font-bold ">
          Our best recipes right now!
        </h1>
        <div className="flex justify-center gap-16 mt-10">
          <RecipeCard
            route="esa"
            title="Kotlet schabowy"
            rating={4.5}
            cookingTime="00:45"
            imageSrc="/uploads/recipe/0u6UN8bG1WbxAwm5RWDQ.jpg"
          />

          <RecipeCard
            route="esa"
            title="Kotlet schabowy"
            rating={4.5}
            cookingTime="00:45"
            imageSrc="/uploads/recipe/0u6UN8bG1WbxAwm5RWDQ.jpg"
          />

          <RecipeCard
            route="esa"
            title="Kotlet schabowy"
            rating={4.5}
            cookingTime="00:45"
            imageSrc="/uploads/recipe/0u6UN8bG1WbxAwm5RWDQ.jpg"
          />
        </div>
      </section>

      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
    </main>
  );
}
