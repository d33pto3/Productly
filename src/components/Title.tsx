import { Link } from "react-router";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return (
    <h1 className="font-space text-3xl sm:text-4xl font-bold text-black dark:text-white">
      <Link to={"/"}>{title}</Link>
    </h1>
  );
};

export default Title;
