import { ReactFlowProvider } from "@xyflow/react";
import AutomationBuilder from "./components/AutomationBuilder";
import { DnDProvider } from "./contexts/DnDContext";
import { MantineProvider } from "@mantine/core";
import { Provider as JotaiProvider } from "jotai";

import styles from "./page.module.css";
import "@mantine/core/styles.css";
import { jotaiStore } from "./store/jotaiStore";

const Home = () => {
  return (
    <div className={styles.main}>
      <ReactFlowProvider>
        <DnDProvider>
          <MantineProvider>
            <JotaiProvider store={jotaiStore}>
              <AutomationBuilder />
            </JotaiProvider>
          </MantineProvider>
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  );
};

export default Home;
