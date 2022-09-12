import { toast } from "react-toastify";

const Id = ({ data, title }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    toast.info("Copied to clipboard!");
  };

  return (
    <div
      onClick={handleCopy}
      title="Click to copy"
      className="flex cursor-pointer items-center text-sm italic text-slate-300 hover:text-slate-400"
    >
      <div className="flex items-center justify-center text-xl">
        <ion-icon name="key"></ion-icon>
      </div>
      <div>{title}</div>
    </div>
  );
};

export default Id;
