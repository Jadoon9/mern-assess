import { useField } from "formik";

const Textarea = ({ textareaName, rows, cols, isRequired, label }) => {
  const [field, meta] = useField(textareaName);

  return (
    <div className="w-full">
      <label htmlFor="" className="body-regular text-secondary-500">
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <textarea
        className="primary-border-color w-full !focus:ring-1  !focus:border-[primary-border-color] rounded-[8px] p-2 body-regular mt-2"
        id=""
        cols={cols}
        rows={rows}
        placeholder="Write Description here"
        {...field}
      ></textarea>

      {meta.touched && meta.error && (
        <p className="text-red-500 body-regular">{meta.error}</p>
      )}
    </div>
  );
};

export default Textarea;
