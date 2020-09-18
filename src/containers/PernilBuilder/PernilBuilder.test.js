import { PernilBuilder } from "./PernilBuilder";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Pernil/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<PernilBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PernilBuilder onInitIngredients={() => {}} />);
  });

  it("Should render <BuildControls /> when recieving ingredients", () => {
    wrapper.setProps({ ings: {salad: 0} });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
