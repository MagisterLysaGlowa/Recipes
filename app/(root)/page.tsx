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

      <section className="mb-[100px]">
        <h1 className="text-5xl text-main text-center font-bold ">
          Our best recipes right now!
        </h1>
        <div className="flex justify-center gap-16 mt-10">
          <RecipeCard
            route="esa"
            title="Pierogi ruskie"
            rating={4.1}
            cookingTime="00:45"
            imageSrc="/uploads/recipe/0u6UN8bG1WbxAwm5RWDQ.jpg"
          />

          <RecipeCard
            route="esa"
            title="Pierogi z mięsem"
            rating={4.5}
            cookingTime="00:45"
            imageSrc="/uploads/recipe/unKGe2veDp5b7uOgurPJ.jpg"
          />

          <RecipeCard
            route="esa"
            title="Pierogi z grzybami"
            rating={4.3}
            cookingTime="00:50"
            imageSrc="/uploads/recipe/N0uvEQsjZX41FyRZMhE4.jpg"
          />
        </div>
      </section>
    </main>
  );
}
