import { FaSitemap } from "react-icons/fa";
import { TbHomeStats } from "react-icons/tb";
import { BiTask } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";

import map_tree from "../assets/map_tree.mp4";
import overview from "../assets/overview.mp4";
import task_generator from "../assets/task_generator.mp4";
import timer from "../assets/timer.mp4";

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

export const offers_pres = [
  {
    id: "Road Map",
    title: "Road Map",
    desc: "You can define our own learning journey with this section.",
    source: map_tree,
    reverse: false,
    description:
      "The Road Map section is your personalized guide to growth and learning. It allows you to plot out your educational or professional development path with milestones and checkpoints. Set long-term goals and the steps needed to achieve them, and our app will help you stay on course. It's the perfect tool to ensure that every task you complete is a step forward in your journey to success.",
  },
  {
    id: "Overview",
    title: "Overview",
    desc: "You can check your daily result in this section.",
    source: overview,
    reverse: true,
    description:
      "The Overview section provides a comprehensive snapshot of your productivity. It's designed to give you a quick yet detailed view of your performance, displaying your completed and pending tasks, time allocation efficiency, and progress over time. With easy-to-digest metrics and visual data representation, you can gauge your success at a glance and adjust your strategies for enhanced productivity.",
  },
  {
    id: "Task",
    title: "Task",
    desc: "Create, update or remove tasks from our daily plan.",
    source: task_generator,
    reverse: false,
    description:
      "Our Task feature is the backbone of daily productivity, offering a dynamic and interactive way to manage your day-to-day activities. With the ability to create, modify, and delete tasks, you have full control over your schedule. Whether you’re organizing work duties, setting personal goals, or planning leisure activities, this tool adapts to your needs, helping you to stay organized and focused on what's most important.",
  },
  {
    id: "Timer",
    title: "Timer",
    desc: "To manage your time you should assign it to task.",
    source: timer,
    reverse: true,
    description:
      "The Timer function is essential for anyone serious about time management. Assign time to each task and watch as our intuitive timer keeps track of your work, providing you with real-time insights into how long each activity takes. This feature not only encourages disciplined work sessions but also helps in the analysis of your time expenditure, fostering a more efficient and productive workflow.",
  },
];

export default inpto_products;
