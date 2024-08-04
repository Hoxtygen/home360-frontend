export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  handleIncreaseValue?: () => void;
  handleDecreaseValue?: () => void;
}
