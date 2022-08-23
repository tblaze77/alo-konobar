import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
function WithRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let { pathname } = location;
    let navigate = useNavigate();
    let params = useParams();
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, [pathname]);
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default WithRouter();
