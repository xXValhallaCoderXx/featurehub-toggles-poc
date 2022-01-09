import {useEffect} from "react"
import useFeatureHub from "../hooks/use-feature-hub"

const PageOne = () => {
  const {init} = useFeatureHub()
  useEffect(() => {
    init()
  },[])
  return <div>Page One</div>;
};

export default PageOne;
