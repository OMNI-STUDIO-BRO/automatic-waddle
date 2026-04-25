import { Switch, Route } from "wouter";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import OwnerPage from "./pages/OwnerPage";

export default function App() {
  return (
    <Switch>
      {/* This is your Home Screen */}
      <Route path="/" component={HomePage} />
      
      {/* This is the Editor page (This fixes the button!) */}
      <Route path="/editor/:id" component={EditorPage} />
      
      {/* This is your secret Owner page */}
      <Route path="/owner" component={OwnerPage} />
      
      <Route>404: Page Not Found</Route>
    </Switch>
  );
}

