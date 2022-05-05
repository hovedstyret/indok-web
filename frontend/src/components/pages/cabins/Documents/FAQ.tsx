import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box, Grid } from "@material-ui/core";
import Link from "next/link";

const faqs = [
  {
    question: "Hva er adressen til hyttene?",
    answer: (
      <Typography>
        Hyttene ligger rett ved Stølen alpintanlegg, med adresse Gårdavegen 88 og 90, 7340 Oppdal.{" "}
        <Link href="https://www.google.no/maps/place/Gard%C3%A5vegen+88,+7340+Oppdal/@62.6172879,9.7285127,17z/data=!3m1!4b1!4m5!3m4!1s0x461353ba1a632365:0x6a03f6b3ad43a6a8!8m2!3d62.6172879!4d9.7307014?hl=no">
          Vis kart.
        </Link>
      </Typography>
    ),
  },
  {
    question: "Hvor lang er avbestillingsfristen?",
    answer: (
      <Box>
        <Typography>Følgende regler gjelder for avbestilling av en booking:</Typography>
        <ul>
          <li>
            <Typography>Avbestilling innen to uker før bestilt ankomstdato er gebyrfritt.</Typography>
          </li>
          <li>
            <Typography>
              Avbestilling innen en uke i forkant av bestilt ankomstdato medfører et gebyr på 30% av leien.
            </Typography>
          </li>
        </ul>
      </Box>
    ),
  },
  {
    question: "Hvordan booker jeg sengeplasser?",
    answer: <Typography>Det gjøres ved å sende mail til booking.indokhyttene@gmail.com.</Typography>,
  },
  {
    question: "Hva er forskjellen på de to hyttene?",
    answer: (
      <Typography>
        Hyttene er tilnærmet identiske. Bjørnen har TV med HDMI-kabel.
      </Typography>
    ),
  },
  {
    question: "Hva er den totale kapasiteten på hyttene?",
    answer: (
      <Typography>
        Den totale kapasiteten er 18 personer på hver hytte, fordelt på 14 sengeplasser og 4 madrasser.
      </Typography>
    ),
  },
  {
    question: "Hva kan man finne på i Oppdal?",
    answer: (
      <Typography>
        Mange aktiviteter tilbys av eksterne aktører, se Aktiviteter for videre info. Oppdal ligger på østkanten av
        Trollheimen, og det er mange flotte dagsturer å velge mellom med dette utgangspunktet.
      </Typography>
    ),
  },
  {
    question: "Hva har hyttene av dyner, puter og sengetøy?",
    answer: (
      <Typography>
        Begge hyttene er utstyrt med minimum 18 puter og 18 dyner, men laken og sengetøy (evt. sovepose) må
        medbringes.
      </Typography>
    ),
  },

  {
    question: "Kan jeg ha med meg eksterne venner (ikke-indøkere) til hyttene?",
    answer: (
      <Typography>
        Ja. Det er egne priser for eksterne gjester. Hvis det skal bookes sengeplasser må det være med en indøker på turen.
        Hvis over 50 % av gjestene er eksterne, og hele hytta skal bookes, må det betales ekstern-pris.
      </Typography>
    ),
  },
  {
    question: "Hvor mye må jeg betale om jeg mister nøklene?",
    answer: (
      <Typography>
        Den som er nøkkelansvarlig er ansvarlig for nøklene. Dersom disse går tapt vil Hytteforeningen fakturere den
        nøkkelansvarlige et gebyr på 1000,-. Hytteforeningen tar ikke stilling til hvorvidt de andre gjestene bidrar til å
        dekke gebyret.
      </Typography>
    ),
  },
  {
    question: "Hvordan er ordningen for utvask på hyttene?",
    answer: (
      <Typography>
        De som har brukt hyttene må alltid vaske ut selv. Det er veldig viktig at alle vinduer lukkes og dører låses.
      </Typography>
     ),
  },
  {
    question: "Kan jeg reservere en hytte for min eksterne vennegjeng eller eksterne linjeforening?",
    answer: <Typography>Ja. Dette forutsetter leie av hel hytte, og ekstern pris gjelder, 2700,- per natt.</Typography>,
  },
];

/*
Renders all frequently asked questions regarding the cabins.
*/
const FAQ: React.FC = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (_event: React.ChangeEvent<Record<string, unknown>>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid item container xs={12} spacing={5}>
      {faqs.map((faq, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Box>
            <Accordion expanded={expanded === index} onChange={handleChange(index)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>{faq.answer}</AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default FAQ;
