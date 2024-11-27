# State as a Snapshot
State variables might look like regular JavaScript variables that you can read and write to. However, state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.

You will learn
- How setting state triggers re-renders
- When and how state updates
- Why state does not update immediately after you set it
- How event handlers access a “snapshot” of the state
