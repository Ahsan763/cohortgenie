"use client";
import InteStep1 from "@/components/common/integrations/InteStep1";
import InteStep2 from "@/components/common/integrations/InteStep2";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
export default function IntegrationPage() {
  const params = useSearchParams();
  const step = params?.get("step");
  console.log("step", step);

  return (
    <div className="py-[2.5vh] min-h-screen flex flex-col justify-center">
      <div className="container-fluid">
        <Image
          src="/images/Logo.svg"
          width={193}
          height={36}
          alt="CohortGenie"
          className="h-9 w-auto mb-[4vh]"
        />
      </div>
      <div className="max-w-[720px] mx-auto">
        {step && step === "1" ? (
          <InteStep1 />
        ) : step === "2" ? (
          <InteStep2 />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
