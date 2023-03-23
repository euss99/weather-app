import "../src/scss/styles.scss";

const container: HTMLElement | null = document.querySelector(".container");
const search: HTMLElement | null = document.querySelector(".search-box button");
const weatherBox: HTMLElement | null = document.querySelector(".weather-box");
const weatherDetails: HTMLElement | null =
  document.querySelector(".weather-details");
const error404: HTMLElement | null = document.querySelector(".not-found");

if (search) {
  search.addEventListener("click", () => {
    const APIKey: string = "9809e9049f9f56e76095ce50ede65935";
    const cityInput: HTMLInputElement | null =
      document.querySelector(".search-box input");

    const city: string | null = cityInput?.value;

    if (city === "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((response: Response) => response.json())
      .then(
        (json: {
          cod: string;
          main: { temp: string; humidity: number };
          weather: [{ description: string; main: string }];
          wind: { speed: string };
        }) => {
          if (json.cod === "404") {
            container.style.height = "400px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");
            return;
          }

          error404.style.display = "none";
          error404.classList.remove("fadeIn");

          const image: HTMLImageElement | null =
            document.querySelector(".weather-box img");
          const temperature: HTMLElement | null = document.querySelector(
            ".weather-box .temperature"
          );
          const description: HTMLElement | null = document.querySelector(
            ".weather-box .description"
          );
          const humidity: HTMLElement | null = document.querySelector(
            ".weather-details .humidity span"
          );
          const wind: HTMLElement | null = document.querySelector(
            ".weather-details .wind span"
          );

          switch (json.weather[0].main) {
            case "Clear":
              image.src = "https://i.imgur.com/QNtJJqa.png";
              break;
            case "Rain":
              image.src = "https://i.imgur.com/9fOogY0.png";
              break;
            case "Snow":
              image.src = "https://i.imgur.com/7HKa4Jk.png";
              break;
            case "Clouds":
              image.src = "https://i.imgur.com/pduruzD.png";
              break;

            default:
              image.src = "";
          }

          temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

          weatherBox.style.display = "";
          weatherDetails.style.display = "";
          weatherBox.classList.add("fadeIn");
          weatherDetails.classList.add("fadeIn");
          container.style.height = "590px";
        }
      );
  });
}
