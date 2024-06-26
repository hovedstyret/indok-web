import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Header } from "../_components/Header";
import { BoardMember, MemberCard } from "./_components/MemberCard";

const boardMembers: BoardMember[] = [
  {
    rank: 1,
    name: "Olav Bjørlykke",
    position: "Leder Hovedstyret",
    email: "leder@indokhs.no",
  },
  {
    rank: 2,
    name: "Tord Johan Espe",
    position: "Leder Hovedstyret",
    email: "leder@indokhs.no",
  },
  {
    rank: 3,
    name: "Arnas Tribusininas",
    position: "Finanssjef Hovedstyret",
    email: "finans@indokhs.no",
  },
  {
    rank: 4,
    name: "Jenny Temmerud",
    position: "President Janus",
    email: "president@janulinjeforening.no",
  },
  {
    rank: 5,
    name: "Amund Andreassen",
    position: "Instituttstillitsvalg",
    email: "itv@iot.ntnu.no",
  },
  {
    rank: 6,
    name: "Noah Meland",
    position: "Leder Bindeleddet",
    email: "leder@bindeleddet.ntnu.no",
  },
  {
    rank: 7,
    name: "Olav Seim",
    position: "Leder Janus IF",
    email: "if@indokhs.no",
  },
  {
    rank: 8,
    name: "Fannar Lindal",
    position: "Leder Indøk Kultur",
    email: "kultur@indokhs.no",
  },
  {
    rank: 9,
    name: "Mats Torsvik",
    position: "Leder Hytteforeningen",
    email: "leder@indokhyttene.no",
  },
  {
    rank: 10,
    name: "Benjamin Svarød",
    position: "Leder ESTIEM",
    email: "leder@estiem.no",
  },
];

export default function Page() {
  return (
    <>
      <Header
        title="Hovedstyret"
        subheader="Hovedstyret (HS) er styret i Foreningen for studentene ved Industriell økonomi og teknologiledelse, NTNU."
      />
      <Typography variant="body1" paragraph>
        Hovedstyret består av et valgt lederpar, instituttilittsvalgt ved IØT, samt leder for hver av linjeforeningene
        Janus, Bindeleddet, ESTIEM, Hytteforeningen, Janus IF og Indøk Kultur.
      </Typography>
      <Typography variant="body1" paragraph>
        Hovedstyrets fremste oppgave er å sørge for god kommunikasjon og samarbeid mellom de ulike studentinitiativene,
        og forvalte og disponere Indøks midler på en forsvarlig måte. Hovedstyret er ansvarlig for å forberede og
        avholde generalforsamling for studentene ved Indøk. Generalforsamlingen er Foreningens øverste organ og er
        studentenes mulighet til å direkte påvirke budsjetter og avgjørelser som blir fattet på linjen.
      </Typography>
      <Typography variant="h3" component="h2" gutterBottom>
        Medlemmer
      </Typography>
      <Grid container spacing={2} alignItems="stretch" justifyContent="center">
        {boardMembers.map((member) => (
          <Grid key={member.rank} xs={12} md={6}>
            <MemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}