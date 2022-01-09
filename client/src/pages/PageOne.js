import { useEffect } from "react";
import { useFeatureHub } from "../hooks/use-feature-ctx";
const PageOne = () => {
  const features = useFeatureHub();
  useEffect(() => {
    console.log("FEATURES: ", features)
   
  }, []);
  return <div>Page One</div>;
};

export default PageOne;
