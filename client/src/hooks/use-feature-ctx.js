import { createContext, useState, useContext, useEffect } from "react";
import {
  EdgeFeatureHubConfig,
  Readyness,
  StrategyAttributeCountryName,
} from "featurehub-javascript-client-sdk";

const FeatureHubCtx = createContext(null);

const FeatureProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [standardToggle, setStandardToggle] = useState(false);
  const [submitColor, setSubmitColor] = useState("");
  const [betaFeature, setBetaFeature] = useState(false);
  const [rollOutFeature, setRollOutFeature] = useState(false);
  const [jsonFeature, setJsonFeature] = useState({});

  useEffect(() => {
    setCurrentUser(user);
    init();
  }, []);

  const init = async () => {
    console.log("** INIT FEATUREHUB **");
    let initialized = false;
    let fhConfig;
    let fhClient;
    const FH_EDGE_URL = "http://localhost:8553";
    const FH_API_KEY =
      "default/1024028b-7efd-49a3-be10-7c6dd61920e7/o45a6rgWGlWuhHtBI7IIV2GfJgQpE5UwiXTjRp5v";
    fhConfig = new EdgeFeatureHubConfig(FH_EDGE_URL, FH_API_KEY); // initialise config

    fhClient = await fhConfig
      .newContext()
      .userKey(user.email)
      .country(StrategyAttributeCountryName.NewZealand)
      .attribute_value("userType", user.userType)
      .version("1.2.0") // Semantic version
      .build(); // create FeatureHub client

    fhConfig.addReadynessListener((readyness) => {
      if (!initialized) {
        if (readyness === Readyness.Ready) {
          initialized = true;
          const FEATURE_TOGGLE_1 = fhClient.getBoolean("FEATURE_TOGGLE_1");
          setStandardToggle(FEATURE_TOGGLE_1);
          console.log("FEATURE_TOGGLE_1", FEATURE_TOGGLE_1);

          const color = fhClient.getString("SUBMIT_COLOR_BUTTON");
          setSubmitColor(color);
          console.log("FS GET STRING 1: ", color);

          const betaFeature = fhClient.getBoolean("BETA_FEATURE");
          setBetaFeature(betaFeature);
          console.log("BETA_FEATURE", betaFeature);

          const rollOutFeature = fhClient.getBoolean("ROLL_OUT_FEATURE");
          setRollOutFeature(rollOutFeature);
          console.log("ROLL_OUT_FEATURE", rollOutFeature);

          const jsonFeature = fhClient.getJson("JSON_FEATURES");
          console.log("JSON_FEATURES", jsonFeature);
          setJsonFeature(jsonFeature);
        }
      }
    });

    // Websocket Listeners
    fhClient.feature("SUBMIT_COLOR_BUTTON").addListener((fs) => {
      setSubmitColor(fs.getString());
      console.log("SUBMIT_COLOR_BUTTON UPDATES: ", fs.getString());
    });

    fhClient.feature("FEATURE_TOGGLE_1").addListener((fs) => {
      setStandardToggle(fs.getBoolean());
      console.log("FEATURE_TOGGLE_1 UPDATED", fs.getBoolean());
    });

    fhClient.feature("BETA_FEATURE").addListener((fs) => {
      setBetaFeature(fs.getBoolean());
      console.log("BETA_FEATURE UPDATED", fs.getBoolean());
    });
  };
  return (
    <FeatureHubCtx.Provider
      value={{
        currentUser,
        standardToggle,
        submitColor,
        betaFeature,
        jsonFeature,
        rollOutFeature,
      }}
    >
      {children}
    </FeatureHubCtx.Provider>
  );
};

export default FeatureProvider;

export const useFeatureHub = () => useContext(FeatureHubCtx);
