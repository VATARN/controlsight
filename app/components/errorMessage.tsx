import { Callout } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { MdError } from "react-icons/md";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <div>
      <Callout.Root color="red" className="mb-5">
        <Callout.Icon>
          <MdError />
        </Callout.Icon>
        <Callout.Text>{children}</Callout.Text>
      </Callout.Root>
    </div>
  );
};

export default ErrorMessage;
