# Start a New React Project
If you want to build a new app or a new website fully with React, we recommend picking one of the React-powered frameworks popular in the community.

You can use React without a framework, however we’ve found that most apps and sites eventually build solutions to common problems such as code-splitting, routing, data fetching, and generating HTML. These problems are common to all UI libraries, not just React.\
eventually [ɪˈventʃuəli] adv. 最终，终于；

By starting with a framework, you can get started with React quickly, and avoid essentially building your own framework later.\
essentially [ɪˈsenʃəli] adv. 本质上，基本上；

## Production-grade React frameworks
These frameworks support all the features you need to deploy and scale your app in production and are working towards supporting our full-stack architecture vision. All of the frameworks we recommend are open source with active communities for support, and can be deployed to your own server or a hosting provider. If you’re a framework author interested in being included on this list, please let us know.\
architecture [ˈɑːrkɪtektʃə(r)] n. 构造；体系；\
vision [ˈvɪʒn] n. 视力；视觉；幻想；愿望；愿景；

## Next.js
[Next.js’ Pages Router](https://nextjs.org) is a full-stack React framework. It’s versatile and lets you create React apps of any size—from a mostly static blog to a complex dynamic application. To create a new Next.js project, run in your terminal:\
versatile [ˈvɜːrsətl] adj. 多才多艺的；多方面的；多功能的；\
mostly [ˈməʊstli] adv. 大部分；主要地；
```
npx create-next-app@latest
```
If you’re new to Next.js, check out the [learn Next.js course](https://nextjs.org/learn).

Next.js is maintained by Vercel. You can deploy a Next.js app to any Node.js or serverless hosting, or to your own server. Next.js also supports a static export which doesn’t require a server.

## Remix
[Remix](https://remix.run) is a full-stack React framework with nested routing. It lets you break your app into nested parts that can load data in parallel and refresh in response to the user actions. To create a new Remix project, run:
```
npx create-remix
```
If you’re new to Remix, check out the Remix [blog tutorial](https://remix.run/docs/en/main/tutorials/blog) (short) and [app tutorial](https://remix.run/docs/en/main/tutorials/jokes) (long).

Remix is maintained by Shopify. When you create a Remix project, you need to pick your deployment target. You can deploy a Remix app to any Node.js or serverless hosting by using or writing an adapter.

## Gatsby
[Gatsby](https://www.gatsbyjs.com/) is a React framework for fast CMS-backed websites. Its rich plugin ecosystem and its GraphQL data layer simplify integrating content, APIs, and services into one website. To create a new Gatsby project, run:
```
npx create-gatsby
```
If you’re new to Gatsby, check out the [Gatsby tutorial](https://www.gatsbyjs.com/docs/tutorial/). 

Gatsby is maintained by Netlify. You can deploy a fully static Gatsby site to any static hosting. If you opt into using server-only features, make sure your hosting provider supports them for Gatsby. 

## Expo (for native apps) 
[Expo](https://expo.dev/) is a React framework that lets you create universal Android, iOS, and web apps with truly native UIs. It provides an SDK for React Native that makes the native parts easier to use. To create a new Expo project, run: 
```
npx create-expo-app
```
If you’re new to Expo, check out the [Expo tutorial](https://docs.expo.dev/tutorial/introduction/). 

Expo is maintained by Expo (the company). Building apps with Expo is free, and you can submit them to the Google and Apple app stores without restrictions. Expo additionally provides opt-in paid cloud services.\
restrictions [rɪˈstrɪkʃnz] n. 限制；约束；\
additionally [əˈdɪʃənəli] adv. 此外；另外；

## Bleeding-edge React frameworks
As we’ve explored how to continue improving React, we realized that integrating React more closely with frameworks (specifically, with routing, bundling, and server technologies) is our biggest opportunity to help React users build better apps. \
 The Next.js team has agreed to collaborate with us in researching, developing, integrating, and testing framework-agnostic bleeding-edge React features like React Server Components. \
 integrating [ˈɪntɪɡreɪtɪŋ] v. 整合；结合；\

These features are getting closer to being production-ready every day, and we’ve been in talks with other bundler and framework developers about integrating them. Our hope is that in a year or two, all frameworks listed on this page will have full support for these features. 
 (If you’re a framework author interested in partnering with us to experiment with these features, please let us know!) 

 ## Next.js (App Router)
 [Next.js’s App Router](https://nextjs.org/docs) is a redesign of the Next.js APIs aiming to fulfill the React team’s full-stack architecture vision. It lets you fetch data in asynchronous components that run on the server or even during the build. 

Next.js is maintained by Vercel. You can deploy a Next.js app to any Node.js or serverless hosting, or to your own server. Next.js also supports static export which doesn’t require a server. 
