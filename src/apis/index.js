import axios from "axios";
import moment from "moment";
import { sortBy } from "lodash";

export const getCountries = async () => {
  try {
    const res = await axios.get("https://api.covid19api.com/countries");
    const { data } = res;
    const countries = sortBy(data, "Country");
    return countries;
  } catch (error) {
    console.log(error);
  }
};

export const getReportByCountry = async (slug) => {
  try {
    const res = await axios.get(
      `https://api.covid19api.com/dayone/country/${slug}?from=2021-01-01T00:00:00&to=${moment()
        .utc(0)
        .format()}`
    );
    const {data} =res
    return data
  } catch (error) {
    console.log(error)
  }
};

export const getMapDataByCountryId = (countryId) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
  );
