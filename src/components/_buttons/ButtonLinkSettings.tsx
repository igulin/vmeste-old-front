import { Button } from ".";

interface IButtonLinkSettings {
    disabled: boolean;
    link: string;
    text?: string;
}

const ButtonLinkSettings: React.FC<IButtonLinkSettings> = ({
    disabled,
    link,
    text,
}) => {
    return (
        <Button
            text={text || "Перейти"}
            disabled={disabled}
            link={link}
            style={{
                width: "100%",
                margin: "auto 0 0 0",
                padding: "15px",
            }}
        />
    );
};

export default ButtonLinkSettings;
