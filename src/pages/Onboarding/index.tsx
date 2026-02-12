import { useState } from "react";
import { OnboardingLayout } from "./OnboardingLayout";
import { Step1UserType } from "./Step1UserType";
import { Step2Specialization } from "./Step2Specialization";
import { Step3Frequency } from "./Step3Frequency";
import { Step4Workspace } from "./Step4Workspace";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [frequency, setFrequency] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <OnboardingLayout step={step}>
      {step === 1 && <Step1UserType value={userType} onChange={setUserType} onNext={next} />}
      {step === 2 && <Step2Specialization value={specialization} onChange={setSpecialization} onNext={next} onBack={back} />}
      {step === 3 && <Step3Frequency value={frequency} onChange={setFrequency} onNext={next} onBack={back} />}
      {step === 4 && <Step4Workspace onBack={back} />}
    </OnboardingLayout>
  );
};

export default Onboarding;
