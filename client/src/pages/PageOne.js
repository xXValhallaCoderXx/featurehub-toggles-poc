import { useEffect } from "react";
import { useFeatureHub } from "../hooks/use-feature-ctx";
import BetaFeature from "../components/BetaComponent";
import FeatureToggle from "../components/FeatureToggle";

const PageOne = () => {
  const features = useFeatureHub();
  useEffect(() => {
    console.log("FEATURES: ", features);
  }, []);
  return (
    <div>
      {features.betaFeature && <BetaFeature />}
      {features.standardToggle && <FeatureToggle />}
    </div>
  );
};

export default PageOne;
