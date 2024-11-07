# State: A Component's Memory
Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” should put a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called state.

You will learn
- How to add a state variable with the useState Hook
- What pair of values the useState Hook returns
- How to add more than one state variable
- Why state is called local
