import { Routes, Route } from 'react-router-dom';
import Branch from './components/Branch';
import Login from './components/Login/Login';
import Home from './pages/Home';
import PrivateRoutes from './routes/PrivateRoutes';
import BranchForm from './pages/BranchForm';
import AdminForm from './pages/AdminForm';
import * as RoutePaths from './constants/RoutePaths';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID} element={<Branch />} />
          <Route path="/branch/create" element={<BranchForm />} />
          <Route
            path={RoutePaths.BRANCH + RoutePaths.BRANCH_ID + RoutePaths.ADMIN + RoutePaths.CREATE}
            element={<AdminForm />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
