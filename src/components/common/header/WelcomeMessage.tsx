import GetCurrentUser from "@/components/GetCurrentUser";
import Heading from "@/components/UI/heading";

interface WelcomeMessageProps {
  message: string;
}

export default function WelcomeMessage({ message }: WelcomeMessageProps) {
  return (
    <Heading className="text-2xl my-4 font-bold flex flex-row space-x-2">
      <span>{message} 👋</span>
      <GetCurrentUser />
    </Heading>
  );
}
