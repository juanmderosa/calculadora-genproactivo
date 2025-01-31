import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../helpers/zod/formSchema";
import "./inputForm.css";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
  clarificationText?: string;
  clarificationPosition?: "start" | "end";
}

const InputForm = ({
  name,
  control,
  label,
  type,
  error,
  clarificationPosition,
  clarificationText,
}: Props) => {
  return (
    <div className="inputFormMainContainer">
      <div className="inputFormContainer">
        <label htmlFor={name}>{label}</label>
        <div className={`inputMainContainer `}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                className={`${
                  clarificationPosition === "end" ? "right" : "left"
                }`}
                id={`${name}-${type}`}
                type={type}
                {...field}
              />
            )}
          />
          {clarificationText && (
            <span
              className={`clarificationTextContainer ${
                clarificationPosition === "end"
                  ? "clarificationPositionEnd"
                  : "clarificationPositionStart"
              }`}>
              {clarificationText}
            </span>
          )}
        </div>
      </div>
      {error && <p className="errorMessage">{error.message}</p>}
    </div>
  );
};

export default InputForm;
