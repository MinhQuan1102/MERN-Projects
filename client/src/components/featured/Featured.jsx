import "./featured.css";
import useFetch from '../../hooks/useFetch'
const Featured = () => {
  const { data, loading, error } = useFetch('http://localhost:5000/api/hotels/countByCity?cities=Hue,Ha%20Noi,Da%20Nang') 
  let cityList, cities
  const images = [
    "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
  ]
  if (data) {
    cityList = data.cityList
    cities = data.cities
  }
  return (
    <div className="featured">
      { loading ? ('loading') : (
        <>
          {data && images.map((item, index) => (
            <div className="featuredItem" key={index}>
            <img
              src={item}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{cities[index]}</h1>
              <h2>{cityList[index]} properties</h2>
            </div>
          </div>
          ))}
        </>)}
    </div>
  );
};

export default Featured;
