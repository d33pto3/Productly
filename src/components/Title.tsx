type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return <h1 className="text-4xl font-bold text-black dark:text-white">{title}</h1>;
};

export default Title;
