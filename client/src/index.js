import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SidebarProvider } from './context/dashboard/SideBarContext';
import { Windmill } from "@windmill/react-ui";
import windmillTheme from "./windmillTheme";
import "./assets/dashboard/css/tailwind.output.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <SidebarProvider>
         <Windmill usePreferences theme={windmillTheme}>
            <App />
         </Windmill>
      </SidebarProvider>
   </React.StrictMode>
);
