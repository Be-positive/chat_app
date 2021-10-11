import React from "react";
import { shallow } from "enzyme";
import Reset from "./components/Reset";
import { Provider } from "react-redux";
import reducer from "./redux/rootReducer";
import { createStore } from "redux";

const store = createStore(reducer);

describe("Test", () => {
  it("h3 has a exact lenght", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Reset />
      </Provider>
    );
    expect(wrapper.find("h3")).toHaveLength(0);
  });
});
