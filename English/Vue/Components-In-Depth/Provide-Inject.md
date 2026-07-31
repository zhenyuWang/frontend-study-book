# Provide / Inject

## Prop Drilling​
Usually, when we need to pass data from the parent to a child component, we use props. However, imagine the case where we have a large component tree, and a deeply nested component needs something from a distant ancestor component. With only props, we would have to pass the same prop across the entire parent chain:\
distant [/ˈdɪstənt/] 遥远的\
ancestor [/ˈænsestər/] 祖先\
chain [/tʃeɪn/] 链

Notice although the `<Footer>` component may not care about these props at all, it still needs to declare and pass them along just so `<DeepChild>` can access them. If there is a longer parent chain, more components would be affected along the way. This is called "props drilling" and definitely isn't fun to deal with.\
drilling [/ˈdrɪlɪŋ/] 钻孔

We can solve props drilling with `provide` and `inject`. A parent component can serve as a dependency provider for all its descendants. Any component in the descendant tree, regardless of how deep it is, can inject dependencies provided by components up in its parent chain.\
descendant [/dɪˈsendənt/] 后代\
regardless [/rɪˈɡɑrdləs/] 不管
