import { Redirect, Route, Switch } from 'react-router-dom';
import Booking from './Pages/Booking';
import Success from './Pages/Success';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/booking" />
        </Route>
        <Route path="/booking" exact>
          <Booking />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </>
  );
}

export default App;
