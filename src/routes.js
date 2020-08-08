import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Main from "./pages/Main";
import SiteWebView from "./pages/SiteWebView";

const Routes = createAppContainer(
    createStackNavigator(
        {
            Main,
            SiteWebView
        },

        {
            defaultNavigationOptions:{
                headerShown: false
            }
        }
    )
);

export default Routes;