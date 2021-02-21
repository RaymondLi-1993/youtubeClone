import React from "react";
import { Route, Redirect } from "react-router-dom";

// const protectedRoute = ({ user: user, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (user.isSignedIn) {
//           return <Component {...props} />;
//         } else {
//           return (
//             <Redirect
//               to={{ pathname: "/signin", state: { from: props.location } }}
//             />
//           );
//         }
//       }}
//     ></Route>
//   );
// };

//export default protectedRoute;

// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";

// import { returningUser } from "../actions/index";

// const Landing = () => {
//   const dispatch = useDispatch();
//   const state = useSelector(state => state.auth);
//   const [redirect, setRedirect] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let isMount = true;
//     const fetch = async () => {
//       const response = await Axios.get(`/api/login`);
//       if (isMount) {
//         if (response.data.err > 0 && state.isSignedIn === false) {
//           setRedirect(true);
//         } else {
//           //console.log(`there is a user`);
//           dispatch(returningUser(response));
//           setLoading(true);
//         }
//       }
//     };
//     fetch();
//     return () => {
//       isMount = false;
//     };
//   }, []);
//   //return <div></div>;

//   if (redirect === true) {
//     return <Redirect to="/signin" />;
//   }
//   if (loading === true) {
//     return <Redirect to="/videos" />;
//   }
//   return <div></div>;
// };

// export default Landing;
