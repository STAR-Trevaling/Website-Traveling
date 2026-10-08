import { TravelHome } from "@/components/home/travel-home";
import { publicApi, safe } from "@/lib/api";

export const revalidate = 60;

export default async function HomePage() {
  const [destinations, tours] = await Promise.all([
    safe(publicApi.destinations(), []),
    safe(publicApi.tours(), []),
  ]);

  return (
    <TravelHome
      destinations={destinations.length ? destinations : undefined}
      tours={tours.length ? tours : undefined}
    />
  );
}
