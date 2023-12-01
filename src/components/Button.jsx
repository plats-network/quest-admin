import { cn } from "../utils/cn";

function Button({ name, className, ...props }) {
  return (
    <button
      className={cn(
        "bg-[#D83F31] hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded mt-4 md:mt-8 text-[16px] md:text-[20px]",
        className
      )}
      {...props}
    >
      {name}
    </button>
  );
}

export default Button;
