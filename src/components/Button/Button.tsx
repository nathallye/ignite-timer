import { ButtonContainer, ButtonVariant } from "./Button.styles";

// import styles from "./Button.module.css";

interface ButtonProps {
  variant?: ButtonVariant;
}

export const Button = ({ variant = "primary" }: ButtonProps) => {
  return (
    // <button className={`${styles.button} ${styles[variant]}`}>Button</button>
    <ButtonContainer variant={variant}>Enviar</ButtonContainer>
  );
};
