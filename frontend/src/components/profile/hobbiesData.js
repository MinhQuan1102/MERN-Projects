import {
  faBasketball,
  faBook,
  faCameraRetro,
  faCartShopping,
  faEarthEurope,
  faGamepad,
  faHeadphones,
  faLaptopCode,
  faMagnifyingGlass,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const hobbiesData = [
  {
    id: "Listening To Music",
    desc: "Listening to music",
  },
  {
    id: "Traveling",
    desc: "Traveling",
  },
  {
    id: "Reading Books",
    desc: "Reading books",
  },
  {
    id: "Playing Games",
    desc: "Playing games",
  },
  {
    id: "Coding",
    desc: "Coding",
  },
  {
    id: "Learning",
    desc: "Learning",
  },
  {
    id: "Photography",
    desc: "Photography",
  },
  {
    id: "Watching Films",
    desc: "Watching films",
  },
  {
    id: "Drawing",
    desc: "Drawing",
  },
  {
    id: "Basketball",
    desc: "Basketball",
  },
  {
    id: "Shopping",
    desc: "Shopping",
  },
  {
    id: "",
    desc: "Search for others",
  },
];

export const hobbiesIcons = (hobby) => {
  switch (hobby) {
    case "Listening To Music":
      return <FontAwesomeIcon icon={faHeadphones} />;
    case "Traveling":
      return <FontAwesomeIcon icon={faEarthEurope} />;
    case "Reading Books":
      return <FontAwesomeIcon icon={faBook} />;
    case "Playing Games":
      return <FontAwesomeIcon icon={faGamepad} />;
    case "Coding":
      return <FontAwesomeIcon icon={faLaptopCode} />;
    case "Learning":
      return <FontAwesomeIcon icon={faBook} />;
    case "Drawing":
      return <FontAwesomeIcon icon={faPencil} />;
    case "Photography":
      return <FontAwesomeIcon icon={faCameraRetro} />;
    case "Watching Films":
      return <FontAwesomeIcon icon={faGamepad} />;
    case "Basketball":
      return <FontAwesomeIcon icon={faBasketball} />;
    case "Shopping":
      return <FontAwesomeIcon icon={faCartShopping} />;
    case "":
      return <FontAwesomeIcon icon={faMagnifyingGlass} />;
  }
};
