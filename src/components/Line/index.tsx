import s from "./Line.module.scss";

interface ILine {
    style?: React.CSSProperties;
}

const Line: React.FC<ILine> = ({ style }) => {
    return <div className={s.line} style={style} />;
};

export default Line;
