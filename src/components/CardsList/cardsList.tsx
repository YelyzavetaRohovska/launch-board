import { ILaunch } from "@/models/launches";
import Fetch, { IPayload } from "@/services/fetch";
import Card from "@/components/Card";

interface CardsListProps {
  searchQuery?: string;
  page: number;
  limit: number;
}

export const CardsList = async function({
  searchQuery,
  page,
  limit
}: CardsListProps) {
  let payload: IPayload<ILaunch> = {
    query: {},
    options: {
      limit,
      page,
      select: {
        name: 1,
        details: 1,
        links: 1,
        cores: 1,
        success: 1,
        flight_number: 1,
      },
    }
  }

  if (searchQuery) {
    payload.query.name = { $regex: searchQuery, $options: "i"};
    delete payload.options?.page;
  }

  const { error, data } = await Fetch.getPaginatedData<ILaunch>(
    "https://api.spacexdata.com/v5/launches/query",
    payload,
  );

  if (error) return (<div>Error</div>);

  return (
    <div className="flex w-full flex-col">
      {data?.docs.map(launch => (
        <Card
          key={launch.flight_number}
          title={launch.name}
          description={launch.details}
          flightNumber={launch.flight_number}
          success={launch.success}
          cores={launch.cores}
          image={{
            large: launch.links.patch.large,
            small: launch.links.patch.small,
            width: 150,
            height: 150,
            alt: launch.name + " patch",
          }}
        />
      ))}
      {data && !data.docs.length && (
        <p>No launches found :(</p>
      )}
    </div>
  );
}
