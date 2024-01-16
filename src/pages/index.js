import { AutoCompleteInput } from "@/components/AutoCompleteInput";
import { Layout } from "@/components/Layout";
import "../app/globals.css";

export default function Page() {
  return (
    <Layout>
      <div className="max-w-lg my-4">
        <AutoCompleteInput />
      </div>
    </Layout>
  );
}
