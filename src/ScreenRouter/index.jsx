import React, { Suspense } from "react";
import "../assets/scss/initial.scss";
import history from ".././common/History";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Loader from "../common/Loader";
import Login from ".././components/Login";

//linkedin redirect;
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { HelpPage } from "../helper/RoleConfig";
import RaiseTicket from "../components/MainContent/RaiseTicket";
import PrivateFullPage from "../components/PrivatePage/PrivateFullPage";

const EnableYoutube = React.lazy(() => import("../components/MainContent/BroadcastedVideos/BroadcastedVideosTable/EnableYoutube"));
const ActivateYoutube = React.lazy(() => import("../components/MainContent/BroadcastedVideos/BroadcastedVideosTable/ActivateYoutube"));
const YoutubeFeature = React.lazy(() => import("../components/MainContent/BroadcastedVideos/BroadcastedVideosTable/YoutubeFeature"));
const AccountConnected = React.lazy(() => import("../components/MainContent/BroadcastedVideos/BroadcastedVideosTable/AccountConnected"));
const YouTubebroadcast = React.lazy(() => import("../components/MainContent/BroadcastedVideos/BroadcastedVideosTable/YouTubebroadcast"));

const PrivatePage = React.lazy(() => import("../components/PrivatePage"));
const NotFoundPage = React.lazy(() => import(".././components/NotFound"));
const Teams = React.lazy(() => import("../components/MainContent/Teams"));
const Customers = React.lazy(() => import("../components/MainContent/Customers"));
const NoOfBroadcasts = React.lazy(() => import("../components/MainContent/NoOfBroadcasts"));
const Broadcast = React.lazy(() =>
  import("../components/MainContent/Broadcast")
);
const IntegrationHost = React.lazy(() => import("../components/MainContent/Integrations/IntegrationHost"));
const NetworkDetector = React.lazy(() => import("../common/NetworkDetector"));
const Registration = React.lazy(() => import(".././components/Registration"));
const ToastContainerJSX = React.lazy(() =>
  import("../common/ToastContainerJSX")
);
const ResetPassword = React.lazy(() =>
  import(".././components/Login/ResetPassword")
);
const ForgotPassword = React.lazy(() =>
  import(".././components/Login/ForgotPassword")
);

const BroadcastedVideos = React.lazy(() =>
  import("../components/MainContent/BroadcastedVideos")
);
const EmbededVideoPage = React.lazy(() =>
  import("../components/MainContent/BroadcastedVideos/BroadcastedVideosTable/EmbededVideoPage")
);
const EmbededVideoIframe = React.lazy(() =>
  import("../components/MainContent/BroadcastedVideos/BroadcastedVideosTable/EmbededVideoIframe")
);
const ScreenRouter = () => {
  return (
    <>
      <Router history={history}>
        <Suspense fallback={<Loader type={"fixed overlay"} />}>
          <Switch>
            <PrivatePage
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/teams"
              component={Teams}
            />
            <PrivatePage
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/customers"
              component={Customers}
            />
            {/* <PrivatePage
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/analytics"
              component={Analytics}
            /> */}
            <PrivatePage
              allowedRoles={["0", "1", "2", "3", "6", "7"]}
              path="/integration"
              component={IntegrationHost}
            />
            <PrivatePage
              allowedRoles={["1", "2", "3", "6", "7"]}
              path="/broadcast:token?"
              component={Broadcast}
            />
            <PrivatePage
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/no-of-broadcasts:token?"
              component={NoOfBroadcasts}
            />
            <Route
              path="/login/:token?"
              render={(props) => <Login {...props} />}
            />
            <Route exact path="/">
              {" "}
              <Login />
            </Route>
            {/* <Route exact path="/viewers-broadcast" > <ViewersBroadcast /></Route> */}
            {/* linked in redirect router */}
            <PrivatePage allowedRoles={HelpPage} path="/raise-ticket" component={RaiseTicket} />
            <Route
              path="/register/:token?"
              render={(props) => <Registration {...props} />}
            />
            <PrivatePage
              allowedRoles={["1", "2", "3", "5", "6", "7"]}
              path="/videos:token?"
              component={BroadcastedVideos}
            />
            <Route
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/embeded:token?"
              component={EmbededVideoPage}
            />
            <Route
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/embed:token?"
              component={EmbededVideoIframe}
            />
            <PrivateFullPage
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/enable-youtube"
              component={EnableYoutube}
            />
            <Route
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/enable-youtube-info"
              render={(props) => <EnableYoutube {...props} className="lg" />}
            />
            <PrivateFullPage
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/initiating-broadcast"
              component={YouTubebroadcast}
            />
            <PrivateFullPage
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/activate-youtube"
              component={ActivateYoutube}
            />
            <PrivateFullPage
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/account-connected"
              component={AccountConnected}
            />
            <Route
              allowedRoles={["1", "2", "3", "4", "5", "6", "7"]}
              path="/feature-youtube"
              component={YoutubeFeature}
            />
            <Route exact path="/linkedin">
              <LinkedInCallback />
            </Route>
            <Route path="/forgetpassword">
              {" "}
              <ForgotPassword />
            </Route>
            <Route
              path="/register/:token?"
              render={(props) => <Registration {...props} />}
            />
            <Route path="/register">
              {" "}
              <Registration />
            </Route>
            <Route path="/thank-you/:token?">
              {" "}
              <Registration />
            </Route>
            {/* password reset and create both have Same Page */}
            <Route
              path="/reset-password/:token"
              render={(props) => <ResetPassword {...props} />}
            />
            <Route
              path="/create-password/:token"
              render={(props) => <ResetPassword {...props} />}
            />
            {/* notFound page redirection */}
            {/* <Route path="/templates"><DeveloperTemplates /></Route> */}
            <Route path="/not-found">
              <NotFoundPage />
            </Route>
            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
      </Router>
      {/* Toast msg container*/}
      <Suspense fallback={<></>}>
        <ToastContainerJSX />
      </Suspense>
      {/* network detector */}
      <Suspense fallback={<></>}>
        <NetworkDetector />
      </Suspense>
      {/*router Navigation */}
    </>
  );
};
export default React.memo(ScreenRouter);
