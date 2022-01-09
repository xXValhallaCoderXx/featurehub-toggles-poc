import {
  // FeatureHubPollingClient,
  EdgeFeatureHubConfig,
  Readyness,
} from "featurehub-javascript-client-sdk";

const useFeatureHub = () => {
  const init = async () => {
    console.log("** INIT FEATUREHUB **");
    let initialized = false;
    let fhConfig;
    let fhClient;
    const FH_EDGE_URL = "http://localhost:8553";
    const FH_API_KEY =
      "default/548a557b-afeb-4951-819d-d31542573e5f/Ru3JLBS9wqMeDYb8i7gbHhDAo1Ria9aT4rDviYBd";
    fhConfig = new EdgeFeatureHubConfig(FH_EDGE_URL, FH_API_KEY); // initialise config

    fhClient = await fhConfig.newContext().build(); // create FeatureHub client

    fhConfig.addReadynessListener((readyness) => {
      if (!initialized) {
        if (readyness === Readyness.Ready) {
          initialized = true;
          const color = fhClient.getString("SUBMIT_COLOR_BUTTON");
          console.log("FS GET STRING 1: ", color);
          // this.setState({ todos: this.state.todos.changeColor(color) });
        }
      }
    });

    // react to incoming feature changes in real-time
    fhClient.feature("SUBMIT_COLOR_BUTTON").addListener((fs) => {
      // this.setState({ todos: this.state.todos.changeColor(fs.getString()) });
      console.log("FS GET STRING 2: ", fs.getString());
    });
  };

  return { init };
};

export default useFeatureHub;
