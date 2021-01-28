import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavgiationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });
let wrapper;
beforeEach(() => {
  wrapper = shallow(<NavgiationItems />);
});

describe("<NavgiationItems/>", () => {
  it("should render two <NavigationItem /> elements if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("should render three <NavigationItem /> elements if authenticated", () => {
    // wrapper = shallow(<NavgiationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should an exact logout button <NavigationItem /> elements if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
