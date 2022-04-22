import { useEffect, useMemo, useCallback, useState } from "react";
import CountrySelector from "./components/CountrySelector";
import { getCountries, getReportByCountry } from "./apis";
import Summary from "./components/Summary";
import Highlight from "./components/Highlight";
import { Box, Container, Typography } from "@material-ui/core";
import "@fontsource/roboto";
import moment from "moment";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    const getDataCountry = async () => {
      const countries = await getCountries();
      setCountries(countries);
      setSelectedCountryId("jp");
    };
    getDataCountry();
  }, []);

  const handleOnChange = useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    if (!selectedCountryId) return;
    const selectedCountry = countries.find(
      (country) => country.ISO2 === selectedCountryId.toUpperCase()
    );
    const getReportDataByCountry = async () => {
      const country = await getReportByCountry(selectedCountry.Slug);
      setReport(country);
    };
    getReportDataByCountry()
  }, [selectedCountryId, countries]);

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 2];
      return [
        {
          title: "感染者数",
          count: latestData.Confirmed,
          type: "confirmed",
        },
        {
          title: "死亡者数",
          count: latestData.Deaths,
          type: "death",
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        新型コロナウイルス感染症(COVID‑19)
      </Typography>
      <Box component='p' sx={{mb:3}}>{moment().format("LLL")}</Box>
      <CountrySelector
        handleOnChange={handleOnChange}
        countries={countries}
        value={selectedCountryId}
      />
      <Highlight summary={summary} />
      <Summary countryId={selectedCountryId} report={report} />
    </Container>
  );
};

export default App;
