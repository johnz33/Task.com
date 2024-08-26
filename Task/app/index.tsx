import { Text, View } from "react-native";
import Home from "./Home";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function Index() {
  return (
   <Provider store={store}>
     <View>
      <Home/>
    </View>
   </Provider>
  );
}
