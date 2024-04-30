import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/issueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const IssuePage = () => {
  return <IssueForm />;
};

export default IssuePage;
