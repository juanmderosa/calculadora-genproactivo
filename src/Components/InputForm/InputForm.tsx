import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../helpers/zod/formSchema";
import "./inputForm.css";
import "../Form/form.css";
import { ChangeEvent } from "react";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label?: string;
  type?: string;
  error?: FieldError;
  clarificationText?: string;
  min?: number;
  max?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({
  name,
  control,
  label,
  type,
  error,
  clarificationText,
  min,
  max,
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
                className="inputForm"
                id={`${name}-${type}`}
                type={type}
                min={min}
                max={max}
                {...field}
              />
            )}
          />
          {clarificationText && (
            <span className={`clarificationTextContainer `}>
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
