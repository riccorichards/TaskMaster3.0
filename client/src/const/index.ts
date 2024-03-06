import { FaSitemap } from "react-icons/fa";
import { TbHomeStats } from "react-icons/tb";
import { BiTask } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";

const inpto_products = [
  {
    id: 1,
    title: "Overview",
    desc: "You can check your result in this section.",
    icon: TbHomeStats,
  },
  {
    id: 2,
    title: "Task",
    desc: "Create, update or remove tasks from our daily plan.",
    icon: BiTask,
  },
  {
    id: 3,
    title: "Timer",
    desc: "To manage your time you should assing it to task.",
    icon: IoIosTimer,
  },
  {
    id: 4,
    title: "Road Map",
    desc: "You can define our own learning journey with this section.",
    icon: FaSitemap,
  },
];

export default inpto_products;
