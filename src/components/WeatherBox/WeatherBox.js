import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=09d0646984e1f7895b6714ef3a0bf435&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const newWeatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          console.log(newWeatherData);
          setWeatherData(newWeatherData);
          setPending(false);
        });
      } else {
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      { (!pending && weatherData && !error) && <WeatherSummary {...weatherData} /> }
      { (pending && !weatherData && !error) && <Loader /> }
      { error && <ErrorBox children={'wrong name'} /> }
    </section>
  )
};

export default WeatherBox;