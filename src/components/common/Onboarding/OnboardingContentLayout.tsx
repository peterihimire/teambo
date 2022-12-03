import React from "react";

interface Props {
  children?: any;
}
const OnboardingContentLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className="onboarding-content-layout">
      <div className="onboarding__content-center">{children}</div>
    </section>
  );
};

export default OnboardingContentLayout;
