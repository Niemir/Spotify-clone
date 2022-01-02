import { FC } from "react";

interface TitleProps {
  text: string;
}
const Title: FC<TitleProps> = ({ text }) => {
  return <h2 className="text-2xl font-bold mb-3">{text}</h2>;
};

export default Title;
