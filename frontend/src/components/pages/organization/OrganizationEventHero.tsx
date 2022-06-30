import Title from "@components/Title";
import { Event } from "@interfaces/events";

type Props = {
  event: Event;
};

const OrganizationEventHero: React.FC<Props> = ({ event }) => {
  return (
    <Title
      title={event.title}
      overline="Administrer arrangement"
      breadcrumbs={[
        { href: "/", name: "Hjem" },
        { href: "/orgs", name: "Foreninger" },
        { href: `/orgs/${event.organization.id}`, name: event.organization.name },
        { name: event.title },
      ]}
      variant="dark"
    />
  );
};

export default OrganizationEventHero;
